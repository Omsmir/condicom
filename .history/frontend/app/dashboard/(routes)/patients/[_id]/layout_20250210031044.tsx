import { getSpecficPatient } from "@/actions/Patients";
import { PatientProvider } from "@/components/context/PatientProvider";
import PatientHeader from "@/components/patient/PatientHeader";

const RootLayout = async ({ children,params}: { children: React.ReactNode,params:Promise<{_id:string}> }) => {

    const id = (await params)._id

    const patient = await getSpecficPatient(id)
  return (
      <PatientProvider>
        <PatientHeader patient={patient} id={id}/>
        {children}
        </PatientProvider>
  );
};

export default RootLayout;
