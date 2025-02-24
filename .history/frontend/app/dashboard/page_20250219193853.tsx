"use client"
import { Metadata } from "next";
import Overview from "@/components/Overview";
import { useSession } from "next-auth/react";


// export const metadata: Metadata = {
//   title: "Health - Dashboard",
//   description: "Welcome to dashboard",
// };

const Home =  () => {

  const {data:session} = useSession()
  
  console.log(session?.user.id)
  return (
     <Overview  id={/>
  
  );
};
export default Home;

