import React from "react";
import Image from "next/image";
import "./LtaSuit.css";

interface LtaSuitItem {
  id: number;
  title: string;
  accessDescription: string;
  image: string;
  buttonText: string;
}

const LTA_SUIT_ARRAY: LtaSuitItem[] = [
  {
    id: 1,
    title: "Course Shortlisting",
    accessDescription: "Free For All",
    image: "/assets/images/course-shortlisting.png",
    buttonText: "Try Connect",
  },
  {
    id: 2,
    title: "LTA Connect",
    accessDescription: "Free For All",
    image: "/assets/images/lta-connect.png",
    buttonText: "Watch video",
  },
  {
    id: 3,
    title: "LTA Zenna",
    accessDescription: "LTA Members Only",
    image: "/assets/images/lta-zenna.png",
    buttonText: "Watch video",
  },
];

const LtaSuit: React.FC = () => {
  return (
      <div className="lta-suit--wrapper">
        <p className="lta-suit--heading">Explore LTA Suit</p>
        <div className="lta-suit--container">
          {LTA_SUIT_ARRAY.map((item) => (
              <div key={item.id} className="lta-suit--card">
                <div className="lta-suit--header">
                  <p className="lta-suit--title">{item.title}</p>
                </div>

                <div className="lta-suit--image-container">
                  <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="lta-suit--image"
                  />
                  <div className="lta-suit--access-tag">
                <span className="lta-suit--access-text">
                  {item.accessDescription}
                </span>
                  </div>
                  <div className="lta-suit--cta-wrapper">
                    <button className="lta-suit--cta-button">
                      <span className="lta-suit--cta-text">{item.buttonText}</span>
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default LtaSuit;