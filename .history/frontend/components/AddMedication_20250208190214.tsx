"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import SubmitButton from "./togglers/SubmitButton";
import { MedicationSchema } from "@/lib/vaildation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { DashboardHook } from "./context/Dashboardprovider";
import { Drawer } from "@mui/material";
import { PatientHook } from "./context/PatientProvider";
import { Steps } from "antd";
import Swal from "sweetalert2";
import { CreateNotification, userRole } from "./togglers/TopBarEvents";

import { lato } from "@/fonts/fonts";
import FirstStepForm from "./pharmacy/AddMedication/FirstStepForm";
import SecondStepForm from "./pharmacy/AddMedication/SecondStepForm";
import { getSpecficMedication } from "@/actions/getMedications";
import { medication } from "@/types";
import { UseCreateMedication } from "@/actions/mutation";

const AddMedication = () => {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { api, contextHolder, drawerState, setDrawerState } = DashboardHook();
  const createMedication = UseCreateMedication()
  const { data: session } = useSession();
  const router = useRouter();

  const next = async () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerState(open);
    };

  const form = useForm<Zod.infer<typeof MedicationSchema>>({
    resolver: zodResolver(MedicationSchema),
    defaultValues: {
      name: "",
      generic_name: "",
      supplier: "",
      manufacturer: "",
      description: "",
      batch_number: "",
      storage_conditions: "",
      price: 1,
      stock_quantity: 1,
    },
  });
  const NotificationToSwitch = (state: boolean, id?: string) => {
    return CreateNotification({
      type: state ? "medication creation" : "medication updated",
      title: state ? "Medication Creation" : "Medication Updated",
      description: state
        ? "Created a new medication"
        : `Updated medication with ID: ${id}`,
      assignedBy: `${userRole(session)} ${session?.user.name}`,
      user: `${session?.user.id}`,
      eventType: state ? "creation" : "updating",
      eventId: state ? undefined : id,
    });
  };

  const onSubmit = async (values: Zod.infer<typeof MedicationSchema>) => {
    createMedication.mutate(values, {
      onSuccess: async (newMedication) => {

        if(axios.)
        const notificationData = NotificationToSwitch(
          !newMedication.stateOfCreation,
          newMedication.medication?._id
        );

        await axios.post(
          "http://localhost:8080/api/notifications/create",
          notificationData
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Medication successfully created!",
          showConfirmButton: false,
          timer: 1500,
        });

        setDrawerState(false);

        setCurrent(0);
        form.reset();
            },
      onError: (error) => {
       if(axios.isAxiosError(error)){
        if(error.response){
          api.error({
            message: error.response?.data?.message || "An error occurred",
            description: "Please check your input and try again.",
          });
        }
       }
      },
    });
  };

  const steps = [
    {
      title: "Medication Info",
      content: <FirstStepForm form={form} />,
    },
    {
      title: "Supply Info",
      content: <SecondStepForm form={form} />,
    },
  ];

  const isValid = form.formState.isValid;

  const checkForFormValidation = () => {
    if (!isValid) {
      api.error({
        message: "Some Fields Are Missing",
        description: "Please satisfy all the required fields",
        showProgress: false,
        pauseOnHover: false,
        role: "status",
        placement: "bottomLeft",
      });
    } else {
      console.log("Form is valid, proceed with the action!");
    }
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <React.Fragment>
      {contextHolder}
      <Button className="AppointmentCreate" onClick={toggleDrawer(true)}>
        Add Medication
      </Button>
      <Drawer
        anchor="right"
        open={drawerState}
        onClose={toggleDrawer(false)}
        style={{
          zIndex: 30,
        }}
        PaperProps={{
          className:
            "dark:bg-[var(--sidebar-accent)] w-[100vw] sm:w-[80vw] md:w-[70vw] lg:w-[630px] max-w-[640px]",
        }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full   space-y-10  p-4 "
          >
            <div className="flex flex-col justify-start gap-7 ">
              <h1
                className={`text-slate-800 text-center font-bold text-lg dark:text-slate-50 ${lato.className}`}
              >
                Add Medication
              </h1>
              <Steps
                type="navigation"
                responsive
                className="p-4 custom-steps  dark:text-white"
                current={current}
                items={items}
              />
            </div>

            {steps[current].content}

            <div className="flex w-full">
              {current < steps.length - 1 && (
                <span
                  className="flex-1 cursor-pointer bg-blue-700 text-slate-50 py-2 px-4 rounded-md text-center"
                  onClick={() => next()}
                >
                  Next
                </span>
              )}
              {current === steps.length - 1 && (
                <SubmitButton
                  className="bg-[#6366f1] text-slate-50 w-[80%]"
                  isLoading={isLoading}
                  onclick={checkForFormValidation}
                >
                  submit
                </SubmitButton>
              )}
              {current > 0 && (
                <span
                  onClick={() => prev()}
                  className="cursor-pointer ml-2 bg-slate-200 py-2 px-4 rounded-md "
                >
                  Previous
                </span>
              )}
            </div>
          </form>
        </Form>
      </Drawer>
    </React.Fragment>
  );
};
export default AddMedication;
