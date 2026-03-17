import { Navigate, Route, Routes } from "react-router-dom";

import { routeConfig } from "@shared/config/routeConfig/routeConfig";
import { routePaths } from "@shared/config/routeConfig/types";
import ProtectedRoute from "@app/routes/config/ProtectedRoute.tsx";

const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ element, path, authOnly }) => {
            const content = authOnly ? (
                <ProtectedRoute>{element}</ProtectedRoute>
            ) : (
                element
            );

            return <Route key={path} path={path} element={content} />;
        })}
        <Route path="*" element={<Navigate to={routePaths.home} replace />} />
    </Routes>
);

export default AppRouter;
