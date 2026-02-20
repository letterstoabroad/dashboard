
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {clearCookie, getCookie, setCookie} from "@/lib/cookies";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LTA_API_BASE_URL, // Replace with your API base URL
});

// Create a separate Axios instance for refreshing the token to avoid interceptor loop
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
    } catch (error) {
        console.error("Refresh token failed", error);
        clearCookie("token");
        clearCookie("refresh_token");
        return null;
    }
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        if (!config.headers) {
            config.headers = {}; // Initialize headers if they are undefined
        }
        config.headers["Portal-Type"] = "dashboard";
        const token = getCookie("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Custom error class
class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
    }
}

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 403 Forbidden error
        if (error.response && error.response.status === 403) {
            throw new ForbiddenError(
                "You do not have permission to access this resource.",
            );
        }

        // Handle 401 Unauthorized error
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            getCookie("refresh_token")
        ) {
            originalRequest._retry = true;
            const newToken = await refreshToken();
            if (newToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } else {
                // Clear cookies to prevent further loops and redirect if necessary
                clearCookie("token");
                clearCookie("refresh_token");
                window.location.href = "/login"; // Redirect to login or appropriate action
                return Promise.reject(new Error("Failed to refresh token"));
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
