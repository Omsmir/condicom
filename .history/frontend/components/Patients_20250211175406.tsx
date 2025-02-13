"use client"
import { DataTable } from "./table/Table";
import { patientsColumns } from "./table/PatientsColumns";
import { AccessibleForward } from "@mui/icons-material";
import { UsePatientQuery } from "@/actions/queries";
import Loading from "@/app/loading";


const Patients =  () => {

  const {data,isLoading,ise} = UsePatientQuery()

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
      <DataTable columns={patientsColumns} data={data?.Patients} renderSwitchState="patient" breadCrumbString="Patients" StatsIcon={<AccessibleForward />} />
  );
};

export default Patients;
