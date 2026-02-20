import { clearCookie, getCookie, setCookie } from "@/lib/cookies";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LTA_API_BASE_URL,
});

const refreshAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LTA_API_BASE_URL,
});

const refreshToken = async (): Promise<string | null> => {
    const refresh = getCookie("refresh_token");
    if (!refresh) return null;

    try {
        const response = await refreshAxiosInstance.post("token/refresh/", {
            refresh,
        });
        if (response.data.data) {
            const { access } = response.data.data;
            setCookie("token", access);
            return access;
        }
        throw new Error("No access token returned");
    } catch (error: unknown) {
        console.error("Refresh token failed", error);
        clearCookie("token");
        clearCookie("refresh_token");
        return null;
    }
};

class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
    }
}

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!config.headers) {
            config.headers = new axios.AxiosHeaders();
        }
        config.headers["Portal-Type"] = "dashboard";
        const token = getCookie("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: unknown) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 403) {
            throw new ForbiddenError(
                "You do not have permission to access this resource."
            );
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            getCookie("refresh_token")
        ) {
            originalRequest._retry = true;
            const newToken = await refreshToken();

            if (newToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            }

            clearCookie("token");
            clearCookie("refresh_token");

            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }

            return Promise.reject(new Error("Session expired. Please log in again."));
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;