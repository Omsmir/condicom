"use client";
import { Upload, UploadFile, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import type { GetProp, UploadProps } from "antd";
import { cn } from "@/lib/utils";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { PatientsSchema } from "@/lib/vaildation";

const { Dragger } = Upload;

const readJsonFile = (file: File): Promise<any> =>
  new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new TypeError("Expected file to be a Blob or File"));
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => reject(error);
  });

// const props: UploadProps = {
//   name: "file",
//   multiple: true,
//   async onChange(info) {},
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };

const JsonUploader = (props: CustomFileUploaderProps<any[]>) => {
  const handleChange = async (info: { file: UploadFile }) => {
    const file = info.file.originFileObj;
    if (file instanceof File) {
      try {
        const jsonData = await readJsonFile(file);
        console.log("Parsed JSON:", jsonData);
        props.onChange(jsonData); // validated array

      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
    } else {
      console.error("Uploaded file is not a valid File object");
    }
  };
  return (
    <Dragger
      name="file"
      multiple={true}
      onChange={handleChange}
      // JSON uploader doesn't need to show fileList
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type CustomFileUploaderProps<T = File[]> = {
  files?: T; // Accepts optional array of File objects or patient objects
  onChange: (files: T) => void; // Function to update form state
  classname?: string; // Optional className for styling
  buttonTitle?: string;
  plusIcon?: boolean;
  buttonClassName?: string;
  type: FileUploaderType;
};

export enum FileUploaderType {
  PICTURE = "picture",
  JSON = "json",
}

const RenderUploader = ({ props }: { props: CustomFileUploaderProps<any> }) => {
  const {
    type,
    files,
    onChange,
    classname,
    buttonTitle,
    plusIcon,
    buttonClassName,
  } = props;

  switch (type) {
    case FileUploaderType.PICTURE:
      return (
        <PictureUploader
          files={files as File[]}
          onChange={onChange as (files: File[]) => void}
          classname={classname}
          buttonTitle={buttonTitle}
          plusIcon={plusIcon}
          buttonClassName={buttonClassName}
          type={FileUploaderType.PICTURE}
        />
      );
    case FileUploaderType.JSON:
      return (
        <JsonUploader
          files={files as any[]}
          onChange={onChange as (files: any[]) => void}
          type={FileUploaderType.JSON}
        />
      );
    default:
      return null;
  }
};

const PictureUploader: React.FC<CustomFileUploaderProps<File[]>> = ({
  files = [],
  onChange,
  classname,
  buttonTitle,
  plusIcon,
  buttonClassName,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const fileList: UploadFile[] = files
    ? files.map((file, index) => ({
        uid: String(index),
        name: file.name,
        status: "done",
        originFileObj: file as any,
      }))
    : [];

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const updatedFiles = fileList.map((file) => file.originFileObj as File);
    onChange(updatedFiles);
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className={cn("dark:text-slate-50", buttonClassName)} // styling is in globals.css
    >
      {plusIcon && <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{buttonTitle || "Upload"}</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  return (
    <React.Fragment>
      <div className={cn("flex w-full", classname)}>
        <Upload
          fileList={fileList}
          listType="picture-circle"
          className="antd"
          beforeUpload={() => false}
          onChange={handleUploadChange}
          onPreview={handlePreview}
          maxCount={1}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </React.Fragment>
  );
};

const CustomFileUploader = (props: CustomFileUploaderProps<any>) => {
  return <RenderUploader props={props} />;
};
export default CustomFileUploader;
