"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldError } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { XCircle, CheckCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "primereact/calendar";

import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CalenderHook } from "./context/CalenderProvider";
import { ColorPicker } from "antd";
import ReactCountryFlagsSelect from "react-country-flags-select";
import { cn } from "@/lib/utils";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Checkbox } from "./ui/checkbox";
import Otp from "./Otp";

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
  COLOR = "colorPicker",
  COUNTRY = "country",
  CHECKBOX = "checkbox",
  OTP = "Otp",
}

interface CustomProps {
  control: Control<any> | undefined;
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
  showTimeSelect?: boolean;
  timeOnly?: boolean;
  calenderDays?: Date[];
  innerState?: boolean;
  className?: string;
  optionalLabel?: string;
  OtpLength?: number;
  OtpInvalid?:boolean | FieldError
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { date, setDate, setDisabled } = CalenderHook();
  const ErrorComponent = () => {
    if (props.state) {
      if (props.error) {
        return <CloseCircleFilled className=" text-red-500" size={20} />;
      } else if (field.value) {
        return <CheckCircleFilled className=" text-green-500" size={20} />;
      }
    } else {
      return null;
    }
  };

  const handleChange = (e: any) => {
    field.onChange(e.value);

    setDate(e.value);

    setDisabled(false);
  };

  const classes = {
    searchSelect: "Country focus:outline-none",
    optionsWrapper: "countryOptionsWrapper",
    option: "hover:bg-slate-500",
  };

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div
          className={cn(
            "flex justify-center items-center rounded-md border bg-slate-100 dark:border-[var(--sidebar-accent)]",
            props.className
          )}
        >
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
              <CloseCircleFilled className=" text-red-500 mx-2" size={20} />
            ) : (
              field.value && (
                <>
                  <CheckCircleFilled
                    className=" text-green-500 mx-2"
                    size={20}
                  />
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
              <SelectTrigger className="shad-select-trigger text-slate-500">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent
              className={cn("shad-select-content", props.className)}
            >
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.DATE:
      return (
        <div>
          <FormControl>
            <Calendar
              value={field.value || date}
              onChange={(e) => handleChange(e)}
              showIcon
              className={`date-picker pl-2 focus:shadow-none p-calender ${props.className}`}
              placeholder="select a date"
              variant="filled"
              dateFormat="mm/dd/yy"
              showTime={props.showTimeSelect || undefined}
              timeOnly={props.timeOnly || undefined}
              hourFormat="12"
              enabledDates={props.calenderDays}
              stepMinute={30}
              disabled={props.disabled}
              touchUI
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
            className="input-phone "
          />
        </FormControl>
      );
    case FormFieldType.COUNTRY:
      return (
        <div className="h-11">
          <FormControl>
            <ReactCountryFlagsSelect
              selected={field.value}
              onSelect={(e) => field.onChange(e)}
              searchable
              searchPlaceholder={props.placeholder}
              optionsListMaxHeight={150}
              classes={classes}
              fullWidth
            />
          </FormControl>
        </div>
      );
    case FormFieldType.COLOR:
      return (
        <div className="flex justify-center items-center">
          <FormControl>
            <ColorPicker
              defaultValue="#242c55"
              className="w-full h-11"
              value={field.value}
              onChange={(color) => field.onChange(color.toHex())}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex justify-start items-center">
            <label htmlFor={props.name} className="checkbox-label mr-1">
              {props.label}
            </label>
            <Checkbox
              id={props.name}
              onCheckedChange={field.onChange}
              checked={field.value}
            />
          </div>
        </FormControl>
      );
    case FormFieldType.OTP: 
      return (
        <div className={cn("flex justify-center items-center",props.className)}>
          <FormControl>
          <Otp length={props.OtpLength} name={props.name} value={field.value} setValue={field.onChange} confirmState={props.state} invalid={props.OtpInvalid} />
          </FormControl>
        </div>
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
        <FormItem className="flex-1">
          <div className="flex justify-between">
            {props.label && (
              <FormLabel className="shad-input-label dark:text-slate-50">
                <div className="flex items-center">
                  <h1 className="mr-1 capitalize">{props.label}</h1>
                  <p className="text-[12px] text-slate-600">
                    {props.optionalLabel}
                  </p>
                </div>
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
