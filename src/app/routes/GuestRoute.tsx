import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

import { tokenStorage } from "@shared/lib/auth";
import { routePaths } from "@shared/config";

const GuestRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const token = tokenStorage.get();
    if (token) {
        return <Navigate to={routePaths.home} replace />;
    }

    return <>{children}</>;
};

export default GuestRoute;
