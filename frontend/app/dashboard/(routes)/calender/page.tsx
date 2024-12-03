import Calender from "@/components/Calender";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Calender",
  description: "Welcome to dashboard",
};
import { getAppointments } from "@/actions/getProducts";
const page = async () => {
  const Appointments = await getAppointments()
  return <Calender appointment={Appointments}/>;
};

export default page;
