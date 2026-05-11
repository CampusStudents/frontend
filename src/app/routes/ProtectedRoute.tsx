import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { useAuthGetUser, HttpStatuses } from "@shared/api";
import { routePaths } from "@shared/config";
import { Loader } from "@shared/ui/Loader";
import { time } from "@shared/lib/time";
import type { UserDTO } from "@shared/api/generated/model";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const {
        data: user,
        isLoading,
        error,
    } = useAuthGetUser<UserDTO>({
        query: { retry: false, staleTime: time.s(1) },
    });

    if (isLoading) {
        return <Loader />;
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
