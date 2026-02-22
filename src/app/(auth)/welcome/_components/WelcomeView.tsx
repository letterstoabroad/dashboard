"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "@/app/(auth)/auth.css";
import AuthCard from "@/app/(auth)/_components/AuthCard";
import useStore from "@/store/useStore";

const WelcomeView: React.FC = (): React.ReactElement => {
    const router = useRouter();
    const { user } = useStore();

    return (
        <AuthCard>
            <div className="login-header-container">
                <h1 className="login-header-text">
                    Welcome{user?.first_name ? ` ${user.first_name}` : ""}
                </h1>
                <p className="login-subheader-text">
                    Welcome onboard! Let&apos;s start your journey. Click the button
                    below to access your dashboard.
                </p>
            </div>

            <div
                className="create-account-btn"
                onClick={() => router.push("/dashboard")}
            >
                <span className="create-account-text">Get Started</span>
            </div>
        </AuthCard>
    );
};

export default WelcomeView;