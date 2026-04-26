import { AppRoutes } from "@shared/config/routeConfig/types";

export const routePaths: Record<AppRoutes, string> = {
    [AppRoutes.EVENT]: "/events/:id",
    [AppRoutes.FAVORITES]: "/favorites",
    [AppRoutes.HOME]: "/",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.ORGANIZER]: "/organizer/:id",
    [AppRoutes.PROJECTS]: "/projects",
    [AppRoutes.PROJECT]: "/projects/:id",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.REGISTER]: "/register",
    [AppRoutes.CANDIDATES]: "/candidates",
    [AppRoutes.VERIFY_EMAIL]: "/verify-email",
    [AppRoutes.VERIFY_EMAIL_PENDING]: "/verify-email/pending",
};
