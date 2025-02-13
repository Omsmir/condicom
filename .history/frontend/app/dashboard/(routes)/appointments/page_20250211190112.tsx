import dynamic from "next/dynamic";
 

const Calender = dynamic(() => import("@/components/Calender"))
const page = async () => {
  return (
      <Calender />
  );
};

export default page;

