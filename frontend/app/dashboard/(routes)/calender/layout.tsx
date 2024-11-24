import { CalenderProvider } from "@/components/context/CalenderProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  (
    <CalenderProvider>
        {children}
    </CalenderProvider>
  ) ;
}
