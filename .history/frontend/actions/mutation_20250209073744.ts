import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMedication, DeleteMedication } from "./getMedications";
import axios from "axios";
import { NotificationInstance } from "antd/es/notification/interface";
import Swal from "sweetalert2";

export const UseCreateMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => await CreateMedication(data),
    onSettled: async (_, error) => {
      if (error) {
        throw new Error(error.message);
      }

      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};

export const UseDeleteMedication = (api: NotificationInstance) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | undefined) => DeleteMedication(id),

    onMutate: () => {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onError: async (error) => {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data.message || "Something went wrong" 
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
              });
        } else {
          api.error({
            message: "Validation Error",
            description:
              error.response.data?.message || "Some fields are incorrect.",
          });
        }
      } else {
        api.error({
          message: "Unexpected Error",
          description: "Something went wrong. Please try again.",
        });
      }
    },

    onSettled: async (data, error) => {
      if (error) {
        throw new Error(error.message);
      }

      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};
