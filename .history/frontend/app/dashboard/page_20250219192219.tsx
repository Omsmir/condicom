"use client"
import { Metadata } from "next";
import Overview from "@/components/Overview";


// export const metadata: Metadata = {
//   title: "Health - Dashboard",
//   description: "Welcome to dashboard",
// };

const Home =  () => {

  const {data:session}
  
  return (
     <Overview />
  
  );
};
export default Home;

