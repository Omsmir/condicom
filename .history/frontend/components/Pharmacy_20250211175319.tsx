"use client";

import { DataTable } from "./table/Table";
import { Medication } from "@mui/icons-material";
import {
  pharmacyColumns,
  pharmacyHiddenColumns,
} from "./table/PharmacyColumns";
import { UseMedicationsQuery } from "@/actions/queries";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { medication, medications } from "@/types";

const Pharmacy = () => {
  const { data, error, isLoading,isError } = UseMedicationsQuery();

  if (isLoading) return <Loading />;
 if(isError) {
    return (
      <DataTable
      columns={doctorColumns}
      data={[]}
      StatsIcon={<EarbudsOutlined />}
      breadCrumbString="Doctors"
      message={error.message}
    />
    )
  }
  if(data)
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
