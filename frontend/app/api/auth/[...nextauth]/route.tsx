import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { addHours, subMinutes } from "date-fns";
import { refreshAccessToken } from "@/actions/User";

export const authOptions: AuthOptions = {
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

          const { accessToken, refreshToken } = await response.data;

          if (accessToken) {
            // Decode the JWT token
            const decodedToken = jwt.decode(accessToken) as JwtPayload;
            return {
              email: credentials?.email,
              id: decodedToken.id,
              role: decodedToken.role,
              name: decodedToken.name,
              profileImg: decodedToken.profileImg,
              verified: decodedToken.verified,
              expiresAt: decodedToken.exp && decodedToken.exp * 1000,
              code: decodedToken.code,
              profileState: decodedToken.profileState,
              passwordUpdatedAt: decodedToken.passwordUpdatedAt,
              codeExp: decodedToken.codePlan,
              mfa_state:decodedToken.mfa_state,
              accessToken,
              refreshToken,
            };
          }
          return null;
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              const { status, data } = error.response;
              if (status !== 200) throw new Error(data.message);
            }
          }

          throw new Error("Unable to connect to the server.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
    }: {
      token: JWT;
      user: any;
      trigger?: "signIn" | "update" | "signUp";
    }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.token = user.token;
        token.profileImg = user.profileImg.url;
        token.verified = user.verified;
        token.code = user.code;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
        token.profileState = user.profileState;
        token.passwordUpdatedAt = user.passwordUpdatedAt;
        token.codeExp = user.codeExp;
        token.mfa_state = user.mfa_state
      }
    

      if (trigger === "update" && !token.profileState) {
        token.profileState = true
      }

        
      if (trigger === "update") {
        return await refreshAccessToken(token.refreshToken as string);
      }

      const tokenExpiration = addHours(new Date(token.expiresAt as number), 2);
      const currDate = addHours(new Date(), 2);

      if (currDate > tokenExpiration) {
        return await refreshAccessToken(token.refreshToken as string);
      }

      console.log(token)



      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
          image: token?.profileImg as string,
          name: token.name,
          verified: token.verified,
          code: token.code,
          accessToken: token.accessToken,
          profileState: token.profileState,
          refreshToken: token.refreshToken,
          passwordUpdatedAt: token.passwordUpdatedAt,
          codeExp: token.codeExp,
          mfa_state:token.mfa_state
        };
        session.expires = addHours(
          new Date(token.expiresAt as number),
          2
        ).toISOString();
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Correctly export as HTTP methods
export { handler as GET, handler as POST };
