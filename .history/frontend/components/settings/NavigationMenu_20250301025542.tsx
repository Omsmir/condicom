"use client";

import { AccountSettingMenuItems } from "@/lib/constants";
import Link from "next/link";

const NavigationMenu = () => {
  return (
    <div className="flex justify-start items-start">
      <ul className="flex list-inside justify-start items-start">
        {AccountSettingMenuItems.map((item) => (
        <Link href={item.url}>
          <li
            key={item.title}
            className="mr-4 last-of-type:mr-0 text-sm font-medium"
          >
            {item.title}
          </li>
        </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
