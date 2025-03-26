"use client";
import * as React from "react";
import {
  addDays,
  subDays,
  getDay,
  isToday,
  isTomorrow,
  isYesterday,
  isAfter,
  isBefore,
  differenceInCalendarDays,
  format,
  addMonths,
  subMonths,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalenderHook } from "../context/CalenderProvider";
import { Days, notificationSounds } from "@/lib/constants";
import { useMediaQuery } from "react-responsive";
import AddEvent from "../AddAppointment";
import { Table } from "@tanstack/react-table";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Notification, ObjectType } from "@/types";
import {
  CheckCircleFilled,
  DeleteFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  ReloadOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import * as Tone from "tone";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Session } from "next-auth";
import { CheckedState } from "@radix-ui/react-checkbox";

type HandleViewFuncProps = {
  handleView: ({
    text,
    onclick,
  }: {
    text: string;
    onclick: React.Dispatch<React.SetStateAction<CheckedState | undefined>>;
  }) => void;
};

const MenuToReturnBasedOnMedia = ({ handleView }: HandleViewFuncProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const {
    view,
    setViewPort,
    DayView,
    setDayView,
    WeekView,
    setWeekView,
    MonthView,
    setMonthView,
  } = CalenderHook();
  return (
    <React.Fragment>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-slate-200 dark:hover:bg-slate-800 dark:border-slate-800"
        >
          {!isMobile && view} <p className="-rotate-90">&lt;</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-slate-100 p-0 dark:bg-[var(--sidebar-accent)] dark:border-slate-800">
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)] cursor-pointer"
          checked={MonthView}
          onCheckedChange={() =>
            handleView({ text: "Month'view", onclick: setMonthView })
          }
          onClick={() => setViewPort(1)}
        >
          Month'view
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)] cursor-pointer"
          checked={WeekView}
          onCheckedChange={() =>
            handleView({ text: "Week'view", onclick: setWeekView })
          }
          onClick={() => setViewPort(2)}
        >
          Week'view{" "}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)] cursor-pointer"
          checked={DayView}
          onCheckedChange={() =>
            handleView({ text: "Day'view", onclick: setDayView })
          }
          onClick={() => setViewPort(3)}
        >
          Day'view
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </React.Fragment>
  );
};

export function FadeMenu() {
  const { setView, setDayView, setWeekView, setMonthView } = CalenderHook();

  const handleView = ({
    text,
    onclick,
  }: {
    text: string;
    onclick: React.Dispatch<React.SetStateAction<CheckedState | undefined>>;
  }) => {
    setView(text);

    setWeekView(false);
    setDayView(false);
    setMonthView(false);

    if (onclick) {
      onclick(true);
    }
  };

  return (
    <DropdownMenu>
      <MenuToReturnBasedOnMedia handleView={handleView} />
    </DropdownMenu>
  );
}
export const SwitchMonth = () => {
  const { setCurrDate, currDate, setState } = CalenderHook();

  const nextMonth = () => {
    const next = addMonths(currDate, 1);

    setCurrDate(next);
    setState(next);
  };
  const prevMonth = () => {
    const prev = subMonths(currDate, 1);
    prev.setDate(1);
    setCurrDate(prev);
    setState(prev);
  };

  return (
    <div className="flex items-center border rounded-md mx-2 dark:border-slate-800">
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800 "
        onClick={prevMonth}
      >
        &lt;
      </Button>
      <div className="text-sm font-medium ">{format(currDate, "MMMM")}</div>
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={nextMonth}
      >
        &gt;
      </Button>
    </div>
  );
};
export const SwitchDay = () => {
  const { state, setState, calendarDays, viewPort, setCurrDate } =
    CalenderHook();

  const NextDay = () => {
    const next = addDays(state, 1);

    next.setHours(0);
    next.setMinutes(0);
    next.setSeconds(0);
    next.setMilliseconds(0); // beacuse their are (hours,min,seconds,etc) for the currDate but no for the CalenderDaysArray So There will be a
    // problem beacuse the last day of the next to be, will be the same for the last of the Array
    switch (viewPort) {
      case 1:
        {
          if (isAfter(next, calendarDays[41] as Date)) {
            return null;
          }
          setState(next);
        }
        break;
      case 2: {
        if (differenceInCalendarDays(calendarDays[41], next) < 6) {
          return null;
        }
        setState(next);
      }
      default:
        setState(next);
    }
  };

  const PastDay = () => {
    const past = subDays(state, 1);

    if (isBefore(past, calendarDays.at(0) as Date)) {
      return null;
    }
    setState(past);
  };

  let editedDays = Array.from(Days);

  editedDays.shift();

  editedDays.push("Sat");

  return (
    <div className="flex items-center border rounded-md mx-2 dark:border-slate-800">
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800 "
        onClick={PastDay}
      >
        &lt;
      </Button>
      <div className="font-medium text-sm">
        {editedDays.map((day, index) => {
          if (index === getDay(state)) {
            if (isToday(state))
              return (
                <p className="hidden sm:block" key={index}>
                  Today
                </p>
              );
            if (isTomorrow(state))
              return (
                <p className="hidden sm:block" key={index}>
                  Tomorrow
                </p>
              );
            if (isYesterday(state))
              return (
                <p className="hidden sm:block" key={index}>
                  Yesterday
                </p>
              );
            return day;
          }
        })}
      </div>
      <Button
        className="hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={NextDay}
      >
        &gt;
      </Button>
    </div>
  );
};

