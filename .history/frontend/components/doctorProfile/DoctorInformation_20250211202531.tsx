"use client"

import { useGetUser } from "@/actions/queries";

const DoctorInformation = ({ id }: { id: string | undefined }) => {
    const {data,isError,error,isLoading,isFetching} = useGetUser(id)

    const user = data?.existingUser

 
 
  
    {data && appointments && appointments.length > 0 ? (
      <SingleAppointment appointments={appointments} />)
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
          no appointments
        </p>
      </div>
    )}
};

export default DoctorInformation;
