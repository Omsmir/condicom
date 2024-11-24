
import Calender from "@/components/Calender";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Calender",
  description: "Welcome to dashboard",
};

const page = () => {

  return (
     <Calender />
  );
};

export default page
