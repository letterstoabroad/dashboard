"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/(auth)/auth.css";

import AuthCard from "@/app/(auth)/_components/AuthCard";
import { handleSendOtp, handleVerifyOtp } from "@/actions/auth.actions";

const OtpForm: React.FC = (): React.ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const invite_token = searchParams.get("invite_token") || "";

    const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sendingOtp, setSendingOtp] = useState<boolean>(true);
    const [resending, setResending] = useState<boolean>(false);
    const [resendSuccess, setResendSuccess] = useState<boolean>(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const handleDigitChange = (index: number, value: string) => {
        // Handle paste of full OTP
        if (value.length > 1) {
            const pasted = value.replace(/\D/g, "").slice(0, 4).split("");
            const newDigits = ["", "", "", ""];
            pasted.forEach((d, i) => {
                newDigits[i] = d;
            });
            setDigits(newDigits);
            const nextIndex = Math.min(pasted.length, 3);
            inputRefs.current[nextIndex]?.focus();
            return;
        }

        const digit = value.replace(/\D/g, "");
        const newDigits = [...digits];
        newDigits[index] = digit;
        setDigits(newDigits);

        if (digit && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const onResend = async () => {
        setResending(true);
        setError(null);
        setResendSuccess(false);
        setDigits(["", "", "", ""]);
        inputRefs.current[0]?.focus();

        const result = await handleSendOtp({ email, invite_token });
        if (result.success) {
            setResendSuccess(true);
        } else {
            setError(result.error || "Failed to resend OTP. Please try again.");
        }
        setResending(false);
    };

    const onSubmit = async () => {
        const otp = digits.join("");
        if (otp.length < 4) {
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
            <div className="otp-content">
                <div className="otp-header-container">
                    <h1 className="otp-title">Please Check Your Inbox</h1>
                    <div className="otp-message">
                        {sendingOtp ? (
                            <p className="otp-subtext">Sending OTP to your email...</p>
                        ) : (
                            <>
                                <p className="otp-subtext">
                                    Please enter the OTP we have sent to
                                </p>
                                <p className="otp-email">{email}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="login-form-container">
                    {/* OTP boxes */}
                    <div className="otp-input-row">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                autoComplete={index === 0 ? "one-time-code" : "off"}
                                pattern="\d*"
                                maxLength={4}
                                className="otp-input-box"
                                value={digit}
                                disabled={sendingOtp || resending}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
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
                        {loading ? "Verifying..." : "Verify"}
                    </span>
                </div>

                <div
                    className={`resend-otp-link ${resending ? "disabled" : ""}`}
                    onClick={!resending ? onResend : undefined}
                >
                    Didn&apos;t get your code?{" "}
                    <strong>Send a new OTP</strong>
                </div>
            </div>
        </AuthCard>
    );
};

export default OtpForm;
