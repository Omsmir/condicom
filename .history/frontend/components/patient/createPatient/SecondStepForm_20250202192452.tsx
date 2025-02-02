import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { allergies, Frequencies, medicalConditions } from "@/lib/constants";
import { patientSchema } from "@/lib/vaildation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type SecondStepFormProps = {
  form: UseFormReturn<z.infer<typeof patientSchema>>;
};

const SecondStepForm: React.FC<SecondStepFormProps> = ({ form }) => {
  return (
    <React.Fragment>
      <div className="flex flex-1">
        <div className="flex-1 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            label="emergency Contact Person"
            name="emergencyContactPerson"
            placeholder="mention the name"
            optionalLabel="(optional)"
           />
          
        </div>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="emergencyContactRelationship"
          label="emergency Contact Relationship"
          placeholder="select a relationship"
          
        >
          {}
        </CustomFormField>
      </div>
     
   
    </React.Fragment>
  );
};

export default SecondStepForm;
