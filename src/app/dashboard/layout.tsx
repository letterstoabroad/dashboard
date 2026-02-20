"use client";

import React from "react";
import Sidebar from "@/app/dashboard/_components/Sidebar/Sidebar";
import Header from "@/app/dashboard/_components/Header/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="layout-container common--width-100">
      <div className="common--flex-row common--width-100">
        <Sidebar />
        <div className="common--flex-col common--flex-1 common--gap-1">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
