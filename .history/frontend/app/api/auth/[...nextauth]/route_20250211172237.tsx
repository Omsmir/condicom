import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import HandleAxiosErrors from "@/components/HandleAxiosErrors";

const authOptions: AuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { token } = response.data;

          if (token) {
            // Decode the JWT token
            const decodedToken = jwt.decode(token) as JwtPayload;

            // Return the user object

            return {
              email: credentials?.email,
              id: decodedToken.id,
              role: decodedToken.role,
              name: decodedToken.name,
              profileImg: decodedToken.profileImg,
              verified: decodedToken.verified,
              expires: decodedToken.expires,
              code:decodedToken.code,
              token,
            };
          }
          return null; // Return null if no token is found
        } catch (error: any) {
          console.error("Login Error:", error.response?.data || error.message);

          HandleAxiosErrors()
          // if (error.response) {
          //   const { status, data } = error.response;
          //   if (status === 401) throw new Error("Invalid email or password.");
          //   if (status === 403)
          //     throw new Error(data?.msg || "Access forbidden.");
          //   throw new Error(data?.msg || "An unexpected error occurred.");
          // }

          throw new Error("Unable to connect to the server.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.token = user.token;
        token.profileImg = user.profileImg;
        token.verified = user.verified;
        token.code = user.code
      }

      return token;
    },
    async session({ session, token }) {
      // const response = await fetch(`http://localhost:8080/api/auth/${token.id}`)
      // const data = await response.json() 
      // const user = data.existingUser as UserInformation
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
          image: token.profileImg as string,
          name: token.name,
          verified: token.verified,
          code:token.code
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Correctly export as HTTP methods
export { handler as GET, handler as POST };
