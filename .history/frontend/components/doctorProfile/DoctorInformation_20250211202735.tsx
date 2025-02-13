"use client"

import { useGetUser } from "@/actions/queries";
import Spinner from "../Spinner";
import DoctorInformationHolder from "./DoctorInformationHolder";

const DoctorInformation = ({ id }: { id: string | undefined }) => {
    const {data,isError,error,isLoading,isFetching} = useGetUser(id)

    const user = data?.existingUser

  
   return 
};

export default DoctorInformation;
