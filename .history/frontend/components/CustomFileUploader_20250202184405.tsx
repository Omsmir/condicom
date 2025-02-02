import { Upload, Button, UploadFile } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

type CustomFileUploaderProps = {
  files?: File[]; // Accepts optional array of File objects
  onChange: (files: File[]) => void; // Function to update form state
};

const CustomFileUploader: React.FC<CustomFileUploaderProps> = ({ files = [], onChange }) => {
  // ✅ Convert stored files into Ant Design's UploadFile format
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

  return (<>
    <Upload
      fileList={fileList}
      listType="picture-circle"
      beforeUpload={() => false} // ✅ Prevent auto-upload
      onChange={handleUploadChange}
      maxCount={1} // ✅ Only one file allowed
    >
      {fileList.length >= 1 ? null : <Button icon={<UploadOutlined />}>Upload</Button>}
    </Upload>
    </>
  );
};

export default CustomFileUploader;
