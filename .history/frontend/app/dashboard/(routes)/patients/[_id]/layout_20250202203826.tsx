import { PatientProvider } from "@/components/context/PatientProvider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (

      <PatientProvider>{children}</PatientProvider>
  
  );
};

export default RootLayout;
