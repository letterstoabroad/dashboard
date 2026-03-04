import React from "react";
import Image from "next/image";
import "./ZennaMascotShortlist.css";

const ZennaMascotShortlist: React.FC = () => {
    return (
        <Image
            src="/assets/images/ZennaMascotRecommendationImage.png"
            alt="Zenna Mascot"
            className="lta-mascot--image"
            width={400}
            height={208}
        />
    );
};

export default ZennaMascotShortlist;
