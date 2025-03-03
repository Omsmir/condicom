"use client";

import { AccountSettingMenuItems } from "@/lib/constants";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationMenu = () => {
  const pathname = usePathname();
  const {data:session} = useSession()
  return (
    <div className="flex justify-center items-start">
      <ul className="flex list-inside justify-center items-start">
        {AccountSettingMenuItems.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className=" px-4 first-of-type:px-0 "
          >
            <li
              className={clsx(
                "text-sm font-medium text-slate-600 capitalize transition-transform",
                {
                  "border-b-2 border-b-blue-800 !text-blue-800":
                    pathname === item.url,
                }
              )}
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
