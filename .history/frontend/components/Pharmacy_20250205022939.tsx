import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/getPatients";
import { AccessibleForward } from "@mui/icons-material";
import { doctorColumns } from "./table/DoctorColumns";
import { getAllUsers } from "@/actions/getUser";
import { getAllMedications } from "@/actions/getMedications";

const Pharmacy = async() => {
    const data = await getAllMedications()

    await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <DataTable columns={pha} data={data.medications} renderSwitchState="pharmacy" breadCrumbString="Doctors" StatsIcon={<AccessibleForward />} />

  )
}

export default Pharmacy
