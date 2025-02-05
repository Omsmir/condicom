import { DataTable } from "./table/Table";
import { MedicalInformationOutlined } from "@mui/icons-material";
import { getAllMedications } from "@/actions/getMedications";
import { pharmacyColumns } from "./table/PharmacyColumns";

const Pharmacy = async() => {
    const data = await getAllMedications()

    await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <DataTable columns={pharmacyColumns} data={data.medications} message={data.message} renderSwitchState="pharmacy" breadCrumbString="pharmacy" StatsIcon={<MedicalInformationOutlined />} />

  )
}

export default Pharmacy
