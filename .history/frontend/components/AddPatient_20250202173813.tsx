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
      // content: <FirstStepForm form={form} />,
    },
    {
      title: "Emergency",
      // content: <SecondStepForm form={form} />,
    },
    {
      title: "Medical"
    }
  ]

  return (
<Drawer
  anchor="right"
  open={drawerState}
  onClose={toggleDrawer(false)}
  PaperProps={{
    sx: { width: "50vw", maxWidth: "640px" }, // Apply width correctly
  }}
>
</
  )

}