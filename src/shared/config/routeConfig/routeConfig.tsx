import { AppRoutes, routePaths } from "./types";
import type { RouteConfig } from "./types";

import { HomePage } from "@pages/home";
import { ProfilePage } from "@pages/profile";
import { ProjectPage } from "@pages/project";
import { ProjectsPage } from "@pages/projects";

export const routeConfig: RouteConfig = {
    [AppRoutes.HOME]: {
        element: <HomePage />,
        path: routePaths.home,
        authOnly: false,
    },
    [AppRoutes.PROJECT]: {
        element: <ProjectPage />,
        path: routePaths.project,
        authOnly: false,
    },
    [AppRoutes.PROJECTS]: {
        element: <ProjectsPage />,
        path: routePaths.projects,
        authOnly: false,
    },
    [AppRoutes.PROFILE]: {
        element: <ProfilePage />,
        path: routePaths.profile,
        authOnly: true,
    },
};
