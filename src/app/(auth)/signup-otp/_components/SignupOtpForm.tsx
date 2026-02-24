"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/(auth)/auth.css";

import AuthCard from "@/app/(auth)/_components/AuthCard";
import {
    handleResendSignupOtp,
    handleSubmitSignupOtp,
} from "@/actions/auth.actions";

const SignupOtpForm: React.FC = (): React.ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [resending, setResending] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timer <= 0) {
            return undefined;
        }
        const countdown = setInterval(() => {
            setTimer((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => {
            clearInterval(countdown);
        };
    }, [timer]);

    const handleDigitChange = (index: number, value: string) => {
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
        if (!email || timer > 0) {
            return;
        }
        setResending(true);
        setError(null);
        setDigits(["", "", "", ""]);
        inputRefs.current[0]?.focus();

        const result = await handleResendSignupOtp({ email });
        if (result.success) {
            setTimer(30);
        } else {
            setError(result.error || "Failed to resend OTP.");
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

        const result = await handleSubmitSignupOtp({ otp });
        if (result.success) {
            router.push("/login");
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
                        <p className="otp-subtext">
                            Please enter the OTP we have sent to
                        </p>
                        <p className="otp-email">{email || "your email"}</p>
                    </div>
                </div>

                <div className="login-form-container">
                    <div className="otp-input-row">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                autoComplete={index === 0 ? "one-time-code" : "off"}
                                pattern="\d*"
                                maxLength={4}
                                className="otp-input-box"
                                value={digit}
                                disabled={loading || resending}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
                    </div>

                    {error && <p className="error-text">{error}</p>}
                </div>

                <div
                    className={`create-account-btn ${loading ? "disabled" : ""}`}
                    onClick={onSubmit}
                >
                    <span className="create-account-text">
                        {loading ? "Verifying..." : "Verify"}
                    </span>
                </div>

                <div
                    className={`resend-otp-link ${resending || timer > 0 ? "disabled" : ""}`}
                    onClick={!resending && timer === 0 ? onResend : undefined}
                >
                    {timer === 0
                        ? "Didn't get your code? Send a new OTP"
                        : `Resend available in ${timer}s`}
                </div>
            </div>
        </AuthCard>
    );
};

export default SignupOtpForm;
