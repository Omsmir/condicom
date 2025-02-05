import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { allergies, Frequencies, medicalConditions } from "@/lib/constants";
import { MedicationSchema } from "@/lib/vaildation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FirstStepFormProps = {
  form: UseFormReturn<z.infer<typeof MedicationSchema>>;
};

const FirstStepForm: React.FC<FirstStepFormProps> = ({ form }) => {
  return (
    <React.Fragment>
      <div className="flex ">
        <div className="w-1/2 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="medication name"
            placeholder="panadol"
          />
          <div className="w-1/2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="generic_name"
              label="medication generic name"
              placeholder="Paracetamol"
            />
          </div>
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

      <div className="flex ">
        <div className="w-1/2 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="form"
            label="medication form"
            placeholder="select status"
          >
            {["yes", "no"].map((element, index) => (
              <SelectItem
                key={index}
                value={element}
                id={element}
                className="cursor-pointer transition-colors hover:bg-slate-200"
              >
                <div className="flex">
                  <p className="text-md text-black capitalize ">{element}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <div className="w-1/2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="smokingFrequency"
            label="smoking frequency"
            placeholder="select a frequency"
            optionalLabel="(optional)"
          >
            {Frequencies.map((element, index) => (
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
          </CustomFormField>
        </div>
      </div>
      <div className="flex ">
        <div className="w-1/2 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="alcohol"
            label="alcohol"
            placeholder="select status"
          >
            {["yes", "no"].map((element, index) => (
              <SelectItem
                key={index}
                value={element}
                id={element + 2}
                className="cursor-pointer transition-colors hover:bg-slate-200"
              >
                <div className="flex">
                  <p className="text-md text-black capitalize ">{element}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <div className="w-1/2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="alcoholFrequency"
            label="alcohol frequency"
            placeholder="select a frequency"
            optionalLabel="(optional)"
          >
            {Frequencies.map((element, index) => (
              <SelectItem
                key={index}
                value={element}
                id={element}
                className="cursor-pointer transition-colors hover:bg-slate-200"
              >
                <div className="flex">
                  <p className="text-md text-black capitalize ">{element}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FirstStepForm;
