import { Suspense } from "react";
import Loading from "./loading";
import CalenderView from "@/components/appointments/CalenderView";
import dynamic from "next/dynamic";
 

const Calender = dynamic(() => import("@/components/Calender"))
const page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Calender />
    </Suspense>
  );
};

export default page;

