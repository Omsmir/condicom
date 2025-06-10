"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Spinner from "@/components/Spinner";
import { useCheckToken } from "@/actions/queries";
import NotFound from "@/app/not-found";
import { DashboardHook } from "@/components/context/Dashboardprovider";

interface EncapsulatingProps {
  children: React.ReactNode;
  token: string;
  hashStart?: string;
  hashEnd?: string;
}
const Encapsulating = ({
  children,
  token,
  hashStart,
  hashEnd,
}: EncapsulatingProps) => {
  const { data: session } = useSession();

  const { contextHolder } = DashboardHook();

  const {  isFetching, isLoading, isError } = useCheckToken(
    token,
    `${hashStart || session?.user.name}:${session?.user?.id}${hashEnd || ""}`
  );
  if (isFetching || isLoading) {
    return <Spinner className="relative" />;
  }
  if (isError) {
    return <NotFound />;
  }
  return (
    <React.Fragment>
      {contextHolder}
      {children}
    </React.Fragment>
  );
};

export default Encapsulating;
