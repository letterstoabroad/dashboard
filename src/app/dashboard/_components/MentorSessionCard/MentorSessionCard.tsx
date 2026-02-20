"use client";

import React from "react";
import "./MentorSessionCard.css";

const MentorSessionCard: React.FC = () => {
    return (
        <div className="mentor-session--container">
            <div className="mentor-session--header">
                <p className="mentor-session--title">Mentor Session</p>
            </div>
            <div className="mentor-session--body">
                <p className="mentor-session--placeholder-text">Coming Soon</p>
            </div>
        </div>
    );
};

export default MentorSessionCard;