import { CalenderProvider } from "@/components/context/CalenderProvider";
import CalenderHeader from "@/components/relatedComponents/CalenderHeader";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return  (
    <CalenderProvider>
      <CalenderHeader>
        {children}
        </CalenderHeader>
    </CalenderProvider>
  ) ;
}
