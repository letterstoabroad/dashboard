// lib/cookies.ts

const isClient = typeof window !== "undefined";

export const setCookie = (name: string, value: string, days: number = 7) => {
    if (!isClient) return;

    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
    if (!isClient) return null;

    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
};

export const clearCookie = (name: string) => {
    if (!isClient) return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const setTokens = (access: string, refresh: string) => {
    setCookie("token", access);
    setCookie("refresh_token", refresh);
};