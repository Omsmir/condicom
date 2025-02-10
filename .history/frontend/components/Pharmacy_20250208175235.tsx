import { DataTable } from "./table/Table";
import { Medication } from "@mui/icons-material";
import { getAllMedications } from "@/actions/getMedications";
import {
  pharmacyColumns,
  pharmacyHiddenColumns,
} from "./table/PharmacyColumns";
import { UseMedicationsQuery } from "@/actions/queries";

const Pharmacy = async () => {
  const data = await getAllMedications();

  const medications = UseMedicationsQuery()

  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <DataTable
      columns={pharmacyColumns}
      data={medications.}
      hiddenColumns={pharmacyHiddenColumns}
      renderSwitchState="pharmacy"
      breadCrumbString="medications"
      StatsIcon={<Medication />}
    />
  );
};

export default Pharmacy;
