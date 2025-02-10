"use client";

import { DataTable } from "./table/Table";
import { Medication } from "@mui/icons-material";
import {
  pharmacyColumns,
  pharmacyHiddenColumns,
} from "./table/PharmacyColumns";
import { UseMedicationsQuery } from "@/actions/queries";

const Pharmacy = () => {
  const { data, error, isLoading } = UseMedicationsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DataTable
      columns={pharmacyColumns}
      data={data} // Corrected: Directly passing `data`
      hiddenColumns={pharmacyHiddenColumns}
      renderSwitchState="pharmacy"
      breadCrumbString="medications"
      StatsIcon={<Medication />}
    />
  );
};

export default Pharmacy;
