import { UserInformation } from "@/types";
import { getSession } from "next-auth/react";

export const getUser = async (userId: string | undefined) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/${userId}`);
  
      if (!response.ok) {
        throw new Error("Failed To Get user Data");
      }
  
      const data = await response.json();
  
      const user = (await data.user) as UserInformation;

  
      return user;
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchWithAuth = async ({url,options}:{url:string,options:[]}) => {
    const session = await getSession();
    let response = await fetch(url, {
      ...options,  
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        'x-refresh': `${session?.user.refreshToken}`
      },
    });
  
    // If access token expired, refresh it
    if (response.status === 401) {
      await fetch("/api/auth/session?update=true"); 
  
      const newSession = await getSession(); // Get updated session
      response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newSession?.user.accessToken}`,
        },
      });
    }
  
    return response.json();
  };
  