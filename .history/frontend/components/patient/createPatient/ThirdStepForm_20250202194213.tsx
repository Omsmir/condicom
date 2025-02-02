import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { allergies, Frequencies, medicalConditions } from "@/lib/constants";
import { patientSchema } from "@/lib/vaildation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type ThirdStepFormProps = {
  form: UseFormReturn<z.infer<typeof patientSchema>>;
};

const ThirdStepForm: React.FC<ThirdStepFormProps> = ({ form }) => {
  return (
    <React.Fragment>
      <div className="flex flex-1">
        <div className="flex-1 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            label="medical conditions"
            name="medicalConditions"
            placeholder="select a condition"
          >
            {medicalConditions.map((element, index) => (
              <SelectItem
                key={index}
                value={element}
                className="cursor-pointer transition-colors hover:bg-slate-200"
              >
                <div className="flex justify-center items-center ">
                  <p className="text-md text-black ">{element}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="allergies"
          label="allergies"
          placeholder="select an allergy"
        >
          {Object.entries(allergies).flatMap(([category, items], index) => (
            <div className="flex flex-col" key={index}>
              <p className="text-slate-600 font-medium text-sm capitalize m-2">
                {category}:
              </p>
              {items.map((item, index) => (
                <SelectItem
                  key={`${category}-${index + 1}`}
                  value={item}
                  className="cursor-pointer transition-colors hover:bg-slate-200"
                >
                  <div className="flex justify-center items-center">
                    <p className="text-md text-black">{item}</p>
                  </div>
                </SelectItem>
              ))}
            </div>
          ))}
        </CustomFormField>
      </div>
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="pastSurgeries"
        placeholder="e.g., Appendectomy in 2019 due to appendicitis"
        label="past surgeries"
        optionalLabel="(optional)"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.TEXTAREA}
        name="familyMedicalHistory"
        label="Family Medical History"
        placeholder="e.g., Appendectomy, Diabetes, Asthma"
        optionalLabel="(optional)"
      />
      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name="currentMedications"
        label="current medications"
        optionalLabel="(optional)"
        placeholder="Ibuprofen, Amoxicillin"
      />
      <div className="flex ">
        <div className="w-1/2 mr-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="smoking"
            label="smoking"
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
        <div className="flex-1 mr-1">
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
        <div className="flex">
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

export default ThirdStepForm;
