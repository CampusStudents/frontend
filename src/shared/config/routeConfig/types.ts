import type { ReactNode } from "react";

export const AppRoutes = {
    FAVORITES: "favorites",
    HOME: "home",
    LOGIN: "login",
    ORGANIZER: "organizer",
    PROFILE: "profile",
    PROJECTS: "projects",
    PROJECT: "project",
    REGISTER: "register",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export type RouteConfigItem = {
    element: ReactNode;
    path: string;
    isPrivate?: boolean;
};

export type RouteConfig = Record<AppRoutes, RouteConfigItem>;
