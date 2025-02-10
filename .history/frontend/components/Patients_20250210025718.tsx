"use client"
import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { getAllPatients } from "@/actions/Patients";
import { AccessibleForward } from "@mui/icons-material";
import { UsePatientQuery } from "@/actions/queries";


const Patients =  () => {

  const patients = UsePatientQuery()

  console.log(patients.data?.Patients)
  return (
      <DataTable columns={patientsColumns} data={patients.dat} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />
  );
};

export default Patients;
