"use client";

import { useGetUser } from "@/actions/queries";
import Spinner from "../Spinner";
import DoctorInformationHolder from "./DoctorInformationHolder";
import React from "react";

const DoctorInformation = ({ id }: { id: string | undefined }) => {
  const { data, isError, error, isLoading, isFetching } = useGetUser(id);

  const user = data?.existingUser;

  return (
    <React.Fragment>
      {data ? (
        <DoctorInformationHolder user={user} />
      ) : isError ? (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-slate-600 text-sm font-medium capitalize">
            {error.message}
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-slate-600 text-sm font-medium capitalize">
            no user
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default DoctorInformation;
