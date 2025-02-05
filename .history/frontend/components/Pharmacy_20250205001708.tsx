import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/getPatients";
import { AccessibleForward } from "@mui/icons-material";
import { doctorColumns } from "./table/DoctorColumns";
import { getAllUsers } from "@/actions/getUser";

const Pharmacy = async() => {
    const data = await getAllUsers()

    await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <DataTable columns={doctorColumns} data={data.users} breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />

  )
}

export default Pharmacy
