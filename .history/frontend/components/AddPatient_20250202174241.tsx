"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import SubmitButton from "./togglers/SubmitButton";
import { patientSchema } from "@/lib/vaildation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { DashboardHook } from "./context/Dashboardprovider";
import { Drawer } from "@mui/material";
import { PatientHook } from "./context/PatientProvider";
import { Steps } from "antd";
// import { lato } from "@/fonts/fonts";
// import FirstStepForm from "./patient/createPatient/firstStepForm";
// import SecondStepForm from "./patient/createPatient/SecondStepForm";
// import ThirdStepForm from "./patient/createPatient/ThirdStepForm";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import Swal from "sweetalert2";
import { CreateNotification } from "./togglers/TopBarEvents";
import FirstStepForm from "./patient/createPatient/FirstStepForm";
import ThirdStepForm from "./patient/createPatient/ThirdStepForm";
const AddPatient = () => {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { drawerState, setDrawerState } = PatientHook();
  const { api, contextHolder } = DashboardHook();
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

  const form = useForm<Zod.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      currentMedications: "",
      insuranceProvider: "",
      emergencyContactPerson: "",
      residentialAddress: "",
    },
  });
  const onSubmit = async (values: Zod.infer<typeof patientSchema>) => {
    setIsLoading(true);

    const formData = new FormData();

    const notificationData = CreateNotification({
      type: "patient creation",
      title: "patient Creation",
      description: "created a new patient",
      assignedBy: ` ${session?.user.name}`, //${userRole(session)}
      user: `${session?.user.id}`,
      eventType: "creation",
    });
    const data = {
      userId: session?.user.id,
      profileImg: values.profileImg?.[0], // Optional chaining
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

    try {
      const response = await axios.post(
        "http://localhost:8080/api/patient/create",
        formData
      );

      if (response.status === 201)
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

      await axios.post(
        `http://localhost:8080/api/notifications/create`,
        notificationData
      );

      setDrawerState(false);

      setCurrent(0);

      form.reset();

      router.refresh();
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

  const steps = [
    {
      title: "Personal Info",
      content: <FirstStepForm form={form} />,
    },
    {
      title: "Emergency",
      content:"",
    },
    {
      title: "Medical",
      content:<ThirdStepForm  form={form} />
    }
  ]

  const checkForFormValidation = () => {
    const isValid = form.formState.isValid; // Get form validation state
  
    if (!isValid) {
      api.error({
        message: "Required Fields",
        description: "Please satisfy all the required fields",
        showProgress: true,
        pauseOnHover: false,
        role: "status",
      });
    } else {
      console.log("Form is valid, proceed with the action!");
    }
  };
  
  return (
<React.Fragment>
      {contextHolder}
      <Button className="AppointmentCreate" onClick={toggleDrawer(true)}>
        Create Patient
      </Button>
      <Drawer
  anchor="right"
  open={drawerState}
  onClose={toggleDrawer(false)}
  PaperProps={{
    sx: { width: "50vw", maxWidth: "640px" }, // Apply width correctly
  }}
>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-10  p-4 dark:bg-[var(--sidebar-accent)]"
          >
           <div className="flex flex-col justify-start gap-7 ">
              <h1
                className={`text-slate-800 text-center font-bold text-lg dark:text-slate-50 `}
              >
                Create Patient
              </h1>
              <Steps
                type="navigation"
                responsive
                className="p-4 custom-steps "
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
  )

}