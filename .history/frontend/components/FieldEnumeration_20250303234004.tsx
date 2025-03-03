import React from "react";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { SelectItem } from "./ui/select";
import {
  firstNumber,
  FiveNumber,
  genders,
  heights,
  medicalSpecialties,
  weights,
} from "@/lib/constants";

interface FieldEnumerationProps {
  name: string;
  value: string;
  form: any;
}

interface FieldSelectionProps {
  name: string;
  value: string;
  form: any;
  selectArray: string[];
}

export const SelectionField = ({
  name,
  form,
  value,
  selectArray,
}: FieldSelectionProps) => {
  return (
    <CustomFormField
      fieldType={FormFieldType.SELECT}
      control={form.control}
      name={name}
      placeholder={value}
    >
      {selectArray.map((value, index) => (
        <SelectItem
          key={index}
          value={value}
          className="transition-all hover:bg-slate-200"
        >
          <div className="flex cursor-pointer justify-center items-center">
            <p className="text-md mx-2 text-black">{value}</p>
          </div>
        </SelectItem>
      ))}
    </CustomFormField>
  );
};

const FieldEnumeration = ({ name, value, form }: FieldEnumerationProps) => {
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
      return (
        <SelectionField
          name={name}
          form={form}
          value={value}
          selectArray={medicalSpecialties}
        />
      );
    case "height":
      return (
        <SelectionField
          name={name}
          form={form}
          value={value}
          selectArray={heights}
        />
      );
    case "weight":
      return (
        <SelectionField
          name={name}
          form={form}
          value={value}
          selectArray={weights}
        />
      );
    case "gender":
      return (
        <SelectionField
          name={name}
          form={form}
          value={value}
          selectArray={genders}
        />
      );
      case "numbers":
        return (
<SelectionField
        name={name}
        form={form}
        value={value}
        selectArray={[...firstNumber]}
      />
        )
    case "fiveNumbers":
      return(
      <SelectionField
        name={name}
        form={form}
        value={value}
        selectArray={[...FiveNumber]}
      />)

    default:
      return null;
  }
};

export default FieldEnumeration;
