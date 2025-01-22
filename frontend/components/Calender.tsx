
import { Appointment } from "@/types";
import CalenderView from "./appointments/CalenderView";

const Calender = async ({appointments}:{appointments : Appointment[] | undefined}) => {
  return <CalenderView appointments={appointments} />;
};

export default Calender;
