import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/getPatients";
import { AccessibleForward } from "@mui/icons-material";

const Pharmacy = async() => {
  return (
    <DataTable columns={patientsColumns} data={data.Patients} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />

  )
}

export default Pharmacy
