"use client";

import React from "react";
import Image from "next/image";
import "./Stats.css";

interface StatItem {
    icon: string;
    value: string;
    label: string;
}

const STATS: StatItem[] = [
    {
        icon: "/assets/icons/stats-universities.png",
        value: "24",
        label: "Total Universities",
    },
    {
        icon: "/assets/icons/stats-courses.png",
        value: "36",
        label: "Applied Courses",
    },
    {
        icon: "/assets/icons/stats-intake.png",
        value: "Sep '25",
        label: "Expected Intake",
    },
    {
        icon: "/assets/icons/stats-admits.png",
        value: "3",
        label: "Total Admits",
    },
];

const Stats: React.FC = () => {
    return (
        <div className="stats--container">
            {STATS.map((stat, index) => (
                <div key={index} className="stats--card">
                    <div className="stats--card-top">
                        <Image
                            src={stat.icon}
                            alt={stat.label}
                            width={20}
                            height={20}
                            className="stats--icon"
                        />
                        <p className="stats--value">{stat.value}</p>
                    </div>
                    <p className="stats--label">{stat.label}</p>
                </div>
            ))}
        </div>
    );
};

export default Stats;
