import { useQueries } from "@tanstack/react-query";
import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { ProjectCard, mapProjectDtoToProjectCard } from "@entities/project";
import { useFavorites } from "@features/favorites";
import {
    getProjectsGetProjectQueryKey,
    normalizeListResponse,
    projectsGetProject,
    useCitiesGetCities,
} from "@shared/api";
import { routePaths } from "@shared/config";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";
import { ContentFilters } from "@widgets/ContentFilters";

const FavoritesPage = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState("projects");
    const { favorites: favoriteIds } = useFavorites();
    const hasFavorites = favoriteIds.length > 0;

    const projectsQueries = useQueries({
        queries: favoriteIds.map((id) => ({
            queryKey: getProjectsGetProjectQueryKey(String(id)),
            queryFn: ({ signal }: { signal: AbortSignal }) =>
                projectsGetProject(String(id), signal),
            enabled: hasFavorites,
            staleTime: time.m(5),
        })),
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
                enabled: hasFavorites,
                staleTime: time.h(1),
            },
        },
    );
    const cities = normalizeListResponse(citiesResponse);
    const projects = projectsQueries.flatMap((query) =>
        query.data ? [query.data] : [],
    );
    const favoriteCards = projects.map((project) =>
        mapProjectDtoToProjectCard(project, cities),
    );
    const isProjectsLoading = projectsQueries.some((query) => query.isLoading);
    const projectsError = projectsQueries.find((query) => query.error)?.error;

    if (hasFavorites && (isProjectsLoading || isCitiesLoading)) {
        return <Loader />;
    }

    if (hasFavorites && (projectsError || citiesError)) {
        return (
            <ErrorFallback
                title="РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РёР·Р±СЂР°РЅРЅРѕРµ"
                description="РЎРїРёСЃРѕРє РёР·Р±СЂР°РЅРЅС‹С… РїСЂРѕРµРєС‚РѕРІ СЃРµР№С‡Р°СЃ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕР±РЅРѕРІРёС‚СЊ РґР°РЅРЅС‹Рµ."
                error={(projectsError ?? citiesError) as AxiosError}
                onRetry={() => {
                    projectsQueries.forEach((query) => {
                        void query.refetch();
                    });
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
                            Избранное
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>

            <ContentFilters
                selectedView={selectedView}
                onViewChange={setSelectedView}
            />

            {favoriteCards.length > 0 ? (
                <Stack spacing={3}>
                    {favoriteCards.map(({ card, tags }) => (
                        <ProjectCard
                            key={card.id}
                            card={card}
                            tags={tags}
                            onClick={() =>
                                navigate(
                                    generatePath(routePaths.project, {
                                        id: String(card.id),
                                    }),
                                )
                            }
                        />
                    ))}
                </Stack>
            ) : (
                <EmptyState
                    title="В избранном пока ничего нет"
                    description="Сохраняйте интересные проекты через быстрый просмотр на главной — свайп вправо добавит проект в избранное."
                />
            )}
        </Stack>
    );
};

export default FavoritesPage;
