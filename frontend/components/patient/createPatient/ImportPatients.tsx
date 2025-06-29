import React from "react";
import AddMultipleDocuments from "../../AddMultipleDocuments";
import { lato } from "@/fonts/fonts";
import { useForm } from "react-hook-form";
import { PatientsSchema } from "@/lib/vaildation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "../../ui/form";
import CustomFormField, { FormFieldType } from "../../CustomFormField";
import CustomFileUploader, { FileUploaderType } from "../../CustomFileUploader";
import SubmitButton from "@/components/togglers/SubmitButton";

const ImportPatients = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onSubmit = async (values: Zod.infer<typeof PatientsSchema>) => {
    try {
      const formData = new FormData();

      console.log("values", values.patients);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const form = useForm<Zod.infer<typeof PatientsSchema>>({
    resolver: zodResolver(PatientsSchema),
    defaultValues: {},
  });
  return (
    <AddMultipleDocuments title="Import Patients" buttonText="Import">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full   space-y-10  p-4 "
        >
          <div className="flex flex-col justify-start gap-7 ">
            <CustomFormField
              control={form.control}
              name="patients"
              label="Select Patients File"
              fieldType={FormFieldType.SKELETON}
              renderSkeleton={(field) => (
                <FormControl>
                  <CustomFileUploader
                    classname="justify-center"
                    type={FileUploaderType.JSON}
                    files={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />
            <SubmitButton
              className="bg-[#6366f1] text-slate-50 w-full"
              isLoading={isLoading}
            >
              Import Patients
            </SubmitButton>
          </div>
        </form>
      </Form>
    </AddMultipleDocuments>
  );
};

export default ImportPatients;
