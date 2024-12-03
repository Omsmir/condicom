
import { Appointments } from "@/types";
import CalenderView from "./relatedComponents/CalenderView";

const Calender = async ({appointment}:any) => {
  return <CalenderView appointment={appointment} />;
};

export default Calender;
