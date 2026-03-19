import type { ReactNode } from "react";

export const AppRoutes = {
    HOME: "home",
    PROFILE: "profile",
    PROJECTS: "projects",
    PROJECT: "project",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export type RouteConfigItem = {
    element: ReactNode;
    path: string;
    isPrivate?: boolean;
};

export type RouteConfig = Record<AppRoutes, RouteConfigItem>;
