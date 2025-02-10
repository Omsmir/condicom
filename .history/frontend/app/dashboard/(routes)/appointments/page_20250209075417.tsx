"use client"
import Calender from "@/components/Calender";
import { getAppointments } from "@/actions/getAppointments";
import { Suspense } from "react";
import Loading from "./loading";
import { UseUserAppointments } from "@/actions/queries";
import { useSession } from "next-auth/react";


const page = async () => {
  const Appointments = await getAppointments()
  const {data:session} = useSession()
  const {}= UseUserAppointments()
  return (
    <Suspense fallback={<Loading />}>
      <Calender appointments={Appointments}/>
    </Suspense>
  );
};

export default page;


export const dynamic = 'force-dynamic'