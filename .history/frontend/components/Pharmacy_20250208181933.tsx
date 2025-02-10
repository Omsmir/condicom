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
  const [medications,setMedications] = useState<medication[] | []>([])
  const { data, error, isLoading } = UseMedicationsQuery();

  if (isLoading) return <Loading />;
useEffect(() => {

},[])
  return (
    <DataTable
      columns={pharmacyColumns}
      data={medications} 
      hiddenColumns={pharmacyHiddenColumns}
      renderSwitchState="pharmacy"
      breadCrumbString="medications"
      StatsIcon={<Medication />}
    />
  );
};

export default Pharmacy;
