"use client";
import { doctorColumns } from "./table/DoctorColumns";
import { DataTable } from "./table/Table";
import { CustomerService } from "./service/Data";
import { EarbudsOutlined } from "@mui/icons-material";
import { UseGetUsers } from "@/actions/queries";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

async function getData(): Promise<any> {
  // Fetch data from your API here.
  const data = CustomerService.getCustomersXLarge();

  return (await data).map((ele) => ele);
}

const Doctors = () => {
  const session = useSession()
  const { data, isLoading ,isError,error ,isFetching} = UseGetUsers(session.data?.user.id);
  if (isLoading ) return <Loading />;
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
