import { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
 

const Calender = dynamic(() => import("@/components/Calender"),{suspense:true})
const page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Calender />
    </Suspense>
  );
};

export default page;

