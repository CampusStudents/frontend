import { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
    addProjectToFavorites,
    getFavoriteProjects,
    getFavoriteProjectsQueryKey,
    removeProjectFromFavorites,
} from "../api/favoritesApi";

import {
    getProjectsGetProjectQueryKey,
    getProjectsGetProjectsQueryKey,
    queryClient,
} from "@shared/api";
import { tokenStorage } from "@shared/lib/auth";
import { time } from "@shared/lib/time";

const invalidateFavorites = async (projectId?: string | number) => {
    await Promise.all([
        queryClient.invalidateQueries({
            queryKey: getFavoriteProjectsQueryKey(),
        }),
        queryClient.invalidateQueries({
            queryKey: getProjectsGetProjectsQueryKey(),
        }),
        projectId
            ? queryClient.invalidateQueries({
                  queryKey: getProjectsGetProjectQueryKey(String(projectId)),
              })
            : Promise.resolve(),
    ]);
};

export const useFavorites = () => {
    const isAuthenticated = Boolean(tokenStorage.get());

    const favoritesQuery = useQuery({
        queryKey: getFavoriteProjectsQueryKey(),
        queryFn: ({ signal }) => getFavoriteProjects(signal),
        enabled: isAuthenticated,
        retry: false,
        staleTime: time.m(5),
    });

    const addFavoriteMutation = useMutation({
        mutationFn: addProjectToFavorites,
        onSuccess: (_data, projectId) => invalidateFavorites(projectId),
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: removeProjectFromFavorites,
        onSuccess: (_data, projectId) => invalidateFavorites(projectId),
    });

    const favorites = favoritesQuery.data ?? [];

    const favoriteIds = useMemo(
        () => favorites.map((project) => project.id),
        [favorites],
    );

    const addFavorite = useCallback(
        (id: string | number) => addFavoriteMutation.mutateAsync(id),
        [addFavoriteMutation],
    );

    const removeFavorite = useCallback(
        (id: string | number) => removeFavoriteMutation.mutateAsync(id),
        [removeFavoriteMutation],
    );

    const isFavorite = useCallback(
        (id: string | number) =>
            favoriteIds.some((item) => String(item) === String(id)),
        [favoriteIds],
    );

    return {
        favorites,
        favoriteIds,
        addFavorite,
        removeFavorite,
        isFavorite,
        isLoading: favoritesQuery.isLoading,
        error: favoritesQuery.error,
        refetch: favoritesQuery.refetch,
        isPending:
            addFavoriteMutation.isPending || removeFavoriteMutation.isPending,
    };
};
