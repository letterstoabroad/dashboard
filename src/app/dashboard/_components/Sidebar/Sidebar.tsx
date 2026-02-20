"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./Sidebar.css";
import LtaIcon from "@/app/dashboard/_components/LtaIcon/LtaIcon";
import useStore from "@/store/useStore";

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
    // { id: 2, label: "Documents", icon: "/assets/icons/DocumentsIcon.svg" },
    // { id: 3, label: "Notifications", icon: "/assets/icons/NotificationIcon.svg" },
    // { id: 4, label: "Support", icon: "/assets/icons/SupportIcon.svg" },
];

const BOTTOM_ITEMS: SidebarItem[] = [
    // { id: 6, label: "Settings", icon: "/assets/icons/SettingsIcon.svg" },
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
    isMobile?: boolean;
}> = ({ activeId, onItemClick, isMobile = false }) => (
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

                    {/* Profile — mobile only */}
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
                {BOTTOM_ITEMS.map((item) => (
                    <SidebarOption
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeId === item.id}
                        onClick={() => onItemClick(item.id)}
                    />
                ))}
            </div>
        </div>
    </>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [activeId, setActiveId] = useState<number>(1);

    const handleItemClick = (id: number) => {
        setActiveId(id);
        onClose();
    };

    return (
        <>
            {/* Desktop */}
            <div className="sidebar--container-large-screen">
                <SidebarContent activeId={activeId} onItemClick={setActiveId} />
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
                    isMobile
                />
            </div>
        </>
    );
};

export default Sidebar;