import { PatientProvider } from "@/components/context/PatientProvider";

const RootLayout = async ({ children,params}: { children: React.ReactNode,params:Promise<{_id:str}> }) => {
  return (
      <PatientProvider>{children}</PatientProvider>
  );
};

export default RootLayout;
