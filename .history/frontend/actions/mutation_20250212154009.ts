import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMedication, DeleteMedication } from "./Medications";
import axios from "axios";
import { NotificationInstance } from "antd/es/notification/interface";
import Swal from "sweetalert2";
import { CreateAppointment, DeleteAppointment } from "./Appointments";
import { CreatePatient, DeletePatient } from "./Patients";
import HandleAxiosErrors from "@/components/HandleAxiosErrors";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { LoginApi, LoginApiProps, PostRegister, PostRegisterProps, register } from "./User";
import { useRouter } from "next/navigation";
import { CreateNotification } from "./Notification";

export const UseCreateMedication = (api: NotificationInstance) => {
  const queryClient = useQueryClient();
   const {setIsLoading,setDrawerState} = DashboardHook()
  return useMutation({
    mutationFn: async (data: FormData) => await CreateMedication(data),
    onMutate:() => {
      setIsLoading(true)
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSettled: async (_, error) => {
      if (error) {
        throw new Error(error.message);
      }

      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
    onsu
  });
};

export const UseDeleteMedication = (api: NotificationInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | undefined) => DeleteMedication(id),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data.message || "Something went wrong",
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    },
    onSettled: async (data, error) => {
      if (error) {
        throw new Error(error.message);
      }
      api.success({
        message: data?.data.message || "or",
        showProgress: true,
        pauseOnHover: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};

export const UseDeleteAppointment = (api: NotificationInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | undefined) => DeleteAppointment(id),
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSettled: async (data, error) => {
      if (error) {
        throw new Error(error.message);
      }
      api.success({
        message: data?.data.message,
        pauseOnHover: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["userAppointments"],
      });
    },
  });
};

export const UseCreateAppointment = (api: NotificationInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointment: FormData) => CreateAppointment(appointment),
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSettled: async (data, error) => {
      if (error) {
        throw new Error(error.message);
      }
      api.success({
        message: "Appointment Created Successfully",
        description: "Your appointment has been successfully created",
        showProgress: true,
        pauseOnHover: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["userAppointments"],
      });
    },
  });
};

export const UseDeletePatient = (api: NotificationInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | undefined) => DeletePatient(id),
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSettled: async (data, error, variables) => {
      if (error) {
        throw new Error(error.message);
      }
      api.success({
        message: data?.data.message,
        pauseOnHover: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["patient", variables],
      });
    },
  });
};

export const UseCreatePatient = (api: NotificationInstance) => {
  const queryClient = useQueryClient();
  const { setIsLoading,setDrawerState } = DashboardHook();
  return useMutation({
    mutationFn: async (patient: FormData) => await CreatePatient(patient),
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });

      setIsLoading(false);
    },
    onSettled: async (data, error) => {
      if (error) {
        throw new Error(error.message);
      }

      await queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
    onSuccess: () => {
      setIsLoading(false);
      
    },
  });
};

export const useLogin = (api: NotificationInstance, loginState: boolean) => {
  const router = useRouter();
  return useMutation({
    mutationFn: LoginApi,
    onError:async (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSuccess: () => {
      if (loginState) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      router.push("/dashboard");

    },
  });
};
export const UseRegister = (api: NotificationInstance) => {
  const login = useLogin(api, false);
  const router = useRouter();
  const {setIsLoading} = DashboardHook()

  return useMutation({
    mutationFn: async (formdata: FormData) => await register(formdata),
    onMutate:() =>{
      setIsLoading(true)
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSuccess: async (response, variables) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "registered successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      const email = variables.get("email") as string | undefined;
      const password = variables.get("password") as string | undefined;

      await login.mutateAsync({ email, password });

      router.push("/register/profile");
    },
  });
};



export const UsePostRegister = (api:NotificationInstance) => {
  const router = useRouter();
  const {setIsLoading} = DashboardHook()

  return useMutation({
    mutationFn: async ({formData,id}:PostRegisterProps) => await PostRegister({formData,id}),
    onMutate:() =>{
      setIsLoading(true)
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSuccess:async(response) =>{
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 2000,
      });

      setIsLoading(false)

      router.push("/dashboard")
         
      await axios.post(
        "http://localhost:8080/api/notifications/system",
        {
          notification:"newUserHasJoined",
          user:response.existingUser
        },
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }

      );
    }
  })
}
export const UseCreateNotification = (api:NotificationInstance) => {
  return useMutation({
    mutationFn: async (formData: FormData) => await CreateNotification(formData),
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSuccess:() => {
      console.log("submitted")
    }
  })
}