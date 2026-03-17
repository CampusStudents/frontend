import type { ReactNode } from "react";

export const AppRoutes = {
    HOME: "home",
    PROFILE: "profile",
    PROJECTS: "projects",
    PROJECT: "project",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export const routePaths: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: "/",
    [AppRoutes.PROJECTS]: "/projects",
    [AppRoutes.PROJECT]: "/projects/:id",
    [AppRoutes.PROFILE]: "/profile",
};

export type RouteConfigItem = {
    element: ReactNode;
    path: string;
    authOnly: boolean;
};

export type RouteConfig = Record<AppRoutes, RouteConfigItem>;
