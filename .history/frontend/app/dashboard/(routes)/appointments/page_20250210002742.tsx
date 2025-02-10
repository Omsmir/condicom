import { getAppointments } from "@/actions/getAppointments";
import { Suspense } from "react";
import Loading from "./loading";

import CalenderView from "@/components/appointments/CalenderView";


const page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <CalenderView />
    </Suspense>
  );
};

export default page;


export const dynamic = 'force-dynamic'