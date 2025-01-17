import RegisterForm from "@/components/register/RegisterForm";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
export const metadata: Metadata = {
    title: "Health - Register",
  };

const page = () => {
  return (
    
    <main className="flex h-screen min-h-screen">
      <div className="container remove-scrollbar ">
        <div className=" max-w-[860px] flex-1 flex-col py-10">
          <RegisterForm />
        </div>
      </div>
      <Image
        src="/assets/images/female-doctor.jpg"
        alt="resetImage"
        priority
        width={1000}
        height={1000}
        className="side-img  md:max-w-[50%]"
      />
    </main>
    
  );
};

export default page;
