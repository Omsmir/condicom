import React, { Suspense } from "react";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { getUser } from "@/actions/getUser";
import { getUserAppointments } from "@/actions/getAppointments";

const DoctorDynamic = dynamic(() => import("@/components/doctorProfile/DoctorLayout"));

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const id = (await params)._id;
  const user = await getUser(id)
  const userAppointments = await getUserAppointments(id)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <Suspense fallback={<Loading />}>
      <DoctorDynamic user={user} appointments={userAppointments} />
    </Suspense>
  );
};

export default page;
