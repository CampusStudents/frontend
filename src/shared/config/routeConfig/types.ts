import type { ReactNode } from "react";

export const AppRoutes = {
    EVENT: "event",
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
    layout?: "main";
    isPrivate?: boolean;
};

export type RouteConfig = Record<AppRoutes, RouteConfigItem>;
