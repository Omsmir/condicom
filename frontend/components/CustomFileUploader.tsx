"use client"
import { Upload,  UploadFile, Image } from "antd";
import { PlusOutlined,  } from "@ant-design/icons";
import React, { useState } from "react";

import type { GetProp, UploadProps } from "antd";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
type CustomFileUploaderProps = {
  files?: File[]; // Accepts optional array of File objects
  onChange: (files: File[]) => void; // Function to update form state
  classname?: string; // Optional className for styling
  buttonTitle?:string
  plusIcon?:boolean,
  buttonClassName?:string
};

const CustomFileUploader: React.FC<CustomFileUploaderProps> = ({
  files = [],
  onChange,
  classname,
  buttonTitle,
  plusIcon,
  buttonClassName
}) => {

  const {data:session} = useSession()
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
      className={cn("dark:text-slate-50",buttonClassName)} // styling is in globals.css
    >
      {plusIcon && <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{buttonTitle || "Upload"}</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage( file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  return (
    <React.Fragment>
      <div className={cn("flex w-full",classname)}>
        <Upload
          fileList={fileList}
          listType="picture-circle"
          className="antdjdjd"
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

export default CustomFileUploader;
