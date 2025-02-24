import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

const API_URL = "http://localhost:8080/api/auth";

const refreshAccessToken = async (token: JWT) => {
  try {
    const response = await axios.post(`${API_URL}/refresh`, {
      refreshToken: token.refreshToken, // Send refresh token
    });

    const { accessToken } = response.data;

    if (!accessToken) throw new Error("Failed to refresh token");

    const decodedToken = jwt.decode(accessToken) as JwtPayload;

    return {
      ...token,
      accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 min expiry
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { ...token, error: "RefreshTokenError" };
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
          const response = await axios.post(`${API_URL}/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { accessToken, refreshToken } = response.data;

          if (!accessToken || !refreshToken) return null;

          const decodedToken = jwt.decode(accessToken) as JwtPayload;

          return {
            email: credentials?.email,
            id: decodedToken.id,
            role: decodedToken.role,
            name: decodedToken.name,
            profileImg: decodedToken.profileImg,
            verified: decodedToken.verified,
            code: decodedToken.code,
            accessToken,
            refreshToken, // Store refresh token
            accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 min expiry
          };
        } catch (error: any) {
          console.error("Login Error:", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On login, store tokens
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          name: user.name,
          profileImg: user.profileImg?.url,
          verified: user.verified,
          code: user.code,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // If access token is expired, refresh it
      if (Date.now() > (token.accessTokenExpires as number)) {
        console.log("Access token expired, refreshing...");
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
          image: token.profileImg as string,
          name: token.name,
          verified: token.verified,
          code: token.code,
        };
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
