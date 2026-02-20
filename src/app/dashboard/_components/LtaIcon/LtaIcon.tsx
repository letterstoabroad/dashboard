import Image from "next/image";
import React from "react";
import "./LtaIcon.css";

const LtaIcon: React.FC = () => {
  return (
    <div className="common--flex-row common--align-center ltaicon--container">
      <Image
        src="/assets/icons/LTALogoIcon.svg"
        alt="LTA Icon"
        width={55}
        height={55}
        className="ltaicon--logo"
      />
      <span className="ltaicon--text">
        <p className="common--margin-0">Letters</p>
        <p className="common--margin-0">to Abroad</p>
      </span>
      <span className="ltaicon--text-mobile">LTA</span>
    </div>
  );
};

export default LtaIcon;
