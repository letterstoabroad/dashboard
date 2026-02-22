"use client";

import React from "react";
import useStore from "@/store/useStore";

import CourseShortlist from "@/app/dashboard/_components/CourseShortlist/CourseShortlist";
import LtaSuit from "@/app/dashboard/_components/LtaSuit/LtaSuit";
import Calendar from "@/app/dashboard/_components/Calendar/Calendar";
import Footer from "@/app/dashboard/_components/Footer/Footer";
import TestimonialCarousel from "@/app/dashboard/_components/Testimonials/TestimonialCarousel";

// Placeholders — replace with real components when ready
import MentorSessionCard from "@/app/dashboard/_components/MentorSessionCard/MentorSessionCard";
import Stats from "@/app/dashboard/_components/Stats/Stats";
import ApplicationsTable from "@/app/dashboard/_components/ApplicationsTable/ApplicationsTable";
import LtaPlane from "@/app/dashboard/_components/LtaPlane/LtaPlane";
import ZennaMascotShortlist from "@/app/dashboard/_components/ZennaMascotShortlist/ZennaMascotShortlist";

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}

// ─── Connect Layout ───────────────────────────────────────────────────────────
function ConnectLayout({ greeting }: { greeting: string }) {
    return (
        <>
            <h2 className="main--header-style">{greeting}</h2>
            <div className="connect--lta-mentor-row">
                <LtaSuit />
                <div className="common--flex-1">
                    <MentorSessionCard />
                </div>
            </div>
            <TestimonialCarousel />
            <div className="common--flex-col common--align-start common--justify-center common--gap-1 common--width-100 common--margin-top-auto">
                <div className="main--footer-caption">Hear from our family</div>
                <Footer />
            </div>
        </>
    );
}

function ZennaLayout({ greeting }: { greeting: string }) {
    return (
        <>
            {/* Desktop: greeting + stats side by side. Mobile: stacked */}
            <div className="zenna--greeting-stats-row">
                <h2 className="main--header-style">{greeting}</h2>
                <Stats />
            </div>
            <div className="zenna--suit-plane-row">
                <LtaSuit />
                <LtaPlane />
            </div>
            <ApplicationsTable />
            <TestimonialCarousel />
            <div className="common--flex-col common--align-start common--justify-center common--gap-1 common--width-100 common--margin-top-auto">
                <div className="main--footer-caption">Hear from our family</div>
                <Footer />
            </div>
        </>
    );
}
// ─── Dashboard Layout ─────────────────────────────────────────────────────────
function DefaultLayout({ greeting }: { greeting: string }) {
    return (
        <>
            <h2 className="main--header-style">{greeting}</h2>
            <div className="default--plane-shortlist-row">
                <ZennaMascotShortlist />
                <CourseShortlist />
            </div>
            <div className="zenna--suit-plane-row">
                <LtaSuit />
                <LtaPlane />
            </div>
            <Calendar />
            <TestimonialCarousel />
            <div className="common--flex-col common--align-start common--justify-center common--gap-1 common--width-100 common--margin-top-auto">
                <div className="main--footer-caption">Hear from our family</div>
                <Footer />
            </div>
        </>
    );
}

// ─── Zenna + Connect Layout ───────────────────────────────────────────────────
function ZennaAndConnectLayout({ greeting }: { greeting: string }) {
    return (
        <>
            <div className="common--flex-row common--width-100 common--gap-1 common--align-start">
                <h2 className="main--header-style">{greeting}</h2>
                <Stats />
            </div>
            <div className="common--flex-row common--width-100 common--gap-1">
                <LtaSuit />
                <MentorSessionCard />
            </div>
            <ApplicationsTable />
            <Calendar />
            <TestimonialCarousel />
            <div className="common--flex-col common--align-start common--justify-center common--gap-1 common--width-100 common--margin-top-auto">
                <div className="main--footer-caption">Hear from our family</div>
                <Footer />
            </div>
        </>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage(): React.ReactElement {
    const { user } = useStore();

    const firstName = user?.first_name?.split(" ")[0] || "";
    const greeting = `${getGreeting()}${firstName ? `, ${firstName}` : ""}!`;
    const platformType = user?.signup_platform_type || "dashboard";

    const renderLayout = () => {
        switch (platformType) {
            case "connect":
                return <ConnectLayout greeting={greeting} />;
            case "zenna":
                return <ZennaLayout greeting={greeting} />;
            case "zenna_and_connect":
                return <ZennaAndConnectLayout greeting={greeting} />;
            case "dashboard":
            default:
                return <DefaultLayout greeting={greeting} />;
        }
    };

    return (
        <div className="main-section-container">
            {renderLayout()}
        </div>
    );
}