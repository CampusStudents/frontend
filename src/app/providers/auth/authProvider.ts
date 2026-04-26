import { axiosInstance } from "@shared/api";
import { beforeRequest, onResponseError } from "@features/auth";

export const buildInterceptors = () => {
    axiosInstance.interceptors.request.use(beforeRequest);
    axiosInstance.interceptors.response.use(
        (response) => response,
        onResponseError,
    );
};
