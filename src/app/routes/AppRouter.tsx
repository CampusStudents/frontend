import type { ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { routeConfig } from "./routeConfig";
import ProtectedRoute from "./ProtectedRoute";

import { routePaths } from "@shared/config";
import { ErrorBoundary } from "@shared/ui/ErrorBoundary";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { MainLayout } from "@widgets/MainLayout";

const routeItems = Object.values(routeConfig);

const mainLayoutRoutes = routeItems.filter((route) => route.layout === "main");
const plainRoutes = routeItems.filter((route) => route.layout !== "main");

const RouteBoundary = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    return (
        <ErrorBoundary
            resetKeys={[location.pathname]}
            onError={(error, errorInfo) => {
                console.error("Ошибка на уровне маршрута:", {
                    pathname: location.pathname,
                    error,
                    componentStack: errorInfo.componentStack,
                });
            }}
            fallback={({ error, reset }) => (
                <ErrorFallback
                    title="Не удалось открыть страницу"
                    description="Ошибка произошла внутри текущего маршрута. Переход на другой экран сбросит это состояние автоматически."
                    error={error}
                    onRetry={reset}
                />
            )}
        >
            {children}
        </ErrorBoundary>
    );
};

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

    return (
        <Route
            key={path}
            path={path}
            element={<RouteBoundary>{content}</RouteBoundary>}
        />
    );
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
