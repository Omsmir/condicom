import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { MedicationSchema } from "@/lib/vaildation";
import { DollarSign } from "lucide-react";
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
            label="expiry Date"
            name="expiryDate"
            error={form.formState.errors.expiryDate?.message}
          />
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-1/2 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="manufacturer"
            label="manufacturer"
            placeholder="GSK"
            optionalLabel="(optional)"
          />
        </div>
        <div className="w-1/2 ">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="supplier"
            label="supplier"
            placeholder="HealthPlus"
            optionalLabel="(optional)"
          />
        </div>
      </div>
      <div className="flex flex-1">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="batch_number"
          label="batch number"
          placeholder="C67890"
          optionalLabel="(optional)"
        />
      </div>

      <div className="flex">
      <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              placeholder="50$"
              label="price"
              name="price"
              Lucide={<DollarSign className="dark:text-slate-600" />}
              min={1}
              max={9999}
            />
      </div>
    </React.Fragment>
  );
};

export default SecondStepForm;
