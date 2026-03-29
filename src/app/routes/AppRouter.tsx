import { Navigate, Route, Routes } from "react-router-dom";

import { routeConfig } from "./routeConfig";
import ProtectedRoute from "./ProtectedRoute";

import { routePaths } from "@shared/config";
import { MainLayout } from "@widgets/MainLayout";

const routeItems = Object.values(routeConfig);

const mainLayoutRoutes = routeItems.filter((route) => route.layout === "main");
const plainRoutes = routeItems.filter((route) => route.layout !== "main");

const renderRoute = ({
    element,
    path,
    isPrivate,
}: (typeof routeItems)[number]) => {
    const content = isPrivate ? (
        <ProtectedRoute>{element}</ProtectedRoute>
    ) : (
        element
    );

    return <Route key={path} path={path} element={content} />;
};

const AppRouter = () => (
    <Routes>
        <Route element={<MainLayout maxWidth={1280} />}>
            {mainLayoutRoutes.map(renderRoute)}
        </Route>
        {plainRoutes.map(renderRoute)}
        <Route path="*" element={<Navigate to={routePaths.home} replace />} />
    </Routes>
);

export default AppRouter;
