import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import { MotionComponent } from "@/components/relatedComponents/Motion";


import { DashboardHook } from "@/components/context/Dashboardprovider";

const Login = () => {
  const { NProgress} = DashboardHook()

  NProgress.done()
  return (
    <MotionComponent>
    <main className=" min-h-screen h-screen flex justify-center items-center ">
      <div className="sub-container max-w-[550px] ">
        <LoginForm />
      </div>
      <Image
        src="/assets/images/doctor-nurse.jpg"
        loading="lazy"
        alt="Cover"
        height={1000}
        width={1000}
        className="side-img max-w-[60%]"
      />
    </main>
    </MotionComponent>
  );
};
export default Login;
