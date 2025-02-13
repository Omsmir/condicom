import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { getUser } from "@/actions/User";
import { useGetUser } from "@/actions/queries";

const DoctorDynamic = dynamic(() => import("@/components/doctorProfile/DoctorLayout"));

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const id = (await params)._id;
  const {data,isError,error,isLoading} = useGetUser(id)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if(data)
  return (
    <Suspense fallback={<Loading />}>
      <DoctorDynamic user={data.existingUser} id={id} />
    </Suspense>
  );
};

export default page;
