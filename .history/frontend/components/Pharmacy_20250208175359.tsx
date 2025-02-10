"use client"
import { DataTable } from "./table/Table";
import { Medication } from "@mui/icons-material";
import { getAllMedications } from "@/actions/getMedications";
import {
  pharmacyColumns,
  pharmacyHiddenColumns,
} from "./table/PharmacyColumns";
import { UseMedicationsQuery } from "@/actions/queries";

const Pharmacy =  () => {

  const medications = UseMedicationsQuery()

  console.l
  return (
    <DataTable
      columns={pharmacyColumns}
      data={medications.data}
      hiddenColumns={pharmacyHiddenColumns}
      renderSwitchState="pharmacy"
      breadCrumbString="medications"
      StatsIcon={<Medication />}
    />
  );
};

export default Pharmacy;
