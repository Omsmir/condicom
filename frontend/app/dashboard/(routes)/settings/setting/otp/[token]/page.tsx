import Encapsulating from "@/components/settings/settings/forget/Encapsulating";
import React from "react";
import dynamic from "next/dynamic";
import NotFound from "@/app/not-found";

const ConfirmEmail = dynamic(
  () => import("@/components/settings/settings/email/ConfirmEmail")
);
const page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const token = (await params).token;
  
    const validatePath = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  
    if (!validatePath.test(token)) {
      return <NotFound />;
    }
  return (
    <Encapsulating token={token} hashStart="newEmail:otp" hashEnd=":token" >
      <ConfirmEmail />
    </Encapsulating>
  );
};

export default page;
