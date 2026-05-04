import type { ReactNode } from "react";

export const AppRoutes = {
    CREATE_PROJECT: "createProject",
    EVENT: "event",
    FAVORITES: "favorites",
    HOME: "home",
    LOGIN: "login",
    NOTIFICATIONS: "notifications",
    ORGANIZER: "organizer",
    PROFILE: "profile",
    PROJECTS: "projects",
    PROJECT: "project",
    REGISTER: "register",
    CANDIDATES: "candidates",
    VERIFY_EMAIL: "verifyEmail",
    VERIFY_EMAIL_PENDING: "verifyEmailPending",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export type RouteConfigItem = {
    element: ReactNode;
    path: string;
    layout?: "main";
    isPrivate?: boolean;
    isGuestOnly?: boolean;
};

export type RouteConfig = Record<AppRoutes, RouteConfigItem>;
