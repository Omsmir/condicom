import { DataTable } from "./table/Table";
import { Medication } from "@mui/icons-material";
import { getAllMedications } from "@/actions/getMedications";
import {
  pharmacyColumns,
  pharmacyHiddenColumns,
} from "./table/PharmacyColumns";

const Pharmacy = async () => {
  const data = await getAllMedications();

  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <DataTable
      columns={pharmacyColumns}
      data={data.medications}
      hiddenColumns={pharmacyHiddenColumns}
      renderSwitchState="pharmacy"
      breadCrumbString="medications"
      StatsIcon={<Medication />}
    />
  );
};

export default Pharmacy;
