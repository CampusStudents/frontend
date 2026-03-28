import { AppRoutes } from "@shared/config/routeConfig/types";

export const routePaths: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: "/",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.PROJECTS]: "/projects",
    [AppRoutes.PROJECT]: "/projects/:id",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.REGISTER]: "/register",
};
