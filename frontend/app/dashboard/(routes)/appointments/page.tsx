
import Calender from "@/components/Calender";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Appointments",
  description: "Welcome to dashboard",
};
import { getAppointments } from "@/actions/getAppointments";
import { Suspense } from "react";
import Loading from "./loading";
const page = async () => {
  const Appointments = await getAppointments()
  return (
    <Suspense fallback={<Loading />}>
      <Calender appointment={Appointments}/>
    </Suspense>
  );
};

export default page;
