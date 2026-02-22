"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Stats.css";
import { handleFetchStats } from "@/actions/stats.actions";
import { StatsData } from "@/lib/services/stats.service";

interface StatItem {
    icon: string;
    value: string;
    label: string;
}

const Stats: React.FC = () => {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await handleFetchStats();
            if (result.success && result.data) {
                setStats(result.data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const STATS: StatItem[] = [
        {
            icon: "/assets/icons/stats-universities.png",
            value: loading ? "—" : String(stats?.total_universities ?? 0),
            label: "Total Universities",
        },
        {
            icon: "/assets/icons/stats-courses.png",
            value: loading ? "—" : String(stats?.applied_courses ?? 0),
            label: "Applied Courses",
        },
        {
            icon: "/assets/icons/stats-intake.png",
            value: loading ? "—" : stats?.expected_intake ?? "N/A",
            label: "Expected Intake",
        },
        {
            icon: "/assets/icons/stats-admits.png",
            value: loading ? "—" : String(stats?.total_admits ?? 0),
            label: "Total Admits",
        },
    ];

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