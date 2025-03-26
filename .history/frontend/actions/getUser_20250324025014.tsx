import { UserInformation } from "@/types";

console.log(process.env.NEXT_PUBLIC_API_URL)
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
   

