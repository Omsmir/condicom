
import dynamic from "next/dynamic";

const DoctorTable = dynamic(() => import("@/components/Doctors"))

const page =  () => {
  return (
      <DoctorTable />
  );
};

export default page;
