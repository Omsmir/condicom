import { Suspense } from "react";
import Loading from "./loading";
import CalenderView from "@/components/appointments/CalenderView";
import dynamic from "next/dynamic";
 

const Dya
const page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <CalenderView />
    </Suspense>
  );
};

export default page;

