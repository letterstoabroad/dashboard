import React from "react";
import Image from "next/image";

interface AuthCardProps {
    children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
    return (
        <div className="login-outer-container">
            <div className="auth-logo">
                <Image
                    src="/assets/icons/MainIcon.svg"
                    alt="Letters to Abroad"
                    width={120}
                    height={40}
                />
            </div>
            <div className="login-container">
                {children}
            </div>
        </div>
    );
};

export default AuthCard;