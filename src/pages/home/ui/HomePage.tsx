import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { ProjectCard, mapProjectDtoToProjectCard } from "@entities/project";
import {
    normalizeListResponse,
    useCitiesGetCities,
    useProjectsGetProjects,
} from "@shared/api";
import { routePaths } from "@shared/config";
import { time } from "@shared/lib/time";
import { ContentFilters } from "@widgets/ContentFilters";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState("projects");
    const [searchValue, setSearchValue] = useState("");
    const [submittedSearchValue, setSubmittedSearchValue] = useState("");

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

    const projects = normalizeListResponse(projectsResponse);
    const cities = normalizeListResponse(citiesResponse);
    const projectCards = projects.map((project) =>
        mapProjectDtoToProjectCard(project, cities),
    );

    if (isLoading || isCitiesLoading) {
        return <Loader />;
    }

    if (error || citiesError) {
        return (
            <ErrorFallback
                title="Не удалось загрузить проекты"
                description="Список проектов сейчас недоступен. Попробуйте обновить данные."
                error={(error ?? citiesError) as AxiosError}
                onRetry={() => {
                    void refetch();
                    void refetchCities();
                }}
            />
        );
    }

    return (
        <Stack spacing={3}>
            <ContentFilters
                selectedView={selectedView}
                projectCount={projects.length}
                searchValue={searchValue}
                onViewChange={setSelectedView}
                onSearchChange={setSearchValue}
                onSearchSubmit={() => {
                    setSubmittedSearchValue(searchValue.trim());
                }}
            />

            {projectCards.length > 0 ? (
                <Stack spacing={3}>
                    {projectCards.map(({ card, tags }) => (
                        <ProjectCard
                            key={card.id}
                            card={card}
                            tags={tags}
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
                    title="Здесь пока пусто, но это отличный шанс стать первым!"
                    description="Сейчас здесь тихо, но это временно. Видимо, команды пока собираются с мыслями и дедлайнами."
                />
            )}
        </Stack>
    );
};

export default HomePage;
