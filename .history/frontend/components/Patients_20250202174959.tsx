import { getAllUsers } from "@/actions/getUser";
import { doctorColumns } from "./table/DoctorColumns";
import { DataTable } from "./table/Table";
import { CustomerService } from "./service/Data";
import { UserInformation } from "@/types";
import { medicalSpecialties } from "@/lib/constants";
import { Suspense } from "react";
import Loading from "@/app/loading";


const Doctors = async () => {
  const data = await getAllUsers();

  await new Promise((resolve) => setTimeout(resolve, 500));

  const primary = data.users as UserInformation[];

  const doctorUsers = primary.filter((user) =>
    medicalSpecialties.some(
      (medicalrole) => medicalrole.specialty === user.occupation
    )
  );

  console.log(doctorUsers);

  return (
      <DataTable columns={doctorColumns} data={data.users} patientTableState={false} />
  );
};

export default Doctors;
