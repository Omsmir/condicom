"use client";
import { doctorColumns } from "./table/DoctorColumns";
import { DataTable } from "./table/Table";
import { CustomerService } from "./service/Data";
import { EarbudsOutlined } from "@mui/icons-material";
import { UseGetUsers } from "@/actions/queries";
import Loading from "@/app/loading";

async function getData(): Promise<any> {
  // Fetch data from your API here.
  const data = CustomerService.getCustomersXLarge();

  return (await data).map((ele) => ele);
}

const Doctors = () => {
  const { data, isLoading ,isError,error} = UseGetUsers();
  if (isLoading) return <Loading />;
  if(ise)
  if (data)
    return (
      <DataTable
        columns={doctorColumns}
        data={data.users}
        StatsIcon={<EarbudsOutlined />}
        breadCrumbString="Doctors"
      />
    );
};

export default Doctors;
