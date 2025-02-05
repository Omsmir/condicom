import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/getPatients";
import { AccessibleForward } from "@mui/icons-material";
import { doctorColumns } from "./table/DoctorColumns";

const Pharmacy = async() => {
    const data = await getAllPatients()

    await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <DataTable columns={doctorColumns} data={data.Patients} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />

  )
}

export default Pharmacy
