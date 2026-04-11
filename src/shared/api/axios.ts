import Axios, { type AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// TODO: Add auth token to the request
AXIOS_INSTANCE.interceptors.request.use();

// TODO: Handle 401 response
AXIOS_INSTANCE.interceptors.response.use();

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
    return AXIOS_INSTANCE(config).then(({ data }) => data);
};
