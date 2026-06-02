import Axios, { type AxiosRequestConfig } from "axios";

const baseConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};

export const axiosInstance = Axios.create(baseConfig);
export const authInstance = Axios.create(baseConfig);

export const customInstance = async <T>(
    config: AxiosRequestConfig,
): Promise<T> => {
    const { data } = await axiosInstance(config);

    if (Array.isArray(data)) {
        return data as T;
    }

    if (data?.items) {
        return data.items as T;
    }

    if (data?.data) {
        return data.data as T;
    }

    if (data?.results) {
        return data.results as T;
    }

    if (data?.content) {
        return data.content as T;
    }

    return data;
};
