import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { generatePath } from "react-router-dom";
import type { AxiosError } from "axios";

import { MyProjectCard, mapProjectDtoToMyProjectCard } from "@entities/project";
import {
    useAuthGetUser,
    useCitiesGetCities,
    useProjectsGetProjects,
} from "@shared/api";
import type { UserDTO } from "@shared/api/generated/model";
import { routePaths } from "@shared/config";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";
import { ProjectsToggleGroup } from "@widgets/ContentFilters";

const ProjectsPage = () => {
    const [selectedView, setSelectedView] = useState("participants");
    const {
        data: currentUser,
        isLoading: isUserLoading,
        error: userError,
        refetch: refetchUser,
    } = useAuthGetUser<UserDTO, AxiosError>({
        query: {
            staleTime: time.m(5),
        },
    });
    const {
        data: projects = [],
        isLoading: isProjectsLoading,
        error: projectsError,
        refetch: refetchProjects,
    } = useProjectsGetProjects(undefined, {
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

    const myProjectCards = currentUser
        ? projects
              .filter((project) => project.owner_id === currentUser.id)
              .map((project) => mapProjectDtoToMyProjectCard(project, cities))
        : [];

    if (isUserLoading || isProjectsLoading || isCitiesLoading) {
        return <Loader />;
    }

    if (userError || projectsError || citiesError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить ваши проекты"
                description="Страница проектов сейчас недоступна. Попробуйте обновить данные."
                error={
                    (userError ?? projectsError ?? citiesError) as AxiosError
                }
                onRetry={() => {
                    void refetchUser();
                    void refetchProjects();
                    void refetchCities();
                }}
            />
        );
    }

    return (
        <Stack spacing={3}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2.5,
                    bgcolor: "transparent",
                }}
            >
                <Stack spacing={3}>
                    <Stack spacing={0.75}>
                        <Typography
                            sx={{
                                fontSize: { xs: 28, md: 34 },
                                fontWeight: 600,
                                lineHeight: 1.1,
                            }}
                        >
                            Мои Проекты
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            <ProjectsToggleGroup
                selectedView={selectedView}
                onViewChange={setSelectedView}
            />

            {myProjectCards.length > 0 ? (
                <Stack spacing={3}>
                    {myProjectCards.map((card) => (
                        <MyProjectCard
                            key={card.id}
                            card={card}
                            candidatesTo={routePaths.candidates}
                            projectTo={generatePath(routePaths.project, {
                                id: card.id,
                            })}
                        />
                    ))}
                </Stack>
            ) : (
                <EmptyState
                    title="У вас пока нет проектов"
                    description="Создайте первый проект, чтобы собрать команду и начать работу над идеей."
                />
            )}
        </Stack>
    );
};

export default ProjectsPage;
