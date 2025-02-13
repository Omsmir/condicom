
import { Metadata } from "next";
import Overview from "@/components/Overview";
import { getNotification } from "@/actions/Notification";


export const metadata: Metadata = {
  title: "Health - Dashboard",
  description: "Welcome to dashboard",
};

const Home =  () => {

  const {data}
  const notifications = await getNotification()

  console.log(notifications)
  return (
     <Overview />
  
  );
};
export default Home;

