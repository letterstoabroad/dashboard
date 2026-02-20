"use client";

import React from "react";
import Image from "next/image";
import "./Header.css";
import LtaIcon from "@/app/dashboard/_components/LtaIcon/LtaIcon";
import useStore from "@/store/useStore";

const Header: React.FC = (): React.ReactElement => {
  const { clearUser } = useStore();

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
        <div onClick={() => clearUser()}>User</div>
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
