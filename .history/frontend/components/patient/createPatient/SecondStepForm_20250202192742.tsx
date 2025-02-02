import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { allergies, emergencyContactRelationships, Frequencies, medicalConditions } from "@/lib/constants";
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
        <div className="w-1/2 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            label="emergency Contact Person"
            name="emergencyContactPerson"
            placeholder="mention a name"
            optionalLabel="(optional)"
           />
          
        </div>
        <div className="w-1/2">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="emergencyContactRelationship"
          label="emergency Contact Relationship"
          placeholder="select a relationship"
          
        >
          {emergencyContactRelationships.map((element, index) => (
              <SelectItem
                key={index}
                value={element}
                id={element + 1}
                className="cursor-pointer transition-colors hover:bg-slate-200"
              >
                <div className="flex">
                  <p className="text-md text-black capitalize ">{element}</p>
                </div>
              </SelectItem>
            ))}
        </CustomFormField></div>
      </div>
     
     <div className="flex">
        <div className="w-1/2">
          <CustomFormField
            fieldType={FormFieldType.PHONE}
            control={form.control}
            label="Enter Your  Phone"
            name="emergencyContactNumber"
            placeholder="(+20) 10-1261-5424"
          />
        </div>
     </div>
   
    </React.Fragment>
  );
};

export default SecondStepForm;
