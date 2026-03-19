import { AppRoutes, routePaths, type RouteConfig } from "@shared/config";
import { HomePage } from "@pages/home";
import { ProfilePage } from "@pages/profile";
import { ProjectPage } from "@pages/project";
import { ProjectsPage } from "@pages/projects";

export const routeConfig: RouteConfig = {
    [AppRoutes.HOME]: {
        element: <HomePage />,
        path: routePaths.home,
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
};
