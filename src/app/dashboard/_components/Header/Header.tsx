"use client";

import React from "react";
import Image from "next/image";
import "./Header.css";
import LtaIcon from "@/app/dashboard/_components/LtaIcon/LtaIcon";
import useStore from "@/store/useStore";

const Header: React.FC = (): React.ReactElement => {
  const { user } = useStore();

  // Helper to determine the image source
  const profileSrc = user?.profile_picture
      ? user.profile_picture
      : "/assets/images/default-avatar.png";

  const ProfilePicture = (
      <div className="header--profile-image-wrapper">
        <Image
            src={profileSrc}
            alt={user?.name || "Profile"}
            fill
            sizes="36px"
            className="header--profile-image"
            priority // Ensures the profile picture loads quickly
        />
      </div>
  );

  return (
      <>
        <div className="header--main-container-large-screen">
          <div className="header--search-container">
            <input
                type="text"
                className="header--search-input"
                placeholder="Search"
            />
          </div>

          <div className="header--profile-section">
            {ProfilePicture}
          </div>
        </div>

        <div className="header--main-container-mobile-screen">
          <div>
            <LtaIcon />
          </div>
          <div className="header--search-container">
            <input
                type="text"
                className="header--search-input"
                placeholder="Search"
            />
          </div>

          {ProfilePicture}

          <button className="header--menu-btn">
            <Image
                src="/assets/icons/Menu_icon.svg"
                alt="Menu"
                width={24}
                height={24}
            />
          </button>
        </div>
      </>
  );
};

export default Header;