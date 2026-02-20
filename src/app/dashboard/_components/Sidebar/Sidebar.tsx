"use client";

import React, { useState } from "react";
import "./Sidebar.css";
import LtaIcon from "@/app/dashboard/_components/LtaIcon/LtaIcon";

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

const MENU_ITEMS: SidebarItem[] = [
  { id: 1, label: "Dashboard", icon: "/assets/icons/HomeIcon.svg" },
  { id: 2, label: "Documents", icon: "/assets/icons/DocumentsIcon.svg" },
  { id: 3, label: "Notifications", icon: "/assets/icons/NotificationIcon.svg" },
  { id: 4, label: "Support", icon: "/assets/icons/SupportIcon.svg" },
];

const BOTTOM_ITEMS: SidebarItem[] = [
  { id: 5, label: "Settings", icon: "/assets/icons/SettingsIcon.svg" },
  { id: 6, label: "Logout", icon: "/assets/icons/LogoutIcon.svg" },
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

const Sidebar: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <>
      <div className="sidebar--container-large-screen">
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
                  onClick={() => setActiveId(item.id)}
                />
              ))}
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
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="sidebar--container-mobile-screen"></div>
    </>
  );
};

export default Sidebar;
