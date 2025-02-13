
export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign In To Dashboard",
  icons:{
    
  }
};


import dynamic from "next/dynamic";

import { Metadata } from "next";

const LoginHolder = dynamic(() => import("@/components/Login"))
const Login = () => {
  return (
  <Log
  );
};
export default Login;
