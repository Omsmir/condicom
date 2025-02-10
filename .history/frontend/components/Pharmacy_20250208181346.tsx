"use client";

import { DataTable } from "./table/Table";
import { Medication } from "@mui/icons-material";
import {
  pharmacyColumns,
  pharmacyHiddenColumns,
} from "./table/PharmacyColumns";
import { UseMedicationsQuery } from "@/actions/queries";
import Loading from "@/app/loading";

const Pharmacy = () => {
  const { data, error, isLoading } = UseMedicationsQuery();

  if (isLoading) return <Loading />;

  return (
    <DataTable
      columns={pharmacyColumns}
      data={data?.medication} // Corrected: Directly passing `data`
      hiddenColumns={pharmacyHiddenColumns}
      renderSwitchState="pharmacy"
      breadCrumbString="medications"
      StatsIcon={<Medication />}
    />
  );
};

export default Pharmacy;
