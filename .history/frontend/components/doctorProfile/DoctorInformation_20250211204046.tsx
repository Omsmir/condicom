"use client";

import { useGetUser } from "@/actions/queries";
import Spinner from "../Spinner";
import DoctorInformationHolder from "./DoctorInformationHolder";
import React from "react";

const DoctorInformation = ({ id }: { id: string | undefined }) => {
  const { data, isError, error, isLoading, isFetching } = useGetUser(id);

  const user = data?.existingUser;

  return (
    <section className="flex flex-col bg-[var(--sidebar-background)] rounded-md p-4  lg:flex-row">
      
        <DoctorInformationHolder user={user} />
     
     
  );
};

export default DoctorInformation;
