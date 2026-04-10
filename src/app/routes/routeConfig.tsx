import { AppRoutes, routePaths, type RouteConfig } from "@shared/config";
import { EventPage } from "@pages/event";
import { FavoritesPage } from "@pages/favorites";
import { ProfilePage } from "@pages/profile";
import { ProjectPage } from "@pages/project";
import { ProjectsPage } from "@pages/projects";
import { RegisterPage } from "@pages/register";
import { HomePage } from "@pages/home";
import { LoginPage } from "@pages/login";
import { OrganizerPage } from "@pages/organizer";

export const routeConfig: RouteConfig = {
    [AppRoutes.EVENT]: {
        element: <EventPage />,
        layout: "main",
        path: routePaths.event,
    },
    [AppRoutes.FAVORITES]: {
        element: <FavoritesPage />,
        layout: "main",
        path: routePaths.favorites,
    },
    [AppRoutes.HOME]: {
        element: <HomePage />,
        layout: "main",
        path: routePaths.home,
    },
    [AppRoutes.ORGANIZER]: {
        element: <OrganizerPage />,
        layout: "main",
        path: routePaths.organizer,
    },
    [AppRoutes.PROJECT]: {
        element: <ProjectPage />,
        layout: "main",
        path: routePaths.project,
    },
    [AppRoutes.PROJECTS]: {
        element: <ProjectsPage />,
        layout: "main",
        path: routePaths.projects,
    },
    [AppRoutes.PROFILE]: {
        element: <ProfilePage />,
        layout: "main",
        path: routePaths.profile,
        isPrivate: true,
    },
    [AppRoutes.REGISTER]: {
        element: <RegisterPage />,
        path: routePaths.register,
    },
    [AppRoutes.LOGIN]: {
        element: <LoginPage />,
        path: routePaths.login,
    },
};
