"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/(auth)/auth.css";

import AuthCard from "@/app/(auth)/_components/AuthCard";
import { handleSendOtp, handleVerifyOtp } from "@/actions/auth.actions";

const OtpForm: React.FC = (): React.ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const invite_token = searchParams.get("invite_token") || "";

    const [otp, setOtp] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sendingOtp, setSendingOtp] = useState<boolean>(true);
    const [resending, setResending] = useState<boolean>(false);
    const [resendSuccess, setResendSuccess] = useState<boolean>(false);

    useEffect(() => {
        let cancelled = false;

        const sendInitialOtp = async () => {
            if (!email || !invite_token) {
                if (!cancelled) {
                    setError("Invalid invite link. Please contact support.");
                    setSendingOtp(false);
                }
                return;
            }

            const result = await handleSendOtp({ email, invite_token });

            if (!cancelled) {
                if (!result.success) {
                    setError(result.error || "Failed to send OTP. Please try again.");
                }
                setSendingOtp(false);
            }
        };

        sendInitialOtp();

        return () => {
            cancelled = true;
        };
    }, [email, invite_token]);

    const onResend = async () => {
        setResending(true);
        setError(null);
        setResendSuccess(false);
        setOtp("");

        const result = await handleSendOtp({ email, invite_token });
        if (result.success) {
            setResendSuccess(true);
        } else {
            setError(result.error || "Failed to resend OTP. Please try again.");
        }
        setResending(false);
    };

    const onSubmit = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        setLoading(true);
        setError(null);
        setResendSuccess(false);

        const result = await handleVerifyOtp({ email, otp, invite_token });
        if (result.success && result.data) {
            router.push(
                `/set-password?uid=${encodeURIComponent(result.data.uid)}&temp_token=${encodeURIComponent(result.data.temp_token)}`
            );
        } else {
            setError(result.error || "Invalid OTP. Please try again.");
        }
        setLoading(false);
    };

    return (
        <AuthCard>
            <div className="login-header-container">
                <h1 className="login-header-text">Verify Your Account</h1>
                <p className="login-subheader-text">
                    {sendingOtp
                        ? "Sending OTP to your email..."
                        : <> Enter the OTP sent to <strong>{email}</strong></>}
                </p>
            </div>

            <div className="login-form-container">
                <div className="input-group">
                    <label className="input-label">OTP Code</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="input-field"
                            value={otp}
                            maxLength={4}
                            disabled={sendingOtp || resending}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                </div>

                {error && <p className="error-text">{error}</p>}
                {resendSuccess && (
                    <p className="resend-success-text">OTP resent successfully.</p>
                )}
            </div>

            <div
                className={`create-account-btn ${loading || sendingOtp || resending ? "disabled" : ""}`}
                onClick={onSubmit}
            >
                <span className="create-account-text">
                    {loading ? "Verifying..." : "Verify OTP"}
                </span>
            </div>

            <div
                className={`resend-otp-link ${resending ? "disabled" : ""}`}
                onClick={!resending ? onResend : undefined}
            >
                {resending ? "Resending..." : "Didn't receive the OTP? Resend"}
            </div>

            <div className="back-link" onClick={() => router.push("/login")}>
                ← Back to Login
            </div>
        </AuthCard>
    );
};

export default OtpForm;