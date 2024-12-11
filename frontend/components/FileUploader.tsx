import clsx from "clsx";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ProductReview from "./ProductReview";
import { FileUploaderProps } from "@/types";
import { NodeIndexOutlined } from "@ant-design/icons";
import { cn } from "@/lib/utils";

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertToBase64 = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      reject(fileReader.error);
    };
  });
};
const FileUploader = ({
  files,
  onChange,
  state,
  children,
  profileState,
  className,
}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files

    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const ImageComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/assets/icons/upload.svg"
          width={40}
          height={40}
          alt="upload"
        />
        <div className="file-upload_label my-2">
          <p className="text-14-regular ">
            <span className="text-green-500">Click to upload </span>
            or drag and drop
          </p>
          <p className="text-12-regular">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {state && children}

      <div className="flex justify-center ">
        <div {...getRootProps()} className={cn(className)}>
          <input {...getInputProps()} />
          {profileState ? (
            <div className="flex size-56">
              {files && files.length > 0 ? (
                files
                  .map((file, index) => (
                    <Image
                      src={convertFileToUrl(file)}
                      alt="uploaded-image"
                      width={200}
                      key={index}
                      height={200}
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  ))
                  
              ) : (
                <div className="flex size-56 justify-center items-center">
                  <p className="font-medium text-slate-600 capitalize">select image</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex ">
              {files && files.length > 0 ? (
                files.map((file) => (
                  <Image
                    src={convertFileToUrl(file)}
                    alt="uploaded-image"
                    width={200}
                    key={file.name}
                    height={200}
                    className="w-full h-full object-cover object-center px-2"
                  />
                ))
              ) : (
                <ImageComponent />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUploader;
