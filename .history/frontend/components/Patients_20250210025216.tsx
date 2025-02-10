import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/Patients";
import { AccessibleForward } from "@mui/icons-material";


const Doctors = async () => {
  const data = await getAllPatients()

  await new Promise((resolve) => setTimeout(resolve, 500));

  
  return (
      <DataTable columns={patientsColumns} data={data.Patients} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />
  );
};

export default Doctors;
