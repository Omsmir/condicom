"use client";
import { Nunito } from "@/fonts/fonts";
import React from "react";
import NavigationMenu from "./NavigationMenu";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayScrollbarsComponent defer>
      <div
        className={`flex flex-col h-screen max-h-screen px-4 pt-16  ${Nunito.className}`}
      >
        <div className="flex flex-col justify-center items-start p-6 w-full">
          <h1 className="font-bold text-2xl capitalize mb-6 ">
            Account Settings
          </h1>
          <div className="flex justify-start border-b-2 w-full">
            <NavigationMenu />
          </div>
        </div>
        {children}
      </div>
    </OverlayScrollbarsComponent>
  );
};

export default SettingsLayout;
