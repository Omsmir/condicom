import React from "react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { AccountSchema } from "@/lib/vaildation";

interface FieldEnumerationProps {
  name: string;
  value: string;
  form: UseFormReturn<z.infer<typeof AccountSchema>>;
  SelectArray: string[];
}

const SelectionField = ({form,value,SelectArray}:FieldEnumerationProps) => {
  return(
    <CustomFormField
    fieldType={FormFieldType.SELECT}
    control={form.control}
    name="occupation"
    placeholder={value}
  >
    {SelectArray.map((value, index) => (
      <SelectItem key={index} value={value}>
        <div className="flex cursor-pointer justify-center items-center">
          <p className="text-md mx-2">{value}</p>
        </div>
      </SelectItem>
    ))}
  </CustomFormField>
  )
}

const FieldEnumeration = ({
  name,
  value,
  form,
  SelectArray,
}: FieldEnumerationProps) => {
  switch (name) {
    case "Account Name":
      return (
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder={value}
          className="max-h-[25px] w-32 overflow-hidden rounded-sm"
        />
      );
    case "occupation":
    case "height":
    case "weight":
    case "gender":
      return (
        <SelectionField fo />
      );
    default:
      return null;
  }
};

export default FieldEnumeration;
