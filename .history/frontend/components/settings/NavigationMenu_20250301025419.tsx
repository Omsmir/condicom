"use client";

import { AccountSettingMenuItems } from "@/lib/constants";

const NavigationMenu = () => {
  return (
    <div className="flex justify-center items-start">
      <ul className="flex list-inside justify-center items-start">
        {AccountSettingMenuItems.map((item) => (
            <li key={item.title}></li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
