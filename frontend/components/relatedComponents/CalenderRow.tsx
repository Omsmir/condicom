import { items } from "@/lib/constants";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { format, isToday } from "date-fns";
import { useMediaQuery } from "react-responsive";
import { CalenderHook } from "../context/CalenderProvider";
interface Calender {
  day: Date;
  className?: string;
  classname?: string;
}

const CalenderRow: React.FC<Calender> = ({ day, className, classname }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });



  return (
    <div
      className={cn(
        "flex flex-col border-b h-32 p-2 cursor-pointer",
        className
      )}
      onClick={() => console.log(day)}
    >
      <div className="flex justify-end md:justify-start mb-2">
        <div
          className={clsx(
            "flex  size-7 rounded-full ",
            {
              "bg-blue-700 text-slate-100 items-center justify-center":
                isToday(day),
            },
            classname
          )}
        >
          <p className="text-[12px]">{format(day, "d")}</p>
        </div>
      </div>
      <div className="flex flex-col">
        {!isMobile ? (
          <div className="flex justify-between group md:overflow-hidden">
            <p className="font-medium text-[12px] group-hover:text-blue-700">
             chemistry
            </p>
            <small className="font-medium text-slate-500 text-[12px] group-hover:text-blue-700">
              9pm
            </small>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row">
            {items.map((item) => (
              <li className="size-2 rounded-full bg-slate-600 list-none mb-1 sm:mr-1  last-of-type:m-0 "></li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderRow;