// Tables Related Events
export const ExportAsCSV = ({ table }: { table: Table<any> }) => {
  const data = table.getRowModel().rows.map((row) => {
    return [
      row.original.id,
      row.original.name,
      row.original.status,
      row.original.verified,
    ];
  });

  const headers = ["ID", "Name", "Status", "Verified"];

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: ["id", "name", "status", "verified"],
    });
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" }); // Create a worksheet from JSON data
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Add the worksheet to the workbook
    XLSX.writeFile(workbook, "table_data.xlsx"); // Download the file
  };

  return <button onClick={handleExport}>Export to Excel</button>;
};

export const exportToPDF = (table: Table<any>) => {
  const doc = new jsPDF();

  // Add a title
  doc.text("Table", 4, 10);

  // Convert table data for jsPDF
  const tableData = table.getRowModel().rows.map((row) => {
    console.log(row.original);
    return [
      row.original.id,
      row.original.name,
      row.original.status,
      row.original.verified,
    ];
  });
  const tableHeaders = ["ID", "Name", "status", "verified"];

  // Add autoTable to the PDF
  doc.autoTable({
    head: [tableHeaders],
    body: tableData,
    startY: 20,
  });

  // Save the PDF
  doc.save("user-data.pdf");
};

// Notification Menu Related Events
export const notificationTime = (startDate: Date, endDate: Date) => {
  const hourTime = differenceInHours(startDate, endDate);
  if (hourTime < 1) {
    const minuteTime = differenceInMinutes(startDate, endDate);

    if (minuteTime < 1) {
      const secondTime = differenceInSeconds(startDate, endDate);

      return `${secondTime} seconds ago`;
    } else {
      return `${minuteTime} minute ago`;
    }
  } else if (hourTime >= 24 && hourTime < 48) {
    return `yesterday`;
  } else if (hourTime >= 48) {
    return `${format(endDate, "P")} `;
  } else {
    return `${hourTime} hours ago`;
  }
};

export const NotificationType = (notification: Notification) => {
  switch (notification.type) {
    case "appointment creation":
    case "medication creation":
      return <PlusCircleFilled className="text-green-800" />;
    case "appointment deletion":
    case "medication deletion":
      return <DeleteFilled className="text-red-800" />;
    case "Email Verification":
      return <ExclamationCircleFilled className="text-cyan-700" />;
    case "Email Verified":
      return <CheckCircleFilled className="text-green-700" />;
    case "New Member":
    case "patient creation":
      return <UserAddOutlined className="text-blue-700" />;
    case "patient deletion":
      return <UserDeleteOutlined className="text-red-800" />;
    case "medication updated":
      return <ReloadOutlined className="text-yellow-700" />;
    default:
      return <InfoCircleFilled className="text-blue-700" />;
  }
};

