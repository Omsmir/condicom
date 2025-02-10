import { Suspense } from "react";
import Loading from "./loading";
import CalenderView from "@/components/appointments/CalenderView";
import dyan

const page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <CalenderView />
    </Suspense>
  );
};

export default page;


export const dynamic = 'force-dynamic'