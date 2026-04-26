import { authInstance, type AccessToken } from "@shared/api";

// only for refresh token, because login and register are in shared/generated/api
export const authApi = {
    async refresh(): Promise<AccessToken> {
        const { data } = await authInstance.post<AccessToken>(
            "/api/v1/auth/refresh",
        );
        return data;
    },
};