interface NotifcationProps {
  type: string;
  title: string;
  description: string;
  assignedBy: string;
  user: string;
  eventId?: string;
  eventType: string;
}

export const CreateNotification = (props: NotifcationProps) => {
  const { type, title, description, assignedBy, user, eventId, eventType } =
    props;

  const notificationData = new FormData();

  let data = {};

  if (eventType === "creation") {
    data = { type, title, description, assignedBy, user };
  } else {
    data = { type, title, description, assignedBy, user, eventId };
  }

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      notificationData.append(key, value as string);
    }
  });
  return notificationData;
};

export const switchOnNotifications = (
  apiString: string,
  session: Session | null,
  id: string | undefined
) => {
  let notificationData: any;

  switch (apiString) {
    case "patient":
      return (notificationData = CreateNotification({
        type: "patient deletion",
        title: "Patient Deletion",
        description: "deleted patient with id",
        assignedBy: `${userRole(session)} ${session?.user.name}`,
        user: `${session?.user.id}`,
        eventType: "deletion",
        eventId: `${id}`,
      }));
    case "appointments":
      return (notificationData = CreateNotification({
        type: "appointment deletion",
        title: "Appointment Deletion",
        description: "deleted appointment with id",
        assignedBy: `${userRole(session)} ${session?.user.name}`,
        user: `${session?.user.id}`,
        eventType: "deletion",
        eventId: `${id}`,
      }));
    case "medications":
      return (notificationData = CreateNotification({
        type: "medication deletion",
        title: "Medication Deletion",
        description: "deleted medication with id",
        assignedBy: `${userRole(session)} ${session?.user.name}`,
        user: `${session?.user.id}`,
        eventType: "deletion",
        eventId: `${id}`,
      }));
    default:
      return null;
  }
};

export const playSound = async (tone: keyof ObjectType) => {
  const notificationTone = notificationSounds(tone);
  const player = new Tone.Player(`${notificationTone}`).toDestination();
  player.autostart = true;
};

export const NotificationAssignedBy = (
  notification: Notification,
  session: any
) => {
  if (notification.assignedTo === "All") return;
  if (notification.type === "New Member") {
    switch (notification.assignedTo) {
      case "Admin":
        return;
    }
  }

  if (notification.user === session?.user.id) {
    return <p className="text-slate-500 font-medium mr-1">You Have</p>;
  } else {
    return (
      <p className="text-slate-500 font-medium mr-1">
        {notification.assignedBy} has
      </p>
    );
  }
};

export const NotificationDescription = ({
  notification,
}: {
  notification: Notification;
}) => {
  const Component = () => {
    if (notification.eventId) {
      switch (notification.assignedTo) {
        case "All":
          return;
        default:
          return (
            <React.Fragment>
              <p className="text-left text-[11px] text-green-900">
                {notification.eventId}
              </p>
              <p className="text-left text-[11px] ml-1">
                at {format(notification.updatedAt, "Pp")}
              </p>
            </React.Fragment>
          );
      }
    } else {
      switch (notification.assignedTo) {
        case "All":
          return;
        default:
          return (
            <React.Fragment>
              <p className="text-left text-[11px]">
                at {format(notification.updatedAt, "Pp")}
              </p>
            </React.Fragment>
          );
      }
    }
  };
  return (
    <div className="flex ">
      <Component />
    </div>
  );
};

export const SocketInitiator = async (
  notificationTO: string,
  tone: keyof ObjectType,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) => {
  const handleNewNotification = async (data: Notification) => {
    setNotifications((prev: Notification[]) => [...prev, data]);
    await playSound(tone);
  };

  socket.on(notificationTO, async (data: Notification) => {
    try {
      await handleNewNotification(data);
    } catch (error) {
      console.error("Error handling admin notification:", error);
    }
  });
};

export const userRole = (session: Session | null) => {
  switch (session?.user.role) {
    case "Admin":
      return "Admin";
    default:
      return "";
  }
};

export const ApiType = (state: boolean): string | undefined => {
  switch (state) {
    case true:
      return "from" +process.env.NEXT_PUBLIC_API_URL;
    case false:
      return process.env.NEXT_API;
      default: 
      return undefined
  }
};
conso