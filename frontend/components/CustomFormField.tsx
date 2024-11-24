"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { XCircle, CheckCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "primereact/calendar";

import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  SELECT = "select",
  NUMBER = "number",
  SKELETON = "skeleton",
  SEARCH = "search",
  DATE = "datePicker",
  PHONE = "phoneInput",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  icon?: (icon: any) => React.ReactNode;
  iconAlt?: string;
  disabled?: boolean;
  Lucide?: React.ReactNode;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  min?: number;
  max?: number;
  type?: string;
  error?: any;
  forget?: boolean;
  state?: boolean;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const ErrorComponent = () => {
    if (props.state) {
      if (props.error) {
        return <XCircle className=" text-red-500" size={20} />;
      } else if (field.value) {
        return <CheckCircle className=" text-green-500" size={20} />;
      }
    } else {
      return null;
    }
  };
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex justify-center items-center rounded-md border border-slate-200 bg-slate-100">
          {props.Lucide && (
            <span className="ml-2 w-[24px] h-[24px]">{props.Lucide}</span>
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
          <div className="flex justify-center items-center mx-2">
            <ErrorComponent />
          </div>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="flex justify-center items-center rounded-md border border-slate-200 bg-slate-100">
          {props.Lucide && (
            <span className="ml-2 w-[24px] h-[24px]">{props.Lucide}</span>
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              type={props.type}
              className="shad-input border-0"
            />
          </FormControl>
          <div className="flex justify-center items-center mx-2">
            {props.error ? (
              <XCircle className=" text-red-500 mx-2" size={20} />
            ) : (
              field.value && (
                <>
                  <CheckCircle className=" text-green-500 mx-2" size={20} />
                  {props.children}
                </>
              )
            )}
          </div>
        </div>
      );
    case FormFieldType.NUMBER:
      return (
        <div className="flex rounded-md border justify-center items-center border-slate-200 bg-slate-100">
          {props.Lucide && (
            <span className="ml-2 w-[24px] h-[24px]">{props.Lucide}</span>
          )}
          <FormControl>
            <input
              type="number"
              placeholder={props.placeholder}
              {...field}
              min={props.min}
              max={props.max}
              className="shad-input flex-1 border-0 px-4 focus:outline-none"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea border-0"
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger text-dark-500">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.DATE:
      return (
        <div className=" ml-2 ">
          <FormControl>
            <Calendar
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              showIcon
              className="date-picker pl-2 focus:shadow-none"
              placeholder="select a date"
              variant="filled"
              dateFormat="mm/dd/yy"
            
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="EG"
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            international
            className="input-phone"
          />
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex-1 ">
          <div className="flex justify-between">
            {props.label && (
              <FormLabel className="shad-input-label dark:text-slate-50">
                {props.label}
              </FormLabel>
            )}
            {props.forget && (
              <Link href={`/reset`}>
                <p className="text-sm text-sky-700 hover:underline">
                  Forget Password
                </p>
              </Link>
            )}
          </div>
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
