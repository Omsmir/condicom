import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface TokenPayload {
    id: string | undefined; // Adjust based on your token payload structure
    role:string | undefined; //
  }

export const tokenValues = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;


  let userId: string | null = null;
  let role: string | null = null;

  const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET is not defined in the environment variables.");
}
  if(token){
    try {

        const decodedToken = jwt.decode(token) as JwtPayload

        userId = decodedToken.id || null
        role = decodedToken.role || null
    
      } catch (error) {
        console.error("Token verification failed:", error);
      }
  }

  return { userId ,role};
};


export const deleteTokenCookie = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}