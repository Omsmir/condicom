"use client";

import { AccountSettingMenuItems } from "@/lib/constants";

const NavigationMenu = () => {
  return (
    <div className="flex justify-center items-start">
      <ul className="flex list-inside justify-center items-start">
        {AccountSettingMenuItems.map((item) => (
            <li key={item.title} className="mr-4 last-of-type:mr-0 text-sm font-medium">{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
