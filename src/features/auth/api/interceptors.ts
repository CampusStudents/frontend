import { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { authApi } from "./authApi";

import { tokenStorage } from "@shared/lib/auth";
import { HttpStatuses, axiosInstance } from "@shared/api";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (): Promise<string> => {
    if (!refreshPromise) {
        refreshPromise = authApi
            .refresh()
            .then(({ access_token }) => {
                tokenStorage.set(access_token);
                return access_token;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

export const beforeRequest = (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.get();

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
};

export const onResponseError = async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (
        !originalRequest ||
        originalRequest._retry ||
        error.response?.status !== HttpStatuses.UNAUTHORIZED
    ) {
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
        const accessToken = await refreshAccessToken();
        originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
        return axiosInstance(originalRequest);
    } catch (refreshError) {
        tokenStorage.clear();
        return Promise.reject(refreshError);
    }
};
