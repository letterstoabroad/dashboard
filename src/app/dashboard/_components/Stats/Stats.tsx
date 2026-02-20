"use client";

import React from "react";
import "./Stats.css";

interface StatItem {
    id: number;
    label: string;
    value: string;
}

const STAT_ITEMS: StatItem[] = [
    { id: 1, label: "Applications", value: "0" },
    { id: 2, label: "Interviews", value: "0" },
    { id: 3, label: "Offers", value: "0" },
];

const Stats: React.FC = () => {
    return (
        <div className="stats--container">
            {STAT_ITEMS.map((item) => (
                <div key={item.id} className="stats--card">
                    <p className="stats--value">{item.value}</p>
                    <p className="stats--label">{item.label}</p>
                </div>
            ))}
        </div>
    );
};

export default Stats;