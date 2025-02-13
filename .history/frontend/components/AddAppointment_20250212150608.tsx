"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./CustomFormField";
import { useState } from "react";
import { User } from "lucide-react";
import SubmitButton from "./togglers/SubmitButton";
import { AppointmentSchema } from "@/lib/vaildation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CalenderHook } from "./context/CalenderProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInMinutes, isSameDay } from "date-fns";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import { DashboardHook } from "./context/Dashboardprovider";
import { CreateNotification, userRole } from "./togglers/TopBarEvents";
import { UseCreateAppointment, UseCreateNotification } from "@/actions/mutation";

const AddAppointment = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const { visible, setVisible, calendarDays, date, disabled } = CalenderHook();

  const { api, contextHolder } = DashboardHook();

  const createAppointment = UseCreateAppointment(api);
  const createNotifcation = UseCreateNotification(api)
  const handleClickOpen = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  const onSubmit = async (values: Zod.infer<typeof AppointmentSchema>) => {
    setIsLoading(true);

    const formData = new FormData();

    const hoursInterval = differenceInMinutes(values.endDate, values.startDate);
    const startDate = values.startDate;
    const endDate = values.endDate;
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);

    const data = {
      startDate: startDate,
      endDate: endDate,
      task: values.Task,
      interval: `${(hoursInterval / 30) * 100}`,
      color: `#${values.color}`,
      userId: session?.user.id,
      description: values.description,
    };

    Object.entries(data).map(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });
    const notificationData = CreateNotification({
      type: "appointment creation",
      title: "Appointment Creation",
      description: "created a new appointment",
      assignedBy: `${userRole(session)} ${session?.user.name}`,
      user: `${session?.user.id}`,
      eventType: "creation",
    });
    try {
      const response = await createAppointment.mutateAsync(formData);

      await 
      setVisible(false);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        style={{ zIndex: 1000 }}
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

export default AddAppointment;
