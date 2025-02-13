import { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
 

const Calender = dynamic(() => import("@/components/Calender"))
const page = async () => {
  return (
      <Calender />
    </Suspense>
  );
};

export default page;

