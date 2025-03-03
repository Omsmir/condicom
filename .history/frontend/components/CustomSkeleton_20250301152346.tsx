import { cn } from "@/lib/utils";
import { Form, Image, Skeleton } from "antd";
import React from "react";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export enum SkeletonType {
  HEAD = "h1",
  PARAGRAPH = "p",
  AVATAR = "avatar",
  INPUT = "input",
}
interface CustomSkeletonProps {
  classname?: string;
  innerText: string | undefined;
  SkeletonType: SkeletonType;
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  src?: string;
  width?: number;
  height?: number;
  size?: number;
  shape?: "circle" | "square";
  edit?: boolean;
  form?:UseFormReturn<z.infer<typeof User>>
}

const RenderSkeleton = ({ props }: { props: CustomSkeletonProps }) => {
  const { setLoading } = props;

  const setHandler = () => {
    if (setLoading) {
      setLoading(false);
    }
  };
  switch (props.SkeletonType) {
    case SkeletonType.HEAD:
      return (
        <h1 className={cn("relative", props.classname)}>
          {props.loading && !props.edit && (
            <Skeleton
              active
              title={{ width: "100%" }}
              paragraph={{ rows: 0 }}
              style={{ width: "100%" }}
              className="absolute"
            />
          )}
          {!props.loading && !props.edit && (
            <span className={`relative block w-full `}>{props.innerText}</span>
          )}
          
          {!props.loading && props.edit && (
            <div className="flex">
              <CustomFormField type={FormFieldType.INPUT} control={form.control} />
            </div>
          )}
        </h1>
      );
    case SkeletonType.AVATAR:
      return (
        <span
          className={cn(
            "relative border overflow-hidden cursor-pointer",
            props.classname
          )}
        >
          {props.loading && (
            <Skeleton.Avatar
              active
              size={props.size}
              shape={props.shape}
              className="absolute inset-0"
            />
          )}
          <Image
            width={props.width}
            height={props.height}
            src={props.src || "/assets/images/dr-cameron.png"}
            loading="lazy"
            onLoad={setHandler}
            className="w-full h-full object-cover object-center "
          />
        </span>
      );

    default:
      return null;
  }
};
const CustomSkeleton = (props: CustomSkeletonProps) => {
  return <RenderSkeleton props={props} />;
};

export default CustomSkeleton;
