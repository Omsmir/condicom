"use client"
import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { AccessibleForward } from "@mui/icons-material";
import { UsePatientQuery } from "@/actions/queries";


const Patients =  () => {

  const patients = UsePatientQuery()

  console.log(patients.data?.Patients)
  if(patients.data)
  return (
      <DataTable columns={patientsColumns} data={patients.data?.Patients} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />
  );
};

export default Patients;
