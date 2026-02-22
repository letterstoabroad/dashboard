"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./PageLoader.css";

interface PageLoaderProps {
    minDuration?: number;
}

const PageLoader: React.FC<PageLoaderProps> = () => {

    return (
        <div className="page-loader--overlay">
            {/* Background glows */}
            <div className="page-loader--ellipse-1" />
            <div className="page-loader--ellipse-2" />
            <div className="page-loader--glow-purple-right" />
            <div className="page-loader--glow-purple-left" />
            <div className="page-loader--glow-dark" />
            <div className="page-loader--glow-warm" />
            <div className="page-loader--glow-pink" />
            <div className="page-loader--glow-violet" />

            {/* Center content */}
            <div className="page-loader--content">
                <Image
                    src="/assets/icons/loading-logo.png"
                    alt="Letters to Abroad"
                    width={161.28}
                    height={35.26}
                    className="page-loader--logo"
                    priority
                />
                <Image
                    src="/assets/icons/loading-supernova.png"
                    alt="Supernova"
                    width={545.70}
                    height={89.05}
                    className="page-loader--supernova"
                    priority
                />
            </div>

            {/* Spinner at bottom */}
            <div className="page-loader--spinner-wrapper">
                <div className="page-loader--spinner" />
            </div>
        </div>
    );
};

export default PageLoader;