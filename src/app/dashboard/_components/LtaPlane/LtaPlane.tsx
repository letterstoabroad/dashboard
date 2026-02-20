import React from "react";
import Image from "next/image";
import "./LtaPlane.css";

const LtaPlane: React.FC = () => {
    return (
        <div className="lta-plane--container">
            <Image
                src="/assets/images/LtaPlaneImage.png"
                alt="LTA Plane"
                width={166}
                height={127}
                className="lta-plane--image"
            />
        </div>
    );
};

export default LtaPlane;