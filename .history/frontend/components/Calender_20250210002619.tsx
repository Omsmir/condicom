
import { Appointment } from "@/types";
import CalenderView from "./appointments/CalenderView";

const Calender = async () => {
  return <CalenderView appointments={appointments} />;
};

export default Calender;
