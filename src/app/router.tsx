import { createBrowserRouter } from "react-router";

import { Home } from "@pages/Home";
import { Profile } from "@pages/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
]);
