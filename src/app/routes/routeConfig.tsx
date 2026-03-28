import { AppRoutes, routePaths, type RouteConfig } from "@shared/config";
import { FavoritesPage } from "@pages/favorites";
import { ProfilePage } from "@pages/profile";
import { ProjectPage } from "@pages/project";
import { ProjectsPage } from "@pages/projects";
import { RegisterPage } from "@pages/register";
import { HomePage } from "@pages/home";
import { LoginPage } from "@pages/login";
import { OrganizerPage } from "@pages/organizer";

export const routeConfig: RouteConfig = {
    [AppRoutes.FAVORITES]: {
        element: <FavoritesPage />,
        path: routePaths.favorites,
    },
    [AppRoutes.HOME]: {
        element: <HomePage />,
        path: routePaths.home,
    },
    [AppRoutes.ORGANIZER]: {
        element: <OrganizerPage />,
        path: routePaths.organizer,
    },
    [AppRoutes.PROJECT]: {
        element: <ProjectPage />,
        path: routePaths.project,
    },
    [AppRoutes.PROJECTS]: {
        element: <ProjectsPage />,
        path: routePaths.projects,
    },
    [AppRoutes.PROFILE]: {
        element: <ProfilePage />,
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
