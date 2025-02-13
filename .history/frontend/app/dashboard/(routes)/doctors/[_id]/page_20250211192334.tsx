import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { useGetUser } from "@/actions/queries";

const DoctorDynamic = dynamic(() => import("@/components/doctorProfile/DoctorLayout"));

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const id = (await params)._id;

  return (
    <Suspense fallback={<Loading />}>
      <DoctorDynamic  id={id} />   const {data,isError,error,isLoading} = useGetUser(id)

    </Suspense>
  );
};

export default page;
