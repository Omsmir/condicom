"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import SubmitButton from "./togglers/SubmitButton";
import { patientSchema } from "@/lib/vaildation";
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
import FirstStepForm from "./patient/createPatient/FirstStepForm";
import ThirdStepForm from "./patient/createPatient/ThirdStepForm";
import SecondStepForm from "./patient/createPatient/SecondStepForm";
import { lato } from "@/fonts/fonts";
import { UseCreatePatient } from "@/actions/mutation";

const AddPatient = () => {
  const [current, setCurrent] = useState(0);
  const { api, drawerState,isLoading, setDrawerState } = DashboardHook();
  const { data: session } = useSession();

  const createPatient = UseCreatePatient(api);

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

  const form = useForm<Zod.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      currentMedication: "",
      insuranceProvider: "",
      emergencyContactPerson: "",
      residentialAddress: "",
    },
  });
  const onSubmit = async (values: Zod.infer<typeof patientSchema>) => {

    try {
      const formData = new FormData();

      const notificationData = CreateNotification({
        type: "patient creation",
        title: "patient Creation",
        description: "created a new patient",
        assignedBy: `${userRole(session)} ${session?.user.name}`,
        user: `${session?.user.id}`,
        eventType: "creation",
      });
      const data = {
        userId: session?.user.id,
        profileImg: values.profileImg && values.profileImg[0], // Optional chaining
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        email: values.email,
        phone: values.phone,
        country: values.country?.label,
        weight: values.weight,
        height: values.height,
        bloodType: values.bloodType,
        gender: values.gender,
        emergencyContactPerson: values.emergencyContactPerson,
        emergencyContactRelationship: values.emergencyContactRelationship,
        emergencyContactNumber: values.emergencyContactNumber,
        residentialAddress: values.residentialAddress,
        insuranceProvider: values.insuranceProvider,
        pastSurgeries: values.pastSurgeries,
        familyMedicalHistory: values.familyMedicalHistory,
        currentMedications: values.currentMedications,
        medicalConditions: values.medicalConditions,
        allergies: values.allergies,
        smoking: values.smoking,
        smokingFrequency: values.smokingFrequency,
        alcohol: values.alcohol,
        alcoholFrequency: values.alcoholFrequency,
      };

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value as string);
        }
      });
      createPatient.mutate(formData, {
        onSettled: async (_, error) => {

          if(error) return
          setCurrent(0);

          form.reset();
          await axios.post(
            `http://localhost:8080/api/notifications/create`,
            notificationData
          );
        },
      });
    } catch (error: unknown) {
      console.log(error);
    } 
  };

  const steps = [
    {
      title: "Personal Info",
      content: <FirstStepForm form={form} />,
    },
    {
      title: "Emergency",
      content: <SecondStepForm form={form} />,
    },
    {
      title: "Medical",
      content: <ThirdStepForm form={form} />,
    },
  ];

  const isValid = form.formState.isValid;

  const checkForFormValidation = () => {
    if (!isValid) {
      api.error({
        message: "Some Fields Are Missing",
        description: "Please satisfy all the required fields",
        showProgress: true,
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
      <Button className="AppointmentCreate" onClick={toggleDrawer(true)}>
        Create Patient
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
                Create Patient
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
export default AddPatient;
