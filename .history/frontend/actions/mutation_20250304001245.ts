import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMedication, DeleteMedication } from "./Medications";
import axios from "axios";
import { NotificationInstance } from "antd/es/notification/interface";
import Swal from "sweetalert2";
import {
  CreateAppointment,
  DeleteAppointment,
  UpdateAppointment,
} from "./Appointments";
import { CreatePatient, DeletePatient } from "./Patients";
import HandleAxiosErrors from "@/components/HandleAxiosErrors";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import {
  ChangeUserInfo,
  LoginApi,
  LoginApiProps,
  PostRegister,
  PostRegisterProps,
  register,
} from "./User";
import { useRouter } from "next/navigation";
import { CreateNotification } from "./Notification";
import { data } from "@/components/togglers/Handlers";
import { AccountHook } from "@/components/context/AccountProvider";
import { getSession, useSession } from "next-auth/react";

export const UseCreateMedication = (api: NotificationInstance) => {
  const queryClient = useQueryClient();
  const { setIsLoading, setDrawerState } = DashboardHook();
  return useMutation({
    mutationFn: async (data: FormData) => await CreateMedication(data),
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });

      setIsLoading(false);
    },
    onSettled: async (_, error) => {
      if (error) {
        throw new Error(error.message);
      }

      await queryClient.invalidateQueries({ queryKey: ["medications"] });

      setIsLoading(false);
    },
    onSuccess: (response) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response?.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsLoading(false);
      setDrawerState(false);
    },
  });
};

export const UseDeleteMedication = (api: NotificationInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | undefined) => DeleteMedication(id),
    onError: (error) => {
      HandleAxiosErrors({ error, api });
    },
    onSettled: async (data, error) => {
      api.success({
        message: data?.data.message,
        pauseOnHover: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};

export const UseUpdateAppointment = (
  api: NotificationInstance,
  id: string | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (state: data) => UpdateAppointment(id, state),
    onError: (error) => {
      HandleAxiosErrors({ error: error, api: api });
    },
    onSettled: async (response) => {
      api.success({
        message: response?.data.message,
        pauseOnHover: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["userAppointments"],
      });
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
  const { setIsLoading, setDrawerState } = DashboardHook();
  return useMutation({
    mutationFn: async (patient: FormData) => await CreatePatient(patient),
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });

      setIsLoading(false);
    },
    onSuccess: async (data) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsLoading(false);
      setDrawerState(false);

      await queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
};

export const useLogin = (api: NotificationInstance, loginState: boolean) => {
  const router = useRouter();
  const { setIsLoading } = DashboardHook();

  return useMutation({
    mutationFn: LoginApi,
    onMutate: () => {
      setIsLoading(true);
    },
    onError: async (error) => {
      setIsLoading(false);
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
      setIsLoading(false);
    },
  });
};
export const UseRegister = (api: NotificationInstance) => {
  const login = useLogin(api, false);
  const router = useRouter();
  const { setIsLoading } = DashboardHook();

  return useMutation({
    mutationFn: async (formdata: FormData) => await register(formdata),
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
      setIsLoading(false);
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
      setIsLoading(false);
    },
  });
};

export const UsePostRegister = (api: NotificationInstance) => {
  const router = useRouter();
  const { setIsLoading } = DashboardHook();

  return useMutation({
    mutationFn: async ({ formData, id }: PostRegisterProps) =>
      await PostRegister({ formData, id }),
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSuccess: async (response) => {
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 2000,
      });

      setIsLoading(false);

      router.push("/dashboard");

      // await axios.post(
      //   "http://localhost:8080/api/notifications/system",
      //   {
      //     notification:"newUserHasJoined",
      //     user:response.existingUser
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }

      // );
    },
  });
};


export const UseUpdateUser = (api:NotificationInstance,id:string | undefined) => {
  const queryClient = useQueryClient()
  const {setIsLoading,setProfileEdit,setAccountEdit} = AccountHook()
  return useMutation({
    mutationFn: (formData:FormData) => ChangeUserInfo(id,formData),
    onMutate:() => {
      setIsLoading(true)
    },
    onError:(error) => {
      HandleAxiosErrors({api,error})
      setIsLoading(false)
    },
    onSuccess:async(response) => {

      if(response.data.state){
        api.success({
          message:response.data.message,     
          placement:"bottomRight"  
        })
        setIsLoading(false)

        return
      }
      api.success({
        message:response.data.message,       
      })

      await queryClient.invalidateQueries({queryKey:["user",id]})
      setIsLoading(false)
      setProfileEdit(false)
      setAccountEdit(false)
    }
  })
} 
export const UseCreateNotification = (api: NotificationInstance) => {
  return useMutation({
    mutationFn:  (formData: FormData) => CreateNotification(formData),
    onError: (error) => {
      HandleAxiosErrors({ api: api, error: error });
    },
    onSuccess: () => {
      console.log("submitted");
    },
  });
};


export const UseGenerateCode = (api: NotificationInstance,id:string | undefined) => {
  return useMutation({
    mutationFn: () => generateCode
  })
}