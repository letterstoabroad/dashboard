import api from "@/lib/axios";
import { setTokens } from "@/lib/cookies";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SendOtpPayload {
    email: string;
    invite_token: string;
}

export interface OtpPayload {
    email: string;
    otp: string;
    invite_token: string;
}
export interface SetPasswordPayload {
    uid: string;
    temp_token: string;
    password: string;
}
export interface SetPasswordResponse {
    access: string;
    refresh: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: User;
}

export interface OtpVerifyResponse {
    temp_token: string;
    uid: string;
}

export interface SetPasswordResponse {
    access: string;
    refresh: string;
    user: User;
}
export const sendOtp = async (payload: SendOtpPayload): Promise<void> => {
    await api.post("auth/pre-register/send-otp/", payload);
};

export const verifyOtp = async (payload: OtpPayload): Promise<OtpVerifyResponse> => {
    const response = await api.post<{ status: boolean; data: OtpVerifyResponse }>(
        "auth/pre-register/verify-otp/",
        payload
    );
    return response.data.data;
};

export const setPassword = async (
    payload: SetPasswordPayload
): Promise<SetPasswordResponse> => {
    const response = await api.post<{ status: boolean; data: SetPasswordResponse }>(
        "auth/pre-register/set-password/",
        payload
    );
    const { access, refresh } = response.data.data;
    setTokens(access, refresh);
    return response.data.data;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<{ status: boolean; data: LoginResponse }>(
        "auth/signin/",
        payload
    );
    const { access, refresh } = response.data.data;
    setTokens(access, refresh);
    return response.data.data;
};