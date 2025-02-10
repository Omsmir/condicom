import { Appointment } from "@/types";

  const AppointmentStructure = ({
    appointment,
  }: {
    appointment: Appointment;
  }) => {
    return (
      <div
        key={appointment._id}
        className="flex cursor-pointer justify-between mb-2 rounded-md first-of-type:mt-4 mx-4 last-of-type:mb-4 shadow-md shadow-slate-900 transition-all hover:scale-[1.004] hover:opacity-90"
        style={{ backgroundColor: `${appointment.color}` }}
      >
        <div className="flex flex-col justify-center items-start p-3 flex-1">
          <h1 className="text-sm font-medium text-white">{appointment.task}</h1>
          <div className="flex justify-between items-center w-full">
            <p className="text-[12px] text-slate-200">
              {AppointmentDate(appointment)}
            </p>
            <p className="text-[12px] text-slate-200">
              {format(appointment.createdAt, "Pp")}
            </p>
          </div>
        </div>
      </div>
    );
  };