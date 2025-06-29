import { Notifications } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstace = axios.create({ baseURL: `${API_URL}/api/notifications` });
export const getUserNotifications = async (id: string | undefined) => {
  return (await axiosInstace.get<Notifications>(`/${id}`)).data;
};

export const CreateNotification = async (formData: FormData) => {
  return await axiosInstace.post("/create", formData);
};

interface UpdateNotificationSeenProps {
  id: string | undefined;
  notificationId: string;
}

export const UpdateNotificationSeen = async ({
  id,
  notificationId,
}: UpdateNotificationSeenProps) => {
  return await axiosInstace.put(`/update/${id}`, {
    notificationId,
    seen: true,
  });
};
