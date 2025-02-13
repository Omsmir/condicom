import dynamic from "next/dynamic";
 

const Calender = dynamic(() => import("@/components/Calender"))
const page = async () => {
  await new 
  return (
      <Calender />
  );
};

export default page;

