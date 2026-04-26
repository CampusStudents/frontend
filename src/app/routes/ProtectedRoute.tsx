import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

import { tokenStorage } from "@shared/lib/auth";
import { routePaths } from "@shared/config";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const token = tokenStorage.get();
    if (!token) {
        return <Navigate to={routePaths.home} />;
    }

    // TODO: handle by roles
    return <div>{children}</div>;
};

export default ProtectedRoute;
