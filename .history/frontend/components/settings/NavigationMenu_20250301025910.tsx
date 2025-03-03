"use client";

import { AccountSettingMenuItems } from "@/lib/constants";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationMenu = () => {
    const pathname = usePathname()
  return (
    <div className="flex justify-center items-start">
      <ul className="flex list-inside justify-center items-start">
        {AccountSettingMenuItems.map((item) => (
        <Link href={item.url} className="pb-1 px-4 first-of-type:px-0">
          <li
            key={item.title}
            className={clsx("text-sm font-medium text-slate-600 capitalize mb-2",{"border-b-2 border-b-slate-800":pathname === item.url})}
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
