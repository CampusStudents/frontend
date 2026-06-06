import { axiosInstance } from "@shared/api";
import type { ProjectDTO } from "@shared/api/generated/model";

export type FavoriteProjectDTO = ProjectDTO & {
    is_favorite?: boolean;
};

export const getFavoriteProjectsQueryKey = () =>
    ["/api/v1/projects/favorites"] as const;

export const getFavoriteProjects = async (signal?: AbortSignal) => {
    const { data } = await axiosInstance.get<FavoriteProjectDTO[]>(
        "/api/v1/projects/favorites",
        {
            params: {
                limit: 100,
            },
            signal,
        },
    );

    return data;
};

export const addProjectToFavorites = async (projectId: string | number) => {
    await axiosInstance.post(`/api/v1/projects/${projectId}/favorite`);
};

export const removeProjectFromFavorites = async (
    projectId: string | number,
) => {
    await axiosInstance.delete(`/api/v1/projects/${projectId}/favorite`);
};
