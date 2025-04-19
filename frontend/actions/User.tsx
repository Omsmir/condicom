import { user, UserInformation, Users } from "@/types";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signIn, signOut, useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstace = axios.create({
  baseURL: `${API_URL}/api/auth/`,
});

export const getUsers = async (id: string | undefined) => {
  const response = await axiosInstace.get<Users>(`/users/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return response.data;
};
export const getUserQuery = async (id: string | undefined) => {
  const response = await axiosInstace.get<user>(`${id}`);

  await new Promise((resolve) => setTimeout(resolve, 300));

  return response.data;
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export type LoginApiProps = {
  email: string | undefined;
  password: string | undefined;
};

export const LoginApi = async ({ email, password }: LoginApiProps) => {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!result || result.error) {
    throw new Error(result?.error || "failed");
  }

  return result;
};

export interface PostRegisterResponse {
  message: string;
  existingUser: UserInformation;
}

export interface RegisterResponse {
  message: string;
  SupportedInfo: {
    profileState: boolean;
  };
}

export interface PostRegisterProps {
  formData: FormData;
  id: string | undefined;
}

export const register = async (
  FormData: FormData
): Promise<RegisterResponse> => {
  return (await axiosInstace.post(`register`, FormData)).data;
};

export const PostRegister = async ({
  formData,
  id,
}: PostRegisterProps): Promise<PostRegisterResponse> => {
  return (await axiosInstace.put(`${id}`, formData)).data;
};

export const SendEmailVerification = async (id: string | undefined) => {
  return await axiosInstace.post(`/email/verify/send/${id}`);
};

export const ChangeUserInfo = async (
  id: string | undefined,
  data: FormData
) => {
  return await axiosInstace.put(`/update/${id}`, data);
};

export const ChangeUserPassword = async (
  id: string | undefined,
  data: FormData
) => {
  return await axiosInstace.put(`/password/change/${id}`, data);
};

export const SendVerificationEmail = async (data: FormData) => {
  return await axiosInstace.put(`/password/reset/message/`, data);
};

interface Token {
  state: boolean;
  message: string;
}
export const checkToken = async (token: string, hashname: string) => {
  return (await axiosInstace.get<Token>(`/password/reset/${token}/${hashname}`))
    .data;
};

export const ResetNewPassword = async (
  token: string | undefined,
  formData: FormData
) => {
  return await axiosInstace.put(`password/reset/${token}`, formData);
};

interface EmailChange {
  message: string;
  token?: string;
  state: boolean;
}
export const SendEmailChange = async (
  id: string | undefined,
  formData: FormData
): Promise<EmailChange> => {
  return (await axiosInstace.post(`/email/change/otp/${id}`, formData)).data;
};

export const ConfirmEmailChange = async (
  id: string | undefined,
  formData: FormData
): Promise<EmailChange> => {
  return (await axiosInstace.post(`/email/change/verify/${id}`, formData)).data;
};

export const changeProfileImage = async (
  id: string | undefined,
  formData: FormData
) => {
  return await axiosInstace.put(`/picture/${id}`, formData);
};

interface RefreshTokenResponse {
  refreshToken: string;
  accessToken: string;
  sessionState: boolean;
}
export const refreshAccessToken = async (token: any) => {
  try {
    const response = await axiosInstace.get<RefreshTokenResponse>(
      `/reIssueAccessToken`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-refresh": token,
        },
      }
    );

    const { accessToken, refreshToken, sessionState } = response.data;

    if (!sessionState) return signOut();
    if (!accessToken) throw new Error();

    const decodedToken = jwt.decode(accessToken) as JwtPayload;

    return {
      ...decodedToken,
      accessToken: accessToken,
      expiresAt: decodedToken?.exp && decodedToken.exp * 1000,
      id: decodedToken?._id,
      role: decodedToken?.role,
      name: decodedToken?.name,
      profileImg: decodedToken?.profileImg.url,
      verified: decodedToken?.verified,
      refreshToken: refreshToken,
      profileState: decodedToken.profileState,
      codeExp: decodedToken.codePlan,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return { ...token, accessToken: null, error: "RefreshTokenError" };
  }
};

interface verifyEmailProps {
  message: string;
  state: boolean;
}

export const verifyEmail = async (
  id: string | undefined
): Promise<verifyEmailProps> => {
  return await axiosInstace.post(`/email/verify/${id}`);
};
