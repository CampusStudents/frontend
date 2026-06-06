import { Button, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import ProjectSwipeDeck from "./project-swipe-deck/ProjectSwipeDeck";

import { ProjectCard, mapProjectDtoToProjectCard } from "@entities/project";
import { useFavorites } from "@features/favorites";
import { useCitiesGetCities, useProjectsGetProjects } from "@shared/api";
import { getEvents, getEventsQueryKey } from "@shared/api/liveApi";
import type { EventDTO } from "@shared/api/liveApi";
import { routePaths } from "@shared/config";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";
import { ContentFilters } from "@widgets/ContentFilters";

const emptyEvents: never[] = [];

const formatEventDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Дата не указана";
    }

    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};

type HomeEventCardProps = {
    event: EventDTO;
    onClick: () => void;
};

const HomeEventCard = ({ event, onClick }: HomeEventCardProps) => (
    <Paper
        elevation={0}
        onClick={onClick}
        sx={{
            borderRadius: 1.5,
            px: { xs: 1.5, sm: 2, md: 2.5 },
            py: { xs: 1.75, sm: 2, md: 2.75 },
            cursor: "pointer",
            transition:
                "transform 150ms ease, box-shadow 150ms ease, background-color 150ms ease",
            "@media (hover: hover)": {
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(19, 21, 23, 0.08)",
                },
            },
        }}
    >
        <Stack spacing={1.5}>
            <Typography
                sx={{
                    color: "text.secondary",
                    fontSize: { xs: 13, sm: 14 },
                }}
            >
                {formatEventDate(event.date_start)}
            </Typography>

            <Typography
                sx={{
                    fontSize: { xs: 20, sm: 22, md: 26 },
                    fontWeight: 500,
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                }}
            >
                {event.title}
            </Typography>

            <Typography
                sx={{
                    maxWidth: 820,
                    color: "text.secondary",
                    lineHeight: 1.5,
                    fontSize: { xs: 14, sm: 15, md: 16 },
                    display: "-webkit-box",
                    WebkitLineClamp: { xs: 3, md: 4 },
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {event.description || "Описание мероприятия пока не заполнено."}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: "text.secondary",
                    fontSize: { xs: 13, sm: 14 },
                }}
            >
                {[event.organizer?.name, event.format]
                    .filter(Boolean)
                    .join(" | ")}
            </Typography>

            <Button
                variant="outlined"
                onClick={(clickEvent) => {
                    clickEvent.stopPropagation();
                    onClick();
                }}
                sx={{
                    alignSelf: "flex-start",
                    height: 40,
                    borderRadius: 2,
                }}
            >
                Подробнее
            </Button>
        </Stack>
    </Paper>
);

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState("projects");
    const [searchValue, setSearchValue] = useState("");
    const [submittedSearchValue, setSubmittedSearchValue] = useState("");
    const { addFavorite, removeFavorite, isFavorite, isPending } =
        useFavorites();

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setSubmittedSearchValue(searchValue.trim());
        }, 300);

        return () => window.clearTimeout(timeoutId);
    }, [searchValue]);

    const projectQueryParams = useMemo(
        () =>
            submittedSearchValue
                ? { title__like: submittedSearchValue, limit: 100 }
                : { limit: 100 },
        [submittedSearchValue],
    );

    const {
        data: projectsResponse,
        isLoading,
        error,
        refetch,
    } = useProjectsGetProjects(projectQueryParams, {
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
        data: eventsResponse,
        isLoading: isEventsLoading,
        error: eventsError,
        refetch: refetchEvents,
    } = useQuery({
        queryKey: getEventsQueryKey(),
        queryFn: ({ signal }) => getEvents(undefined, signal),
        staleTime: time.m(5),
    });

    const projects = projectsResponse ?? [];
    const cities = citiesResponse ?? [];
    const events = eventsResponse ?? emptyEvents;
    const eventsById = useMemo(
        () =>
            Object.fromEntries(events.map((event) => [event.id, event.title])),
        [events],
    );
    const projectCards = projects.map((project) =>
        mapProjectDtoToProjectCard(project, cities, eventsById),
    );

    if (isLoading || isCitiesLoading || isEventsLoading) {
        return <Loader />;
    }

    if (error || citiesError || eventsError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить данные"
                description="Список сейчас недоступен. Попробуйте обновить данные."
                error={(error ?? citiesError ?? eventsError) as AxiosError}
                onRetry={() => {
                    void refetch();
                    void refetchCities();
                    void refetchEvents();
                }}
            />
        );
    }

    return (
        <>
            <Stack spacing={3}>
                <ContentFilters
                    selectedView={selectedView}
                    projectCount={projects.length}
                    eventCount={events.length}
                    searchValue={searchValue}
                    onViewChange={setSelectedView}
                    onSearchChange={setSearchValue}
                    onSearchSubmit={() => {
                        setSubmittedSearchValue(searchValue.trim());
                    }}
                />

                {selectedView === "events" && events.length > 0 ? (
                    <Stack spacing={3}>
                        {events.map((event) => (
                            <HomeEventCard
                                key={event.id}
                                event={event}
                                onClick={() =>
                                    navigate(
                                        generatePath(routePaths.event, {
                                            id: event.id,
                                        }),
                                    )
                                }
                            />
                        ))}
                    </Stack>
                ) : selectedView === "projects" && projectCards.length > 0 ? (
                    <Stack spacing={3}>
                        {projectCards.map(({ card, tags }) => (
                            <ProjectCard
                                key={card.id}
                                card={card}
                                tags={tags}
                                hideImage
                                isFavorite={isFavorite(card.id)}
                                isFavoritePending={isPending}
                                onToggleFavorite={() => {
                                    if (isFavorite(card.id)) {
                                        void removeFavorite(card.id);
                                        return;
                                    }

                                    void addFavorite(card.id);
                                }}
                                onClick={() =>
                                    navigate(
                                        generatePath(routePaths.project, {
                                            id: card.id,
                                        }),
                                    )
                                }
                            />
                        ))}
                    </Stack>
                ) : (
                    <EmptyState
                        title="Здесь пока пусто"
                        description={
                            selectedView === "events"
                                ? "Мероприятий пока нет."
                                : "Проекты пока не опубликованы."
                        }
                    />
                )}
            </Stack>

            {selectedView === "projects" ? (
                <ProjectSwipeDeck items={projectCards} />
            ) : null}
        </>
    );
};

export default HomePage;
