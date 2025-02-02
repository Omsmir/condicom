"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./CustomFormField";
import { useCallback, useState } from "react";
import { User } from "lucide-react";
import SubmitButton from "./togglers/SubmitButton";
import { AppointmentSchema } from "@/lib/vaildation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CalenderHook } from "./context/CalenderProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { isBefore, isEqual, differenceInMinutes, isSameDay } from "date-fns";
import Button from "@mui/material/Button";
import { styled, Dialog, DialogContent, DialogTitle } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import { DashboardHook } from "./context/Dashboardprovider";
import { notification } from "antd";


const AddEvent = ({ state }: { state: boolean }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { visible, setVisible, calendarDays, date, disabled } = CalenderHook();

  const { api, contextHolder } = DashboardHook();

  const handleClickOpen = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  const onSubmit = async (values: Zod.infer<typeof AppointmentSchema>) => {
    setIsLoading(true);

    const notificationData = new FormData();

    const formData = new FormData();

    const hoursInterval = differenceInMinutes(values.endDate, values.startDate);
    const startDate = values.startDate;
    const endDate = values.endDate;
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    formData.append("task", values.Task);
    formData.append("startDate", startDate.toString());
    formData.append("endDate", endDate.toString());
    formData.append("interval", `${(hoursInterval / 30) * 100}`);
    formData.append("color", `#${values.color}`);
    formData.append("userId", session?.user.id as string);
    formData.append("description", values.description as string);

const userRole = () => {
  if(session?.user.role === "Admin") return "Admin"
  return ""
}
    //  Appointment Creation NotificationData
    notificationData.append("type","appointment creation")
    notificationData.append("title","Appointment Creation")
    notificationData.append("description", `created a new appointment`)
    notificationData.append("assignedBy",`${userRole()} ${session?.user.name}`)
    notificationData.append("user",`${session?.user.id}`)

    
    try {
  
      const response = await axios.post(
        `http://localhost:8080/api/appointments`,
        formData
      );

      if (response.status === 201) {
        api.success({
          message: "Appointment Created Successfully",
          description: "Your appointment has been successfully created",
          showProgress: true,
          pauseOnHover: false,
        });

        await axios.post(`http://localhost:8080/api/notifications/create`,notificationData)
        setVisible(false);

        router.refresh();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          api.error({
            message: `${error.response.data.message}`,
            description: "something went wrong",
            showProgress: true,
            pauseOnHover: false,
          });
        } else {
          api.error({
            message: "No Response from Server",
            description:
              "Please check your network connection or try again later.",
            showProgress: true,
            pauseOnHover: false,
          });
        }
      } else if (error instanceof Error) {
        api.error({
          message: "Unexpected Error",
          description: error.message,
          showProgress: true,
          pauseOnHover: false,
        });
      }
    }

    setIsLoading(false);
  };

  const form = useForm<Zod.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      Task: "",
      startDate: new Date(),
      endDate: new Date(),
      color: "242c55",
      description: "",
    },
  });
  return (
    <React.Fragment>
      {contextHolder}
      <Button className="AppointmentCreate" onClick={handleClickOpen}>
        Add Event
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
        style={{zIndex: 1000}}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{ fontSize: "18px", fontWeight: "bold" }}
          className="dark:bg-[var(--sidebar-background)] dark:text-slate-50"
        >
          Create Appointment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="dark:bg-[var(--sidebar-background)]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 space-y-12 "
            >
              <CustomFormField
                control={form.control}
                Lucide={<User className="dark:text-dark-600" />}
                placeholder="chemistry at 7PM"
                label="Task"
                fieldType={FormFieldType.INPUT}
                name="Task"
                error={form.formState.errors.Task}
                state
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="description"
                placeholder="Details about appointment"
                label="Description"
                Lucide={<User className="dark:text-dark-600" />}
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE}
                label="Start Time"
                name="startDate"
                showTimeSelect
                calenderDays={calendarDays}
                error={form.formState.errors.startDate}
              />
              <section className="flex ">
                <div className="flex items-center w-[80%]">
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.DATE}
                    label="End Time"
                    name="endDate"
                    showTimeSelect
                    calenderDays={[date]}
                    disabled={disabled}
                  />
                </div>
                <div className="flex items-start w-[20%] ml-2">
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.COLOR}
                    label="Color"
                    name="color"
                  />
                </div>
              </section>

              <SubmitButton
                isLoading={isLoading}
                className="bg-[#6366f1] w-full text-slate-50"
              >
                Create Appointment
              </SubmitButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEvent;

export const dynamic = "force-dynamic";
