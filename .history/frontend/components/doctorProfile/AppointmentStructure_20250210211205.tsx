import { Appointment } from "@/types";
import { format } from "date-fns";
import { SkeletonType } from "../CustomSkeleton";

  const AppointmentStructure = ({
    appointment,
  }: {
    appointment: Appointment;
  }) => {
    const AppointmentDate = () => {
        const startDate = format(appointment.startDate, "PPpp");
    
        const endDate = format(appointment.endDate, "p");
    
        return `${startDate} - ${endDate}`;
      };

          const { loading, setLoading } = DashboardHook();
      
    return (
      <div
        key={appointment._id}
        className="flex cursor-pointer justify-between mb-2 rounded-md first-of-type:mt-4 mx-4 last-of-type:mb-4 shadow-md shadow-slate-900 transition-all hover:scale-[1.004] hover:opacity-90"
        style={{ backgroundColor: `${appointment.color}` }}
      >
        <div className="flex flex-col justify-center items-start p-3 flex-1">
        <CustomSkeleton
                SkeletonType={SkeletonType.HEAD}
                loading={loading}
                classname="w-60 min-h-[25px] font-medium capitalize"
                innerText={`${patient?.firstName} ${patient?.lastName}`}
              />
          <div className="flex justify-between items-center w-full">
            <p className="text-[12px] text-slate-200">
              {AppointmentDate()}
            </p>
            <p className="text-[12px] text-slate-200">
              {format(appointment.createdAt, "Pp")}
            </p>
          </div>
        </div>
      </div>
    );
  };


  export default AppointmentStructure