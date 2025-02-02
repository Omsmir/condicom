import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { allergies, bloodTypes, emergencyContactRelationships, Frequencies, medicalConditions } from "@/lib/constants";
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
      <div className="flex ">
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
     
     <div className="flex flex-1">
        <div className="w-1/2 mr-1">
          <CustomFormField
            fieldType={FormFieldType.PHONE}
            control={form.control}
            label="emergency contact number"
            name="emergencyContactNumber"
            placeholder="(+20) 10-1261-5424"
          />
        </div>
        <div className="w-1/2 ">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            label="insurance provider"
            name="insuranceProvider"
            placeholder="prime care"
            optionalLabel="(optional)"
           />
          
        </div>
     </div>
     <div className="flex ">
        <div className="w-1/2">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            label="Weight"
            optionalLabel="(optional)"
            name="weight"
            placeholder="Select weight"
            className="max-h-[225px]"
          >
            {weights.map((value, index) => (
              <SelectItem key={index} value={value.value}>
                <div className="flex cursor-pointer justify-center items-center">
                  <p className="text-md mx-2">{value.value}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="w-1/2 ml-1">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            label="Height"
            optionalLabel="(optional)"
            name="height"
            placeholder="Select height"
            className="max-h-[250px]"
          >
            {heigths.map((value, index) => (
              <SelectItem key={index} value={value}>
                <div className="flex cursor-pointer justify-center items-center">
                  <p className="text-md mx-2">{value}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
      </div>
      <div className="flex ">
        <div className="w-1/2">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            label="blood type"
            name="bloodType"
            placeholder="Select a blood type"
          >
            {bloodTypes.map((value, index) => (
              <SelectItem
                key={index}
                value={value}
                className="cursor-pointer transition-all hover:bg-slate-100"
              >
                <div className="flex justify-center items-center">
                  <p className="text-black text-md mx-2">{value}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="w-1/2 ml-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.COUNTRY}
            name="country"
            label="Country"
            placeholder="select country"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SecondStepForm;
