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
    return data;
};
