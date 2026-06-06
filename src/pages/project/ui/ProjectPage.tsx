import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
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
import { getEvent, getEventQueryKey } from "@shared/api/liveApi";

const ProjectPage = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const isAuthenticated = Boolean(tokenStorage.get());
    const { data: currentUser, isLoading: isUserLoading } = useAuthGetUser<
        UserDTO,
        AxiosError
    >({
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
        data: event,
        isLoading: isEventLoading,
        error: eventError,
        refetch: refetchEvent,
    } = useQuery({
        queryKey: getEventQueryKey(project?.event_id ?? undefined),
        queryFn: ({ signal }) => getEvent(project?.event_id ?? "", signal),
        enabled: Boolean(project?.event_id),
        staleTime: time.m(5),
    });
    const { data: vacanciesResponse } = useProjectsGetProjectVacancies(
        projectId ?? "",
        undefined,
        {
            query: {
                staleTime: time.m(5),
            },
        },
    );
    const { data: teamMembersResponse } = useProjectsGetProjectTeam(
        projectId ?? "",
        {
            query: {
                staleTime: time.m(5),
            },
        },
    );
    const { data: citiesResponse } = useCitiesGetCities(
        { limit: 100 },
        {
            query: {
                staleTime: time.h(1),
            },
        },
    );
    const { data: teamRolesResponse } = useTeamRolesGetTeamRoles(
        { limit: 100 },
        {
            query: {
                staleTime: time.h(1),
            },
        },
    );
    const { data: skillsResponse } = useSkillsGetSkills(
        { limit: 200 },
        {
            query: {
                enabled: isAuthenticated,
                staleTime: time.h(1),
            },
        },
    );
    const vacancies = vacanciesResponse ?? [];
    const teamMembers = teamMembersResponse ?? [];
    const cities = citiesResponse ?? [];
    const teamRoles = teamRolesResponse ?? [];
    const skills = skillsResponse ?? [];

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
        isEventLoading ||
        (isAuthenticated && isUserLoading)
    ) {
        return <Loader />;
    }

    if (projectError || eventError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить проект"
                description="Детальная страница проекта сейчас недоступна. Попробуйте обновить данные."
                error={(projectError ?? eventError) as AxiosError}
                onRetry={() => {
                    void refetchProject();
                    void refetchEvent();
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

    const projectDetails = mapProjectDtoToDetails(
        project,
        cities,
        teamMembers,
        event,
    );
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
