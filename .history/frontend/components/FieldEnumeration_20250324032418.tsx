import React from "react";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { SelectItem } from "./ui/select";
import {
  characters,
  codeExpirationPlans,
  firstNumber,
  FiveNumber,
  genders,
  heights,
  medicalSpecialties,
  weights,
} from "@/lib/constants";

interface FieldEnumerationProps {
  name: string;
  placeHolder?: string;
  form: any;
  label?: string;
  readonly Array: readonly string[];
}

interface FieldSelectionProps {
  name: string;
  placeHolder?: string;
  form: any;
  selectArray: string[];
  label?: string;
}

export const SelectionField = ({
  name,
  form,
  placeHolder,
  selectArray,
  label,
}: FieldSelectionProps) => {
  return (
    <CustomFormField
      fieldType={FormFieldType.SELECT}
      control={form.control}
      name={name}
      placeholder={placeHolder}
      label={label || " "}
    >
      {selectArray.map((value, index) => (
        <SelectItem
          key={index}
          value={value}
          className="transition-all hover:bg-slate-200 cursor-pointer"
        >
          <div className="flex justify-center items-center">
            <p className="text-md mx-2 text-black">{value}</p>
          </div>
        </SelectItem>
      ))}
    </CustomFormField>
  );
};

const FieldEnumeration = ({
  name,
  placeHolder,
  form,
  label,
  Array,
}: FieldEnumerationProps) => {
  switch (name) {
    case "Account Name":
      return (
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder={placeHolder}
          className="max-h-[25px] w-32 overflow-hidden rounded-sm"
        />
      );
    case "occupation":
      return (
        <SelectionField
          name={name}
          form={form}
          placeHolder={placeHolder}
          selectArray={medicalSpecialties}
        />
      );
    case "height":
      return (
        <SelectionField
          name={name}
          form={form}
          placeHolder={placeHolder}
          selectArray={heights}
        />
      );
    case "weight":
      return (
        <SelectionField
          name={name}
          form={form}
          placeHolder={placeHolder}
          selectArray={weights}
        />
      );
    case "gender":
      return (
        <SelectionField
          name={name}
          form={form}
          placeHolder={placeHolder}
          selectArray={genders}
        />
      );
    case "numbers":
    case "characters":
    case "fiveNumbers":
    case "expiration":
      return (
        <SelectionField
          name={name}
          form={form}
          label={label}
          placeHolder={placeHolder}
          selectArray={[...Array]}
        />
      );
    // return (
    //   <SelectionField
    //     name={name}
    //     form={form}
    //     label={label}
    //     placeHolder={placeHolder}
    //     selectArray={[...characters]}
    //   />
    // );

    // return (
    //   <SelectionField
    //     name={name}
    //     form={form}
    //     label={label}
    //     placeHolder={placeHolder}
    //     selectArray={[...FiveNumber]}
    //   />
    // );

    // return (
    //   <SelectionField
    //     name={name}
    //     form={form}
    //     label={label}
    //     placeHolder={placeHolder}
    //     selectArray={[...codeExpirationPlans]}
    //   />
    // );

    default:
      return null;
  }
};

export default FieldEnumeration;
