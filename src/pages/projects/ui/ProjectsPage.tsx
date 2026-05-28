import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { generatePath } from "react-router-dom";
import type { AxiosError } from "axios";

import { MyProjectCard, mapProjectDtoToMyProjectCard } from "@entities/project";
import type { MyProjectCardData } from "@entities/project";
import {
    getApplicationsGetMyApplicationsQueryKey,
    normalizeListResponse,
    queryClient,
    useApplicationsGetMyApplications,
    useApplicationsWithdrawApplication,
    useAuthGetUser,
    useCitiesGetCities,
    useProjectsGetProjects,
} from "@shared/api";
import type {
    ApplicationDTO,
    CityDTO,
    ProjectDTO,
    UserDTO,
} from "@shared/api/generated/model";
import { routePaths } from "@shared/config";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";
import { ProjectsToggleGroup } from "@widgets/ContentFilters";

type DisplayedProjectItem = {
    card: MyProjectCardData;
    application?: ApplicationDTO;
};

const mapApplicationToProjectCard = (
    application: ApplicationDTO,
    projects: ProjectDTO[],
    cities: CityDTO[],
): MyProjectCardData => {
    const project = projects.find(
        (item) => item.id === application.vacancy.project_id,
    );

    if (project) {
        return mapProjectDtoToMyProjectCard(project, cities);
    }

    const eventTitle = "Мероприятие не привязано";

    return {
        id: application.vacancy.project.id,
        date: new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
        }).format(new Date(application.created_at)),
        weekday: "",
        title: application.vacancy.project.title,
        destination: eventTitle,
        eventId: null,
        eventTitle,
        subtitle: `Статус заявки: ${application.status}`,
        description:
            application.cover_letter?.trim() ||
            "Заявка отправлена без сопроводительного письма.",
        meta: `Роль: ${application.vacancy.team_role.name}`,
        members: "",
    };
};

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
        data: projectsResponse,
        isLoading: isProjectsLoading,
        error: projectsError,
        refetch: refetchProjects,
    } = useProjectsGetProjects(undefined, {
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
        data: applicationsResponse,
        isLoading: isApplicationsLoading,
        error: applicationsError,
        refetch: refetchApplications,
    } = useApplicationsGetMyApplications({
        query: {
            staleTime: time.m(5),
        },
    });
    const withdrawApplicationMutation = useApplicationsWithdrawApplication();

    const projects = normalizeListResponse<ProjectDTO>(projectsResponse);
    const cities = normalizeListResponse<CityDTO>(citiesResponse);
    const applications =
        normalizeListResponse<ApplicationDTO>(applicationsResponse);
    const creatorProjectItems: DisplayedProjectItem[] = currentUser
        ? projects
              .filter((project) => project.owner_id === currentUser.id)
              .map((project) => ({
                  card: mapProjectDtoToMyProjectCard(project, cities),
              }))
        : [];
    const participantProjectItems: DisplayedProjectItem[] = applications.map(
        (application) => ({
            application,
            card: mapApplicationToProjectCard(application, projects, cities),
        }),
    );
    const displayedProjectItems =
        selectedView === "creators"
            ? creatorProjectItems
            : selectedView === "participants"
              ? participantProjectItems
              : [];

    const handleWithdrawApplication = async (applicationId: string) => {
        await withdrawApplicationMutation.mutateAsync({ applicationId });
        await queryClient.invalidateQueries({
            queryKey: getApplicationsGetMyApplicationsQueryKey(),
        });
    };

    if (
        isUserLoading ||
        isProjectsLoading ||
        isCitiesLoading ||
        isApplicationsLoading
    ) {
        return <Loader />;
    }

    if (userError || projectsError || citiesError || applicationsError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить ваши проекты"
                description="Страница проектов сейчас недоступна. Попробуйте обновить данные."
                error={
                    (userError ??
                        projectsError ??
                        citiesError ??
                        applicationsError) as AxiosError
                }
                onRetry={() => {
                    void refetchUser();
                    void refetchProjects();
                    void refetchCities();
                    void refetchApplications();
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
                <Stack spacing={0.75}>
                    <Typography
                        sx={{
                            fontSize: { xs: 28, md: 34 },
                            fontWeight: 600,
                            lineHeight: 1.1,
                        }}
                    >
                        Мои проекты
                    </Typography>
                </Stack>
            </Paper>

            <ProjectsToggleGroup
                selectedView={selectedView}
                participantCount={participantProjectItems.length}
                creatorCount={creatorProjectItems.length}
                onViewChange={setSelectedView}
            />

            {displayedProjectItems.length > 0 ? (
                <Stack spacing={3}>
                    {displayedProjectItems.map(({ application, card }) => (
                        <MyProjectCard
                            key={application?.id ?? card.id}
                            card={card}
                            candidatesTo={
                                selectedView === "creators"
                                    ? generatePath(routePaths.candidates, {
                                          id: card.id,
                                      })
                                    : undefined
                            }
                            secondaryActionLabel={
                                selectedView === "participants"
                                    ? "Отозвать заявку"
                                    : undefined
                            }
                            isSecondaryActionDisabled={
                                withdrawApplicationMutation.isPending ||
                                (application
                                    ? application.status !== "pending"
                                    : false)
                            }
                            onSecondaryActionClick={
                                application
                                    ? () =>
                                          void handleWithdrawApplication(
                                              application.id,
                                          )
                                    : undefined
                            }
                            projectTo={generatePath(routePaths.project, {
                                id: card.id,
                            })}
                        />
                    ))}
                </Stack>
            ) : (
                <EmptyState
                    title="Здесь пока пусто"
                    description={
                        selectedView === "participants"
                            ? "Вы еще не откликались на проекты."
                            : selectedView === "creators"
                              ? "Создайте первый проект, чтобы собрать команду."
                              : "Здесь пока нет проектов."
                    }
                />
            )}
        </Stack>
    );
};

export default ProjectsPage;
