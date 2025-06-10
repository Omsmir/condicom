import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health - Notifications",
  description: "User Notifications",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  children ;
}
