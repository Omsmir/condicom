"use client";

import { AccountSettingMenuItems } from "@/lib/constants";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SingleLinkItem = () => 
const NavigationMenu = () => {
  const pathname = usePathname();
  const {data:session} = useSession()
  return (
    <div className="flex justify-center items-start">
      <ul className="flex list-inside justify-center items-start">
        {AccountSettingMenuItems.map((item) => (
         
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
