import { Upload, Button, UploadFile, Image } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useState } from 'react';

import type { GetProp ,UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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
};

const CustomFileUploader: React.FC<CustomFileUploaderProps> = ({ files = [], onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const fileList: UploadFile[] = files
    ? files.map((file, index) => ({
        uid: String(index),
        name: file.name,
        status: "done",
        originFileObj: file as any, // ✅ Ensure correct typing
      }))
    : [];

  // ✅ Handle Upload Change
  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const updatedFiles = fileList.map((file) => file.originFileObj as File);
    onChange(updatedFiles); // Update form state
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  return (<>
    <Upload
      fileList={fileList}
      listType="picture-circle"
      beforeUpload={() => false}
      onChange={handleUploadChange}
      onPreview={handlePreview}
      maxCount={1} 
    >
      {fileList.length >= 1 ? null : <Button icon={<UploadOutlined />}>Upload</Button>}
    </Upload>
    {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default CustomFileUploader;
