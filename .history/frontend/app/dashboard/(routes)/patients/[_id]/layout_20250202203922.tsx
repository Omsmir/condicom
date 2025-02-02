import { PatientProvider } from "@/components/context/PatientProvider";

const RootLayout = async ({ children,params}: { children: React.ReactNode,params:Promise<{_id:string}> }) => {

    const id = (await params)._id
  return (
      <PatientProvider>{children}</PatientProvider>
  );
};

export default RootLayout;
