import { axiosInstance } from "@shared/api";
import type { ProjectDTO } from "@shared/api/generated/model";

const unwrap = <T>(data: unknown): T => {
    if (data && typeof data === "object") {
        const response = data as Record<string, unknown>;

        if (Array.isArray(response.items)) {
            return response.items as T;
        }

        if ("data" in response) {
            return response.data as T;
        }

        if (Array.isArray(response.results)) {
            return response.results as T;
        }
    }

    return data as T;
};

export const getFavoriteProjectsQueryKey = () => ["/api/v1/favorites"];

export const getFavoriteProjects = async (signal?: AbortSignal) => {
    const { data } = await axiosInstance.get("/api/v1/favorites", { signal });

    return unwrap<ProjectDTO[]>(data);
};

export const addProjectToFavorites = async (projectId: string | number) => {
    const { data } = await axiosInstance.post(`/api/v1/favorites/${projectId}`);

    return unwrap<ProjectDTO>(data);
};

export const removeProjectFromFavorites = async (
    projectId: string | number,
) => {
    const { data } = await axiosInstance.delete(
        `/api/v1/favorites/${projectId}`,
    );

    return unwrap<ProjectDTO>(data);
};
