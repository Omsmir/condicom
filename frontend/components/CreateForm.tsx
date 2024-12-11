"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./CustomFormField";
import FileUploader from "./FileUploader";
import { useState } from "react";
import { User, DollarSign } from "lucide-react";
import SubmitButton from "./togglers/SubmitButton";
import { formSchema } from "@/lib/vaildation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CreateForm = () => {
const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);


    formSchema.parse(values)
    const formData = new FormData();

   
    const name = values.name;
    const price = values.price.toString();
    const description = values.description

    formData.append("name", name);
    formData.append("price", price);
    formData.append("description",description)
   // Assuming values.image is an array of File objects
  values.image.forEach((image: any) => {
      formData.append("image", image, image.name); // Append as File
  
  });

  console.log(formData)
    try {
      const res = await fetch("http://localhost:8080/api/products/", {
        method: "post",
        body: formData,
        cache: "force-cache",
      });

      if (res.status === 201)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

      router.push("/");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error,
        text: "Something went wrong!",
      });
    }

    setIsLoading(false);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:  "",
      description: "",
      price:1,
      
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-8 my-auto dark:bg-[var(--sidebar-background)] p-4 rounded-md"
      >
        <section className="grid grid-cols-12">
          <div className="mr-2 col-span-6 sm:col-span-8">
            <CustomFormField
              control={form.control}
              Lucide={<User className="dark:text-dark-600" />}
              placeholder="product name"
              label="product name"
              fieldType={FormFieldType.INPUT}
              name="name"
            />
          </div>
          <div className="col-span-6 sm:col-span-4 ">
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              placeholder="50$"
              label="price"
              name="price"
              Lucide={<DollarSign className="dark:text-slate-600" />}
              min={1}
              max={999}
            />
          </div>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="description"
          placeholder="product description"
          label="description"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="image"
          label="Product Image"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value}
                onChange={field.onChange}
                className="flex flex-1 bg-slate-100 rounded-md p-4 file-upload"
              />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Add Product</SubmitButton>
      </form>
    </Form>
  );
};

export default CreateForm;
