import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { ProjectCard, mapProjectDtoToProjectCard } from "@entities/project";
import { useFavorites } from "@features/favorites";
import { useCitiesGetCities } from "@shared/api";
import { routePaths } from "@shared/config";
import { time } from "@shared/lib/time";
import { EmptyState } from "@shared/ui/EmptyState";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";
import { ContentFilters } from "@widgets/ContentFilters";

const FavoritesPage = () => {
    const navigate = useNavigate();
    const [selectedView, setSelectedView] = useState("projects");
    const {
        favorites,
        isLoading: isFavoritesLoading,
        error: favoritesError,
        refetch: refetchFavorites,
        removeFavorite,
        isPending: isFavoritePending,
    } = useFavorites();
    const hasFavorites = favorites.length > 0;

    const {
        data: cities = [],
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

    const favoriteCards = favorites.map((project) =>
        mapProjectDtoToProjectCard(project, cities),
    );

    if (isFavoritesLoading || (hasFavorites && isCitiesLoading)) {
        return <Loader />;
    }

    if (favoritesError || (hasFavorites && citiesError)) {
        return (
            <ErrorFallback
                title="Не удалось загрузить избранное"
                description="Список избранных проектов сейчас недоступен. Попробуйте обновить данные."
                error={(favoritesError ?? citiesError) as AxiosError}
                onRetry={() => {
                    void refetchFavorites();
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

            {favorites.length > 0 ? (
                <Stack spacing={3}>
                    {favoriteCards.map(({ card, tags }) => (
                        <ProjectCard
                            key={card.id}
                            card={card}
                            tags={tags}
                            isFavorite
                            isFavoritePending={isFavoritePending}
                            onToggleFavorite={() => {
                                void removeFavorite(card.id);
                            }}
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
                    description="Сохраняйте интересные проекты через быстрый просмотр на главной или кнопку сердечка в карточке."
                />
            )}
        </Stack>
    );
};

export default FavoritesPage;
