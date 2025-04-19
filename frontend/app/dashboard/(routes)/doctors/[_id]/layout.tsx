import BreadCrumb from "@/components/doctorProfile/BreadCrumb";
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
      <main className="h-screen flex flex-col pt-14 px-4 overflow-y-scroll lg:overflow-hidden">
        <BreadCrumb />
        {children}
      </main>
  );
};

export default RootLayout;
