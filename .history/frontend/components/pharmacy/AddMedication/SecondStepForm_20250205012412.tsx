import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { MedicationSchema } from "@/lib/vaildation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type SecondStepFormProps = {
  form: UseFormReturn<z.infer<typeof MedicationSchema>>;
};

const SecondStepForm: React.FC<SecondStepFormProps> = ({ form }) => {
  return (
    <React.Fragment>
      <div className="flex flex-1">
        <div className="w-1/2 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="storage_conditions"
            label="storage conditions"
            placeholder="Store below 30°C"
            optionalLabel="(optional)"
          />
          
        </div>
        <div className="w-1/2 ">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE}
            label="expiryDate"
            name="expiryDate"
            error={form.formState.errors.expiryDate?.message}
          />
        </div>
      </div>
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="description"
        placeholder="e.g., Pain reliever and fever reducer"
        label="description"
        optionalLabel="(optional)"
      />

    
    </React.Fragment>
  );
};

export default SecondStepForm;
