"use client"
import Patients from "./Patients";
import DoctorInformation from "./DoctorInformation";
import React from "react";
import {  UserInformation } from "@/types";
import DoctorAppointments from "./DoctorAppointments";
import Prescriptions from "./Prescriptions";
import {  useGetUser, UseUserAppointments } from "@/actions/queries";
const DoctorLayout =  ({
id
}: {
id: string |undefined
}) => {

  
  const { data } = UseUserAppointments(id);

  const {data:user,isError,error,isLoading} = useGetUser(id)

  if(isError) {
    return (
      <div className="flex"></div>
    )
  }
  if(user)
  return (
    <React.Fragment>
      {/* Doctor Information Section */}
      <DoctorInformation user={user?.existingUser} />
      <section className="flex flex-col lg:flex-row ">
        <section className="flex flex-col flex-1 lg:flex-grow-0 mb-4 sm:mb-0  sm:mr-4">
           <Patients  />
          <Prescriptions user={user?.existingUser} />
        </section>
        <section className="flex flex-1 sm:mt-4">
          <DoctorAppointments user={user?.existingUser} appointments={data?.userAppointments} />
        </section>
      </section>
    </React.Fragment>
  );
};

export default DoctorLayout;
