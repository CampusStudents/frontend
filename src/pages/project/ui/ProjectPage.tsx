import { Stack } from "@mui/material";
import type { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import {
    mapProjectDtoToDetails,
    mapProjectVacanciesToRequirements,
} from "../lib/mapProjectDtoToDetails";

import ProjectEventSection from "./ProjectEventSection";
import ProjectHeroSection from "./ProjectHeroSection";
import ProjectRequirementsSection from "./ProjectRequirementsSection";

import {
    useCitiesGetCities,
    useProjectsGetProject,
    useProjectsGetProjectTeam,
    useProjectsGetProjectVacancies,
    useTeamRolesGetTeamRoles,
} from "@shared/api";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

const ProjectPage = () => {
    const { id: projectId } = useParams<{ id: string }>();
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
        data: vacancies = [],
        isLoading: isVacanciesLoading,
        error: vacanciesError,
        refetch: refetchVacancies,
    } = useProjectsGetProjectVacancies(projectId ?? "", undefined, {
        query: {
            staleTime: time.m(5),
        },
    });
    const {
        data: teamMembers = [],
        isLoading: isTeamLoading,
        error: teamError,
        refetch: refetchTeam,
    } = useProjectsGetProjectTeam(projectId ?? "", {
        query: {
            staleTime: time.m(5),
        },
    });
    const {
        data: cities = [],
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
        data: teamRoles = [],
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
        isVacanciesLoading ||
        isTeamLoading ||
        isCitiesLoading ||
        isTeamRolesLoading
    ) {
        return <Loader />;
    }

    if (
        projectError ||
        vacanciesError ||
        teamError ||
        citiesError ||
        teamRolesError
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
                        teamRolesError) as AxiosError
                }
                onRetry={() => {
                    void refetchProject();
                    void refetchVacancies();
                    void refetchTeam();
                    void refetchCities();
                    void refetchTeamRoles();
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

    return (
        <Stack spacing={3}>
            <ProjectHeroSection details={projectDetails} />
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
            {projectDetails.eventId ? (
                <ProjectEventSection details={projectDetails} />
            ) : null}
        </Stack>
    );
};

export default ProjectPage;
