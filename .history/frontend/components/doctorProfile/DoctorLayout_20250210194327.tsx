"use client"
import Patients from "./Patients";
import DoctorInformation from "./DoctorInformation";
import React from "react";
import { Appointment, UserInformation } from "@/types";
import DoctorAppointments from "./DoctorAppointments";
import Prescriptions from "./Prescriptions";
import { useSession } from "next-auth/react";
import { UseUserAppointments } from "@/actions/queries";
const DoctorLayout =  ({
  user,
id
}: {
  user: UserInformation | undefined;
id: string |undefined
}) => {

  
  const { data: session } = useSession();
  const { data } = UseUserAppointments(session?.user.id);

  const patients = use
  return (
    <React.Fragment>
      {/* Doctor Information Section */}
      <DoctorInformation user={user} />
      <section className="flex flex-col lg:flex-row ">
        <section className="flex flex-col flex-1 lg:flex-grow-0 mb-4 sm:mb-0  sm:mr-4">
          {/* Map On The Real Data When It Comes To It */}
          <Patients user={user} />
          <Prescriptions user={user} />
        </section>
        <section className="flex flex-1   sm:mt-4">
          <DoctorAppointments user={user} appointments={data?.userAppointments} />
        </section>
      </section>
    </React.Fragment>
  );
};

export default DoctorLayout;
