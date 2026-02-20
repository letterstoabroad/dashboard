"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { handleGetUpcomingBookedSlot } from "@/actions/mentorsession.actions";
import "./MentorSessionCard.css";
import {UpcomingBookedSlot} from "@/lib/services/mentorsession.service";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatSessionTime(startIso: string, endIso: string): string {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const fmt = (d: Date) =>
        d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    const day = start.toLocaleDateString("en-US", { weekday: "long" });
    return `${fmt(start)} - ${fmt(end)}, ${day}`;
}

function formatDuration(startIso: string, endIso: string): string {
    const diffMs = new Date(endIso).getTime() - new Date(startIso).getTime();
    const mins = Math.round(diffMs / 60000);
    if (mins < 60) return `${mins} Min Call`;
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return rem > 0 ? `${hrs} Hr ${rem} Min Call` : `${hrs} Hr Call`;
}

function getDaysLeft(startIso: string): number {
    const now = new Date();
    const start = new Date(startIso);
    const diffMs = start.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

function getMonthDay(startIso: string): { month: string; day: string } {
    const date = new Date(startIso);
    return {
        month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        day: String(date.getDate()),
    };
}

// ── Component ─────────────────────────────────────────────────────────────────

const MentorSessionCard: React.FC = () => {
    const [session, setSession] = useState<UpcomingBookedSlot | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const result = await handleGetUpcomingBookedSlot();
            if (cancelled) return;
            if (result.success) {
                setSession(result.data ?? null); // null means empty list → shows "No upcoming sessions"
            } else {
                setError(result.error ?? "Something went wrong.");
            }
            setLoading(false);
        })();
        return () => { cancelled = true; };
    }, []);

    const mentor = session?.mentor_profile;
    const slot = session?.availability_slot;
    const companyLogo = mentor?.latest_work_experience?.logo ?? null;
    const { month, day } = slot ? getMonthDay(slot.start_time) : { month: "", day: "" };

    return (
        <div className="mentor-session--wrapper">
            <p className="mentor-session--heading">Upcoming Mentoring Session</p>

            <div className="mentor-session--container">
                {loading && (
                    <div className="mentor-session--state-container">
                        <div className="layout--default-spinner" />
                    </div>
                )}

                {!loading && error && (
                    <div className="mentor-session--state-container">
                        <p className="mentor-session--placeholder-text">{error}</p>
                    </div>
                )}

                {!loading && !error && !session && (
                    <div className="mentor-session--state-container">
                        <p className="mentor-session--placeholder-text">No upcoming sessions</p>
                    </div>
                )}

                {!loading && !error && session && mentor && slot && (
                    <>
                        {/* ── Top: Mentor Info ── */}
                        <div className="mentor-session--mentor-row">

                            {/* Avatar with overlapping company logo */}
                            <div className="mentor-session--avatar-block">
                                <div className="mentor-session--avatar-blur" />
                                <div className="mentor-session--avatar-img-wrap">
                                    {mentor.profile_picture ? (
                                        <Image
                                            src={mentor.profile_picture}
                                            alt={mentor.full_name}
                                            fill
                                            className="mentor-session--avatar-img"
                                        />
                                    ) : (
                                        <div className="mentor-session--avatar-fallback">
                                            {mentor.full_name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* Company logo badge — overlays bottom-right */}
                                {companyLogo && (
                                    <div className="mentor-session--company-badge">
                                        <Image
                                            src={companyLogo}
                                            alt={mentor.latest_work_experience?.company ?? "company"}
                                            fill
                                            className="mentor-session--company-logo"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Mentor details */}
                            <div className="mentor-session--mentor-info">
                                <div className="mentor-session--name-row">
                                    <span className="mentor-session--name">{mentor.full_name}</span>
                                    <Image
                                        src="/assets/icons/verified.png"
                                        alt="verified"
                                        width={20}
                                        height={20}
                                        className="mentor-session--verified-icon"
                                    />
                                </div>
                                {mentor.latest_work_experience && (
                                    <>
                                        <p className="mentor-session--title">
                                            {mentor.latest_work_experience.designation}
                                        </p>
                                        <p className="mentor-session--company">
                                            {mentor.latest_work_experience.company}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ── Divider ── */}
                        <div className="mentor-session--divider" />

                        {/* ── Bottom: Session Info ── */}
                        <div className="mentor-session--session-row">

                            {/* Calendar icon */}
                            <div className="mentor-session--date-widget">
                                <Image
                                    src="/assets/icons/calendar.png"
                                    alt={`${month} ${day}`}
                                    width={39}
                                    height={45}
                                    style={{ objectFit: "contain" }}
                                />
                            </div>

                            {/* Time info */}
                            <div className="mentor-session--time-info">
                                <span className="mentor-session--session-type">
                                    {formatDuration(slot.start_time, slot.end_time)}
                                </span>
                                <span className="mentor-session--session-time">
                                    {formatSessionTime(slot.start_time, slot.end_time)}
                                </span>
                            </div>

                            {/* Days left pill */}
                            <button className="mentor-session--days-left-btn">
                                {getDaysLeft(slot.start_time)} days left
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MentorSessionCard;
