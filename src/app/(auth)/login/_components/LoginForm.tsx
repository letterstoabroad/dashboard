"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/app/(auth)/auth.css";

import AuthCard from "@/app/(auth)/_components/AuthCard";
import { handleLogin } from "@/actions/auth.actions";
import useStore from "@/store/useStore";

const LoginForm: React.FC = (): React.ReactElement => {
    const router = useRouter();
    const { setUser } = useStore();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setError(null);

        const result = await handleLogin({ email, password });

        if (result.success && result.data) {
            setUser(result.data.user);
            router.push("/dashboard");
        } else {
            setError(result.error || "Something went wrong.");
        }
        setLoading(false);
    };

    return (
        <AuthCard>
            <div className="login-header-container">
                <h1 className="login-header-text">Sign In</h1>
            </div>

            <div className="login-form-container">
                <div className="input-group">
                    <label className="input-label">Email</label>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                {error && <p className="error-text">{error}</p>}
            </div>

            <div
                className={`create-account-btn ${loading ? "disabled" : ""}`}
                onClick={onSubmit}
            >
        <span className="create-account-text">
          {loading ? "Signing in..." : "Sign In"}
        </span>
            </div>
        </AuthCard>
    );
};

export default LoginForm;