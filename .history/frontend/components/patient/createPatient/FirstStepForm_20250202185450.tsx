"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import CustomFileUploader from "@/components/CustomFileUploader";
import { heigths, weights } from "@/lib/constants";
import { SelectItem } from "../../ui/select";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { z } from "zod";
import { patientSchema } from "@/lib/vaildation";

// ✅ Infer Type from Zod Schema
type FirstStepFormProps = {
  form: UseFormReturn<z.infer<typeof patientSchema>>;
};

const FirstStepForm: React.FC<FirstStepFormProps> = ({ form }) => {
  return (
    <React.Fragment>
      <div className="flex justify-center items-center">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          label="Select Patient Image"
          name="profileImg"
          renderSkeleton={(field) => (
            <FormControl>
              <CustomFileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
      </div>

      <div className="flex">
        <div className="mr-1">
          <CustomFormField
            control={form.control}
            Lucide={<UserOutlined className="dark:text-dark-600 text-[20px]" />}
            placeholder="Omar"
            label="First Name"
            fieldType={FormFieldType.INPUT}
            name="firstName"
          />
        </div>
        <CustomFormField
          control={form.control}
          Lucide={<UserOutlined className="dark:text-dark-600 text-[20px]" />}
          placeholder="Fouad"
          label="Last Name"
          fieldType={FormFieldType.INPUT}
          name="lastName"
        />
      </div>

      <CustomFormField
        control={form.control}
        fieldType={FormFieldType.DATE}
        label="Birth Date"
        name="birthDate"
        error={form.formState.errors.birthDate?.message}
      />

      <div className="flex">
        <div className="w-[70%]">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            Lucide={<MailOutlined className="dark:text-dark-600 text-[20px]" />}
            name="email"
            label="Email"
            optionalLabel="(optional)"
            placeholder="omarsamir232@gmail.com"
            state
            error={form.formState.errors.email?.message}
          />
        </div>
        <div className="ml-1 w-[30%]">
          <CustomFormField
            fieldType={FormFieldType.PHONE}
            control={form.control}
            label="Enter Your Phone"
            name="phone"
            placeholder="(+20) 10-1261-5424"
          />
        </div>
      </div>

      <div className="flex">
        <div className="flex-1">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            placeholder="10 - West Lebanon"
            label="Address"
            optionalLabel="(optional)"
            type="text"
          />
        </div>
        <div className="flex-1 ml-1 max-w-[30%]">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.COUNTRY}
            name="country"
            label="Country"
            placeholder="Select country"
          />
        </div>
      </div>

      <div className="flex overflow-hidden">
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
    </React.Fragment>
  );
};

export default FirstStepForm;
