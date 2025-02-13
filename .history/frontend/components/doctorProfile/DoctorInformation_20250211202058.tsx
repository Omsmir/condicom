"use client"

import { useGetUser } from "@/actions/queries";

const DoctorInformation = ({ id }: { id: string | undefined }) => {
    const {data,isError,error,isLoading,isFetching} = useGetUser(id)

    const user = data?.existingUser

 
 
  
  if(user)
  return (
    
  );
};

export default DoctorInformation;
