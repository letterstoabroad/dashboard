"use client";

import React, { useEffect } from "react";
import "./VideoModal.css";

interface VideoModalProps {
    videoUrl: string;
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, isOpen, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="video-modal--overlay" onClick={onClose}>
            <div
                className="video-modal--container"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="video-modal--close" onClick={onClose}>
                    ✕
                </button>
                <div className="video-modal--iframe-wrapper">
                    <iframe
                        src={videoUrl}
                        className="video-modal--iframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoModal;