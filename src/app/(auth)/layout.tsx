import React from "react";
import "./auth.css";

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="layout-container-login">
            <div className="auth-bg" aria-hidden="true">
                <span className="auth-ellipse ellipse-1" />
                <span className="auth-ellipse ellipse-2" />
                <span className="auth-ellipse ellipse-3" />
                <span className="auth-ellipse ellipse-4" />
            </div>
            <div className="auth-shell">
                <div className="auth-shell-logo">
                    <img
                        src="/assets/icons/MainIcon.svg"
                        alt="Letters to Abroad"
                    />
                </div>
                {children}
            </div>
        </div>
    );
}
