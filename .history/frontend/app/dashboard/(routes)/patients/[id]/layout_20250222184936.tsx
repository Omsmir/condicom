import { PatientProvider } from "@/components/context/PatientProvider";
import PatientHeader from "@/components/patient/PatientHeader";

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ _id: string }>;
}) => {
  const id = (await params)._id;

  return (
    <PatientProvider>
      <PatientHeader id={id} />
      {children}
    </PatientProvider>
  );
};

export default RootLayout;
