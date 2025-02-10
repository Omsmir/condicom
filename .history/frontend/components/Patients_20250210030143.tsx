"use client"
import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { AccessibleForward } from "@mui/icons-material";
import { UsePatientQuery } from "@/actions/queries";


const Patients =  () => {

  const {data,isLoading} = UsePatientQuery()

  if (isLoading) return <Loading />;

  if(data)
  return (
      <DataTable columns={patientsColumns} data={data?.Patients} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />
  );
};

export default Patients;
