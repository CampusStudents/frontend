import { Stack } from "@mui/material";
import type { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import {
    mapProjectDtoToDetails,
    mapProjectVacanciesToRequirements,
} from "../lib/mapProjectDtoToDetails";

import ProjectEventSection from "./ProjectEventSection";
import ProjectHeroSection from "./ProjectHeroSection";
import ProjectOwnerActions from "./ProjectOwnerActions";
import ProjectRequirementsSection from "./ProjectRequirementsSection";
import ProjectVacanciesManager from "./ProjectVacanciesManager";

import {
    normalizeListResponse,
    useAuthGetUser,
    useCitiesGetCities,
    useProjectsGetProject,
    useProjectsGetProjectTeam,
    useProjectsGetProjectVacancies,
    useSkillsGetSkills,
    useTeamRolesGetTeamRoles,
} from "@shared/api";
import type { UserDTO } from "@shared/api/generated/model";
import { time } from "@shared/lib/time";
import { tokenStorage } from "@shared/lib/auth";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

const ProjectPage = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const isAuthenticated = Boolean(tokenStorage.get());
    const {
        data: currentUser,
        isLoading: isUserLoading,
        refetch: refetchUser,
    } = useAuthGetUser<UserDTO, AxiosError>({
        query: {
            enabled: isAuthenticated,
            staleTime: time.m(5),
        },
    });
    const {
        data: project,
        isLoading: isProjectLoading,
        error: projectError,
        refetch: refetchProject,
    } = useProjectsGetProject(projectId ?? "", {
        query: {
            staleTime: time.m(5),
        },
    });
    const {
        data: vacanciesResponse,
        isLoading: isVacanciesLoading,
        error: vacanciesError,
        refetch: refetchVacancies,
    } = useProjectsGetProjectVacancies(projectId ?? "", undefined, {
        query: {
            staleTime: time.m(5),
        },
    });
    const {
        data: teamMembersResponse,
        isLoading: isTeamLoading,
        error: teamError,
        refetch: refetchTeam,
    } = useProjectsGetProjectTeam(projectId ?? "", {
        query: {
            staleTime: time.m(5),
        },
    });
    const {
        data: citiesResponse,
        isLoading: isCitiesLoading,
        error: citiesError,
        refetch: refetchCities,
    } = useCitiesGetCities(
        { limit: 100 },
        {
            query: {
                staleTime: time.h(1),
            },
        },
    );
    const {
        data: teamRolesResponse,
        isLoading: isTeamRolesLoading,
        error: teamRolesError,
        refetch: refetchTeamRoles,
    } = useTeamRolesGetTeamRoles(
        { limit: 100 },
        {
            query: {
                staleTime: time.h(1),
            },
        },
    );
    const {
        data: skillsResponse,
        isLoading: isSkillsLoading,
        error: skillsError,
        refetch: refetchSkills,
    } = useSkillsGetSkills(
        { limit: 200 },
        {
            query: {
                enabled: isAuthenticated,
                staleTime: time.h(1),
            },
        },
    );

    const vacancies = normalizeListResponse(vacanciesResponse);
    const teamMembers = normalizeListResponse(teamMembersResponse);
    const cities = normalizeListResponse(citiesResponse);
    const teamRoles = normalizeListResponse(teamRolesResponse);
    const skills = normalizeListResponse(skillsResponse);

    if (!projectId) {
        return (
            <EmptyState
                title="Проект не найден"
                description="В адресе отсутствует идентификатор проекта."
            />
        );
    }

    if (
        isProjectLoading ||
        (isAuthenticated && isUserLoading) ||
        isVacanciesLoading ||
        isTeamLoading ||
        isCitiesLoading ||
        isTeamRolesLoading ||
        (isAuthenticated && isSkillsLoading)
    ) {
        return <Loader />;
    }

    if (
        projectError ||
        vacanciesError ||
        teamError ||
        citiesError ||
        teamRolesError ||
        (isAuthenticated && skillsError)
    ) {
        return (
            <ErrorFallback
                title="Не удалось загрузить проект"
                description="Детальная страница проекта сейчас недоступна. Попробуйте обновить данные."
                error={
                    (projectError ??
                        vacanciesError ??
                        teamError ??
                        citiesError ??
                        teamRolesError ??
                        skillsError) as AxiosError
                }
                onRetry={() => {
                    void refetchProject();
                    if (isAuthenticated) {
                        void refetchUser();
                    }
                    void refetchVacancies();
                    void refetchTeam();
                    void refetchCities();
                    void refetchTeamRoles();
                    if (isAuthenticated) {
                        void refetchSkills();
                    }
                }}
            />
        );
    }

    if (!project) {
        return (
            <EmptyState
                title="Проект не найден"
                description="Возможно, проект был удален или ссылка устарела."
            />
        );
    }

    const projectDetails = mapProjectDtoToDetails(project, cities, teamMembers);
    const projectRequirements = mapProjectVacanciesToRequirements(
        vacancies,
        teamRoles,
    );
    const isProjectOwner = currentUser?.id === project.owner_id;

    return (
        <Stack spacing={3}>
            {isProjectOwner ? (
                <ProjectOwnerActions project={project} cities={cities} />
            ) : null}
            <ProjectHeroSection
                details={projectDetails}
                projectId={project.id}
                requirements={projectRequirements}
            />
            {projectRequirements.length > 0 ? (
                <ProjectRequirementsSection
                    title={projectDetails.requirementsTitle}
                    footer={projectDetails.requirementsFooter}
                    requirements={projectRequirements}
                />
            ) : (
                <EmptyState
                    title="Открытых ролей пока нет"
                    description="Для этого проекта еще не опубликованы вакансии."
                />
            )}
            {isProjectOwner ? (
                <ProjectVacanciesManager
                    projectId={project.id}
                    vacancies={vacancies}
                    teamRoles={teamRoles}
                    skills={skills}
                />
            ) : null}
            {projectDetails.eventId ? (
                <ProjectEventSection details={projectDetails} />
            ) : null}
        </Stack>
    );
};

export default ProjectPage;
