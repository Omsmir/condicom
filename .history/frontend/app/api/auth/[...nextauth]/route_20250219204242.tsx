import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const refreshAccessToken = async (token: any) => {
  try {
    const res = await fetch("http://localhost:8080/api/auth/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
        "x-refresh": token.refreshToken, // Middleware will handle refresh
      },
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const refreshedSession = await res.json();

    return {
      ...token,
      accessToken: refreshedSession.accessToken,
      expiresAt: refreshedSession.expiresAt,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return { ...token, accessToken: null };
  }
};

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

          const { accessToken } = response.data;

          if (accessToken) {
            // Decode the JWT token
            const decodedToken = jwt.decode(accessToken) as JwtPayload;

            // Return the user object

            return {
              email: credentials?.email,
              id: decodedToken.id,
              role: decodedToken.role,
              name: decodedToken.name,
              profileImg: decodedToken.profileImg,
              verified: decodedToken.verified,
              expiresAt: decodedToken.exp && decodedToken.exp * 1000,
              expiresIn:decodedToken?.exp && decodedToken?.iat ? decodedToken.exp - decodedToken.iat : null,
              code: decodedToken.code,
              accessToken,
            };
          }
          return null; // Return null if no token is found
        } catch (error: any) {
          console.error("Login Error:", error.response?.data || error.message);

          if (error.response) {
            const { status, data } = error.response;
            if (status !== 200) throw new Error(data.message);
            if (status === 403)
              throw new Error(data?.message || "Access forbidden.");
            throw new Error(data?.message || "An unexpected error occurred.");
          }

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
        token.profileImg = user.profileImg.url;
        token.verified = user.verified;
        token.code = user.code;
        (token.accessToken = user.accessToken),
          (token.refreshToken = user.refreshToken),
          token.expiresIn = user.expiresIn,
          token.expiresAt = user.expires
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
        };
        session.expires = token.accessTokenExpires as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Correctly export as HTTP methods
export { handler as GET, handler as POST };
