import { getAllUsers } from "@/actions/getUser";
import { doctorColumns } from "./table/DoctorColumns";
import { DataTable } from "./table/Table";
import { CustomerService } from "./service/Data";
import { UserInformation } from "@/types";
import { medicalSpecialties } from "@/lib/constants";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { EarbudsOutlined } from "@mui/icons-material";

async function getData(): Promise<any> {
  // Fetch data from your API here.
  const data = CustomerService.getCustomersXLarge();

  return (await data).map((ele) => ele);
}

const Doctors = async () => {
  const data = await getAllUsers();

  await new Promise((resolve) => setTimeout(resolve, 500));


  return (
      <DataTable columns={doctorColumns} data={data.users} patientTableState={false} StatsIcon={<EarbudsOutlined />}  />
  );
};

export default Doctors;
