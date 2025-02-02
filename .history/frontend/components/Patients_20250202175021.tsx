import { getAllUsers } from "@/actions/getUser";
import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";


const Doctors = async () => {
  const data = await getAllUsers();

  await new Promise((resolve) => setTimeout(resolve, 500));


  return (
      <DataTable columns={patientsColumns} data={data.users} patientTableState />
  );
};

export default Doctors;
