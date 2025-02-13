"use client"

import { useGetUser } from "@/actions/queries";
import Spinner from "../Spinner";
import DoctorInformationHolder from "./DoctorInformationHolder";

const DoctorInformation = ({ id }: { id: string | undefined }) => {
    const {data,isError,error,isLoading,isFetching} = useGetUser(id)

    const user = data?.existingUser

  
    {data &&  ? (
      <DoctorInformationHolder user={user} />)
     : isLoading || isFetching ? (
      <Spinner className="relative" size="small" />
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
};

export default DoctorInformation;
