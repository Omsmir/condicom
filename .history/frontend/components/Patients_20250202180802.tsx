import { getAllUsers } from "@/actions/getUser";
import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/getPatients";


const Doctors = async () => {
  const data = await getAllPatients()

  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
      <DataTable columns={patientsColumns} data={data.Patients} patientTableState />
  );
};

export default Doctors;
