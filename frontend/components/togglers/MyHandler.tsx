"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from 'swr';



import axios from "axios";
import Swal from "sweetalert2";
import { prop } from "@/types";

export const  MyHandler =({ id, name, className ,state}: prop) =>{
  
  const router = useRouter();
  const { data: products, error } = useSWR('http://localhost:8080/api/products');


  const handleDelete = async () => {


    
    try {
      Swal.fire({
        title: "Do you want to delete the product?",
        showDenyButton:true,
        denyButtonText:"cancel",
        confirmButtonColor: "#DE5C63",
        confirmButtonText: "delete",
      }).then(async (result) => {
        if(result.isDenied){
          Swal.fire("Changes are not saved", "", "info");
        }else if ( result.isConfirmed) {
          const response = await axios.delete(
            `http://localhost:8080/api/products/${id}/`
          );
  
          mutate("http://localhost:8080/api/products")
          Swal.fire("deleted", "", "success");

          router.push("/dashboard"); // Redirect to the products page
        } 
        // console.log("Deleted Product:", response.data);
      });
    } catch (error: any) {
      console.error("Delete Error:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleEdit = async () => {
    router.push(`/dashboard/products/${id}/edit`)
  }
  const stateManagement = () =>{
    if(!state) return handleDelete()

   return handleEdit()
  }

  return (
    <Button className={className} onClick={stateManagement}>
      {name}
    </Button>
  );
}
