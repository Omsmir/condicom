import { PatientProvider } from "@/components/context/PatientProvider";
import PatientHeader from "@/components/patient/PatientHeader";

const RootLayout = async ({ children,params}: { children: React.ReactNode,params:Promise<{_id:string}> }) => {

    const id = (await params)._id

    const patient = await 
  return (
      <PatientProvider>
        <PatientHeader patient={} />
        {children}
        </PatientProvider>
  );
};

export default RootLayout;
