"use client";
import { Button } from "../ui/button";
import { prop } from "@/types";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
import { DashboardHook } from "../context/Dashboardprovider";

const LogoutButton = (props: prop) => {
  const {setTheme } = DashboardHook()
  const handelLogOut = async () => {
    try {
      Swal.fire({
        title: "Do you want to logout?",
        showDenyButton: true,
        denyButtonText: "cancel",
        denyButtonColor:"#71717a",
        confirmButtonColor: "#b91c1c",
        confirmButtonText: "logout",
      }).then(async (result) => {
        if (result.isDenied) {
          Swal.fire("Not logged out", "", "info");
        } else if (result.isConfirmed) {
          Swal.fire("Logged out", "", "success");
          signOut({
            callbackUrl: "/",
            redirect: true,           
          });
          setTheme("light") 
        }
      });
    } catch (error: any) {
      console.error("Delete Error:", error);
      alert("An error occurred while logging you out.");
    }
  };
  return (
    <Button className={props.className} onClick={handelLogOut}>
      Sign Out
    </Button>
  );
};

export default LogoutButton;
