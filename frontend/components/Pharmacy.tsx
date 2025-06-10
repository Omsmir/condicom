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
  const { data, error, isLoading,isError,isFetching } = UseMedicationsQuery();

  if (isLoading  ) return <Loading />;
 if(isError) {
    return (
      <DataTable
      columns={pharmacyColumns}
      data={[]}
      StatsIcon={<Medication />}
      breadCrumbString="medications"
      renderSwitchState="pharmacy"
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
