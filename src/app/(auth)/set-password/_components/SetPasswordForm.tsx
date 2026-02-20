"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/(auth)/auth.css";

import AuthCard from "@/app/(auth)/_components/AuthCard";
import { setPassword } from "@/lib/services/auth.service";
import useStore from "@/store/useStore";

const SetPasswordForm: React.FC = (): React.ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const uid = searchParams.get("uid") || "";
    const temp_token = searchParams.get("temp_token") || "";

    const { setUser } = useStore();

    const [password, setPasswordValue] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        if (!password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (!uid || !temp_token) {
            setError("Invalid session. Please start over.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await setPassword({ uid, temp_token, password });
            setUser(data.user);
            router.push("/dashboard");
        } catch (error: unknown) {
            const message =
                (error as any)?.response?.data?.error ||
                (error as any)?.response?.data?.message ||
                "Failed to set password. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard>
            <div className="login-header-container">
                <h1 className="login-header-text">Set Your Password</h1>
                <p className="login-subheader-text">
                    Create a secure password for your account
                </p>
            </div>

            <div className="login-form-container">
                <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                        <div
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <Image
                                src="/assets/icons/EyeIcon.svg"
                                alt="Toggle Password"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label">Confirm Password</label>
                    <div className="input-wrapper">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Image
                                src="/assets/icons/EyeIcon.svg"
                                alt="Toggle Confirm Password"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                </div>

                {error && <p className="error-text">{error}</p>}
            </div>

            <div
                className={`create-account-btn ${loading ? "disabled" : ""}`}
                onClick={onSubmit}
            >
        <span className="create-account-text">
          {loading ? "Saving..." : "Set Password"}
        </span>
            </div>
        </AuthCard>
    );
};

export default SetPasswordForm;