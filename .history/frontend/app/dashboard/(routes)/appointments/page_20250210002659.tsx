import Calender from "@/components/Calender";
import { getAppointments } from "@/actions/getAppointments";
import { Suspense } from "react";
import Loading from "./loading";
import { UseUserAppointments } from "@/actions/queries";
import { useSession } from "next-auth/react";


const page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Calendervi />
    </Suspense>
  );
};

export default page;


export const dynamic = 'force-dynamic'