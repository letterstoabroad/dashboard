import React from "react";
import CourseShortlist from "@/app/dashboard/_components/CourseShortlist/CourseShortlist";
import LtaSuit from "@/app/dashboard/_components/LtaSuit/LtaSuit";
import Calendar from "@/app/dashboard/_components/Calendar/Calendar";
import Footer from "@/app/dashboard/_components/Footer/Footer";
import TestimonialCarousel from "@/app/dashboard/_components/Testimonials/TestimonialCarousel";

export default function DashboardPage(): React.ReactElement {
    return (
        <div className="main-section-container">
            <h2 className="main--header-style">Good Morning!</h2>
            <CourseShortlist/>
            <div className="common--width-100">
                <h3 className="main--sub-header-style">Explore LTA Suit</h3>
                <LtaSuit/>
            </div>
            <Calendar/>
            <TestimonialCarousel/>
            <div
                className="common--flex-col common--align-start common--justify-center common--gap-1 common--width-100 common--margin-top-auto">
                <div className="main--footer-caption">Hear from our family</div>
                <Footer/>
            </div>
        </div>
    );
}
