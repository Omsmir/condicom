import { PatientProvider } from "@/components/context/PatientProvider";

const RootLayout = async ({ children,params}: { children: React.ReactNode,params: }) => {
  return (
      <PatientProvider>{children}</PatientProvider>
  );
};

export default RootLayout;
