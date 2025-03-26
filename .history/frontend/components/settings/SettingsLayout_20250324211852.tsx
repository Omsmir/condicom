"use client";
import { Nunito } from "@/fonts/fonts";
import React from "react";
import NavigationMenu from "./NavigationMenu";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { DashboardHook } from "../context/Dashboardprovider";
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const {contextHolder} = DashboardHook()
  return (
    <div
      className={`flex flex-col h-screen max-h-screen px-4 pt-16 pb-6  ${Nunito.className}`}
    >
      {contextHolder}
      <div className="flex flex-col justify-center items-start p-6 w-full">
        <h1 className="font-bold text-2xl capitalize mb-6 ">
          Account Settings
        </h1>
        <div className="flex justify-start border-b-2 border-[var(--sidebar-background)] w-full">
          <NavigationMenu />
        </div>
      </div>
      <OverlayScrollbarsComponent defer className="overflow-x-hidden">
        <div className="flex flex-col ">
          {children}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default SettingsLayout;
