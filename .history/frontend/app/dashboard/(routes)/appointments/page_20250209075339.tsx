import Calender from "@/components/Calender";
import { getAppointments } from "@/actions/getAppointments";
import { Suspense } from "react";
import Loading from "./loading";


const page = async () => {
  const Appointments = await getAppointments()
  const {}= use
  return (
    <Suspense fallback={<Loading />}>
      <Calender appointments={Appointments}/>
    </Suspense>
  );
};

export default page;


export const dynamic = 'force-dynamic'