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

 
  const {data:session} = useSession()
  const birthDateYears =
    (new Date().getFullYear() as any) - getYear(user?.birthDate as Date);

  const VerifiyJsx = () => {
    switch (user?.verified) {
      case false:
        return <p className="text-sm font-medium text-red-500">unverified</p>;
      default:
        return <p className="text-sm font-medium text-green-500">verified</p>;
    }
  };
  
  if(user)
  return (
    
  );
};

export default DoctorInformation;
