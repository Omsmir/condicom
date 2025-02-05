import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { allergies, Frequencies, medicalConditions, medicationForms, medicationRoutes, medicationStrengths } from "@/lib/constants";
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
            placeholder="select a form"
          >
            {medicationForms.map((element, index) => (
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
            name="route"
            label="medication route"
            placeholder="select a route"
          >
            {medicationRoutes.map((element, index) => (
              <SelectItem
                key={index}
                value={element}
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
            name="strength"
            label="medication strength"
            placeholder="select a strength"
          >
            {medicationStrengths.map((element, index) => (
              <SelectItem
                key={index}
                value={element}
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
            name="drug_category"
            label="medication frequency"
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
