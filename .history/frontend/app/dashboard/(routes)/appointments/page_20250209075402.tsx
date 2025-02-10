
import Calender from "@/components/Calender";
import { getAppointments } from "@/actions/getAppointments";
import { Suspense } from "react";
import Loading from "./loading";
import { UseUserAppointments } from "@/actions/queries";


const page = async () => {
  const Appointments = await getAppointments()
  const {}= UseUserAppointments()
  return (
    <Suspense fallback={<Loading />}>
      <Calender appointments={Appointments}/>
    </Suspense>
  );
};

export default page;


export const dynamic = 'force-dynamic'