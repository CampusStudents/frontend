import { AppRoutes } from "@shared/config/routeConfig/types";

export const routePaths: Record<AppRoutes, string> = {
    [AppRoutes.FAVORITES]: "/favorites",
    [AppRoutes.HOME]: "/",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.ORGANIZER]: "/organizer/:id",
    [AppRoutes.PROJECTS]: "/projects",
    [AppRoutes.PROJECT]: "/projects/:id",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.REGISTER]: "/register",
};
