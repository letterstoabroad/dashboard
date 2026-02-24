import React from "react";

interface AuthCardProps {
    children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
    return (
        <div className="login-outer-container">
            <div className="login-container">
                {children}
            </div>
        </div>
    );
};

export default AuthCard;
