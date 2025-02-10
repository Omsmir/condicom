"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { prop } from "@/types";
import { DashboardHook } from "../context/Dashboardprovider";
import { useSession } from "next-auth/react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import React from "react";
import {
  CreateNotification,
  switchOnNotifications,
  userRole,
} from "./TopBarEvents";
import { UseDeleteAppointment, UseDeleteMedication } from "@/actions/mutation";

export const MyHandler = ({ id, name, className, state }: prop) => {
  const router = useRouter();

  const { api } = DashboardHook();
  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Do you want to delete the product?",
        showDenyButton: true,
        denyButtonText: "cancel",
        denyButtonColor: "#94a3b8",
        confirmButtonColor: "#dc3741",
        confirmButtonText: "delete",
      }).then(async (result) => {
        if (result.isDenied) {
          api.info({ message: "Changes Aren't Saved" });
        } else if (result.isConfirmed) {
          const response = await axios.delete(
            `http://localhost:8080/api/products/${id}/`
          );

          Swal.fire("deleted", "", "success");

          router.push("/dashboard"); // Redirect to the products page
        }
      });
    } catch (error: any) {
      api.error({
        message: "Error Deleting Product",
        description: error.message,
      });
    }
  };

  const handleEdit = async () => {
    router.push(`/dashboard/products/${id}/edit`);
  };
  const stateManagement = () => {
    if (!state) return handleDelete();

    return handleEdit();
  };

  return (
    <Button className={className} onClick={stateManagement}>
      {name}
    </Button>
  );
};

type DeleteHandlerProps = {
  name?: string;
  className?: string;
  id: string | undefined;
  style?: string;
  patientState?: boolean;
  apiString: string;
  messagePopup: string;
};
export const DeleteHandler = ({
  id,
  name,
  className,
  style,
  patientState,
  apiString,
  messagePopup,
}: DeleteHandlerProps) => {
  const { api } = DashboardHook();
  const { data: session } = useSession();
  const deleteMedication = UseDeleteMedication(api);
  const deleteAppointment = UseDeleteAppointment()

  const handleApiDeletion = () => {
    switch(apiString){
      case "medications":
        deleteMedication
    }
  }
  const handleDelete = async () => {
    const notificationData = switchOnNotifications(apiString, session, id);

    try {
      Swal.fire({
        title: messagePopup,
        showDenyButton: true,
        denyButtonText: "Cancel",
        denyButtonColor: "#94a3b8",
        confirmButtonColor: "#dc3741",
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        } else if (result.isConfirmed) {
         
          deleteMedication.mutate(id)
          await axios.post(
            `http://localhost:8080/api/notifications/create`,
            notificationData
          );
        }
      });
    } catch (error: any) {
      api.error({
        message: error.message || "Unexpected error",
        description: "Something went wrong",
      });
    }
  };

  return (
    <React.Fragment>
      {patientState ? (
        <DropdownMenuItem
          onClick={handleDelete}
          className="cursor-pointer hover:bg-slate-200 dark:hover:bg-[var(--sidebar-background)]"
        >
          Delete
        </DropdownMenuItem>
      ) : (
        <Button
          className={className}
          style={{ display: style }}
          onClick={handleDelete}
        >
          {name}
        </Button>
      )}
    </React.Fragment>
  );
};

export const ToggleButton = ({ id, state }: { id: string; state: boolean }) => {
  const formData = new FormData();
  const router = useRouter();
  const { api } = DashboardHook();


  formData.append("completed", state as any);
  const onSubmit = async () => {
    try {
     await axios.put(
        `http://localhost:8080/api/appointments/${id}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      api.success({
        message: state
          ? "Appointment marked as completed"
          : "Appointment marked as uncompleted",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onDoubleClick={onSubmit}
      className="hidden justify-center items-end py-2 text-center text-slate-50 text-[12px] normal absolute inset-0 opacity-65 edit"
    >
      {!state ? "Completed" : "Uncompleted"}
    </div>
  );
};
