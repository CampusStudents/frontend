import { Navigate, Route, Routes } from "react-router-dom";

import { routeConfig } from "@app/routes/routeConfig";
import ProtectedRoute from "@app/routes/ProtectedRoute";
import { routePaths } from "@shared/config";

const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ element, path, isPrivate }) => {
            const content = isPrivate ? (
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
