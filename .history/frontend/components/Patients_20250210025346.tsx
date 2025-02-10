import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/Patients";
import { AccessibleForward } from "@mui/icons-material";
import { UsePatientQuery } from "@/actions/queries";


const Patients = async () => {
  const data = await getAllPatients()

  await new Promise((resolve) => setTimeout(resolve, 500));


  const patients = UsePatientQuery()

  console.log(patients)
  return (
      <DataTable columns={patientsColumns} data={data.Patients} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />
  );
};

export default Patients;
