import { getAllUsers } from "@/actions/getUser";
import { doctorColumns } from "./table/DoctorColumns";
import { DataTable } from "./table/Table";
import { CustomerService } from "./service/Data";
import { UserInformation } from "@/types";
import { medicalSpecialties } from "@/lib/constants";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { patientsColumns } from "./table/PatientsColumns";


const Doctors = async () => {
  const data = await getAllUsers();

  await new Promise((resolve) => setTimeout(resolve, 500));


  return (
      <DataTable columns={patientsColumns} data={data.users} patientTableState />
  );
};

export default Doctors;
