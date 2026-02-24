import {
    loginUser,
    verifyOtp,
    setPassword,
    sendOtp,
    LoginPayload,
    OtpPayload,
    SetPasswordPayload,
    LoginResponse,
    OtpVerifyResponse,
    SetPasswordResponse, SendOtpPayload,
    SignupPayload,
    SignupResponse,
    submitSignupOtp,
    resendSignupOtp,
    signupUser,
} from "@/lib/services/auth.service";

export const handleLogin = async (
    payload: LoginPayload
): Promise<{ success: boolean; data?: LoginResponse; error?: string }> => {
    try {
        const data = await loginUser(payload);
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "Login failed. Please try again.";
        return { success: false, error: message };
    }
};

export const handleSendOtp = async (
    payload: SendOtpPayload
): Promise<{ success: boolean; error?: string }> => {
    try {
        await sendOtp(payload);
        return { success: true };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "Failed to send OTP.";
        return { success: false, error: message };
    }
};

export const handleVerifyOtp = async (
    payload: OtpPayload
): Promise<{ success: boolean; data?: OtpVerifyResponse; error?: string }> => {
    try {
        const data = await verifyOtp(payload);
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "OTP verification failed.";
        return { success: false, error: message };
    }
};
export const handleSetPassword = async (
    payload: SetPasswordPayload
): Promise<{ success: boolean; data?: SetPasswordResponse; error?: string }> => {
    try {
        const data = await setPassword(payload);
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "Failed to set password.";
        return { success: false, error: message };
    }
};

export const handleSignup = async (
    payload: SignupPayload
): Promise<{ success: boolean; data?: SignupResponse; error?: string }> => {
    try {
        const data = await signupUser(payload);
        return { success: true, data };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "Signup failed. Please try again.";
        return { success: false, error: message };
    }
};

export const handleSubmitSignupOtp = async (
    payload: { otp: string }
): Promise<{ success: boolean; error?: string }> => {
    try {
        await submitSignupOtp(payload);
        return { success: true };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "OTP verification failed.";
        return { success: false, error: message };
    }
};

export const handleResendSignupOtp = async (
    payload: { email: string }
): Promise<{ success: boolean; error?: string }> => {
    try {
        await resendSignupOtp(payload);
        return { success: true };
    } catch (error: unknown) {
        const message =
            (error as any)?.response?.data?.message || "Failed to resend OTP.";
        return { success: false, error: message };
    }
};
