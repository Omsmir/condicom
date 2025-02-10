import { getSpecficPatient } from "@/actions/Patients";
import { PatientProvider } from "@/components/context/PatientProvider";
import PatientHeader from "@/components/patient/PatientHeader";

const RootLayout = async ({ children,params}: { children: React.ReactNode,params:Promise<{_id:string}> }) => {

    const id = (await params)._id
  const { data } = useSpecificPatient(id);

  const patient = data?.patient;
  return (
      <PatientProvider>
        <PatientHeader  id={id}/>
        {children}
        </PatientProvider>
  );
};

export default RootLayout;
