"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { prop } from "@/types";
import { DashboardHook } from "../context/Dashboardprovider";

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

export const DeleteAppointmentButton = ({
  id,
  name,
  className,
  style,
}: prop) => {
  const router = useRouter();
  const { api } = DashboardHook();

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Do you want to delete the Appointment?",
        showDenyButton: true,
        denyButtonText: "cancel",
        denyButtonColor: "#94a3b8 ",
        confirmButtonColor: "#dc3741",
        confirmButtonText: "delete",
      }).then(async (result) => {
        if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        } else if (result.isConfirmed) {
          const res = await axios.delete(
            `http://localhost:8080/api/appointments/${id}/`
          );

          api.success({message:res.data.message})

          router.refresh();
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.response.message,
        text: "Something went wrong!",
      });
    }
  };
  return (
    <Button
      className={className}
      style={{ display: style }}
      onClick={handleDelete}
    >
      {name}
    </Button>
  );
};

export const ToggleButton =  ( {id,state}:{id:string,state:boolean}) => {
  const formData = new FormData();
  const router = useRouter()
  const { api } = DashboardHook();


  formData.append("completed", state as any);
  const onSubmit = async () => { 
    try {
      const res = await axios.put(
        `http://localhost:8080/api/appointments/${id}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      api.success({message:state? "Appointment marked as completed": "Appointment marked as uncompleted"})
      router.refresh()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div onDoubleClick={onSubmit} className="hidden justify-center items-end py-2 text-center text-slate-50 text-[12px] normal absolute inset-0 opacity-65 edit">
      {state?  "DB Click To Mark As Completed" :"DB Click To Mark As Uncompleted"}
    </div>
  )
};
