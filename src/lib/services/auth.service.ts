import api from "@/lib/axios";
import { setTokens } from "@/lib/cookies";
import type { User } from "@/store/useStore";

// remove the local User interface definition entirely
export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
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

export interface LoginResponse {
    access: string;
    refresh: string;
    user: User;
}

export interface SignupResponse {
    access?: string;
    refresh?: string;
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

export const signupUser = async (payload: SignupPayload): Promise<SignupResponse> => {
    const response = await api.post<{ status: boolean; data: SignupResponse }>(
        "auth/signup/",
        payload
    );
    const { access, refresh } = response.data.data || {};
    if (access && refresh) {
        setTokens(access, refresh);
    }
    return response.data.data;
};

export const submitSignupOtp = async (payload: { otp: string }): Promise<void> => {
    await api.post("auth/signup/verify-otp/", payload);
};

export const resendSignupOtp = async (payload: { email: string }): Promise<void> => {
    await api.post("auth/signup/resend-otp/", payload);
};
