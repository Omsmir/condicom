"use client";

import { AccountSettingMenuItems } from "@/lib/constants";
import Link from "next/link";

const NavigationMenu = () => {
  return (
    <div className="flex justify-center items-start">
      <ul className="flex list-inside justify-center items-start">
        {AccountSettingMenuItems.map((item) => (
        <Link 
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
