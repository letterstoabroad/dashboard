"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Sidebar.css";
import LtaIcon from "@/app/dashboard/_components/LtaIcon/LtaIcon";
import useStore from "@/store/useStore";
import { clearCookie } from "@/lib/cookies";

interface SidebarItem {
    id: number;
    label: string;
    icon: string;
}

interface SidebarOptionProps {
    icon: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS: SidebarItem[] = [
    { id: 1, label: "Dashboard", icon: "/assets/icons/HomeIcon.svg" },
];

const BOTTOM_ITEMS: SidebarItem[] = [
    { id: 7, label: "Logout", icon: "/assets/icons/LogoutIcon.svg" },
];

const SidebarOption: React.FC<SidebarOptionProps> = ({
                                                         icon,
                                                         label,
                                                         isActive,
                                                         onClick,
                                                     }) => {
    return (
        <div
            className={`sidebar--menu-item ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <div className="sidebar--icon-wrapper">
                <div
                    className="sidebar--icon"
                    style={{
                        maskImage: `url(${icon})`,
                        WebkitMaskImage: `url(${icon})`,
                    } as React.CSSProperties}
                />
            </div>
            <span className="sidebar--menu-text">{label}</span>
        </div>
    );
};

const ProfileMenuItem: React.FC<{
    isActive: boolean;
    onClick: () => void;
}> = ({ isActive, onClick }) => {
    const { user } = useStore();

    const profileSrc = user?.profile_picture
        ? user.profile_picture
        : "/assets/images/default-avatar.png";

    return (
        <div
            className={`sidebar--menu-item ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <div className="sidebar--icon-wrapper">
                <div className="sidebar--profile-avatar">
                    <Image
                        src={profileSrc}
                        alt={user?.first_name || "Profile"}
                        fill
                        sizes="20px"
                        className="sidebar--profile-avatar-img"
                    />
                </div>
            </div>
            <span className="sidebar--menu-text">Profile</span>
        </div>
    );
};

const SidebarContent: React.FC<{
    activeId: number;
    onItemClick: (id: number) => void;
    onLogout: () => void;
    isMobile?: boolean;
}> = ({ activeId, onItemClick, onLogout, isMobile = false }) => (
    <>
        <div className="sidebar--logo-section">
            <LtaIcon />
        </div>

        <div
            className="common--width-100 common--flex-col"
            style={{ gap: "24px", flex: 1 }}
        >
            <div className="common--flex-col" style={{ gap: "16px" }}>
                <p className="sidebar--menu-label">MAIN MENU</p>
                <div className="common--flex-col" style={{ gap: "4px" }}>
                    {MENU_ITEMS.map((item) => (
                        <SidebarOption
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={activeId === item.id}
                            onClick={() => onItemClick(item.id)}
                        />
                    ))}

                    {isMobile && (
                        <ProfileMenuItem
                            isActive={activeId === 5}
                            onClick={() => onItemClick(5)}
                        />
                    )}
                </div>
            </div>

            <div
                className="common--flex-col"
                style={{ marginTop: "auto", gap: "4px" }}
            >
                {BOTTOM_ITEMS.map((item) =>
                    item.label === "Logout" ? (
                        <SidebarOption
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={false}
                            onClick={onLogout}
                        />
                    ) : (
                        <SidebarOption
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={activeId === item.id}
                            onClick={() => onItemClick(item.id)}
                        />
                    )
                )}
            </div>
        </div>
    </>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [activeId, setActiveId] = useState<number>(1);
    const router = useRouter();

    const handleLogout = () => {
        clearCookie("token");
        clearCookie("refresh_token");
        router.push("/auth/login");
    };

    const handleItemClick = (id: number) => {
        setActiveId(id);
        onClose();
    };

    return (
        <>
            {/* Desktop */}
            <div className="sidebar--container-large-screen">
                <SidebarContent
                    activeId={activeId}
                    onItemClick={setActiveId}
                    onLogout={handleLogout}
                />
            </div>

            {/* Mobile overlay backdrop */}
            {isOpen && <div className="sidebar--overlay" onClick={onClose} />}

            {/* Mobile drawer */}
            <div
                className={`sidebar--container-mobile-screen ${isOpen ? "open" : ""}`}
            >
                <SidebarContent
                    activeId={activeId}
                    onItemClick={handleItemClick}
                    onLogout={handleLogout}
                    isMobile
                />
            </div>
        </>
    );
};

export default Sidebar;