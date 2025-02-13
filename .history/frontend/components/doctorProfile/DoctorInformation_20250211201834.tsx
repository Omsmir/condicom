"use client"
import React from "react";
import { UserInformation } from "@/types";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Person, Place, Work, CalendarMonth } from "@mui/icons-material";
import { format, getYear } from "date-fns";
import { useSession } from "next-auth/react";
import CustomSkeleton, { SkeletonType } from "../CustomSkeleton";
import { DashboardHook } from "../context/Dashboardprovider";
import { useGetUser } from "@/actions/queries";
import Loading from "@/app/loading";

const DoctorInformation = ({ id }: { id: string | undefined }) => {
    const { loading, setLoading } = DashboardHook();
    const {data,isError,error,isLoading,isFetching} = useGetUser(id)

    const user = data?.existingUser

 
 
  
  if(user)
  return (
    
  );
};

export default DoctorInformation;
