import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { useAuthGetUser, HttpStatuses } from "@shared/api";
import type { UserDTO } from "@shared/api/generated/model";
import { routePaths } from "@shared/config";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isLoading, error } = useAuthGetUser({
        query: { retry: false },
    });
    const user = data as UserDTO | undefined;

    if (isLoading) {
        return null;
    }

    if (error) {
        const status = (error as AxiosError)?.response?.status;

        if (status === HttpStatuses.FORBIDDEN) {
            return <Navigate to={routePaths.verifyEmailPending} replace />;
        }

        return <Navigate to={routePaths.login} replace />;
    }

    if (!user) {
        return <Navigate to={routePaths.login} replace />;
    }

    if (!user.is_verified) {
        return <Navigate to={routePaths.verifyEmailPending} replace />;
    }

    if (!user.is_profile_completed) {
        return <Navigate to={routePaths.profileSetup} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
