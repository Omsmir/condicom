'use client';
import { Upload, UploadFile, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { cn, FileType, getBase64, parseCSVFile, readJsonFile } from '@/lib/utils';
import { InboxOutlined } from '@ant-design/icons';
import { patientToCreate } from '@/types';

const { Dragger } = Upload;

export enum FileUploaderType {
    PICTURE = 'picture',
    JSON = 'json',
}

type CustomFileUploaderProps<T = File[]> = {
    files?: T;
    onChange: (files: T) => void;
    classname?: string;
    buttonTitle?: string;
    plusIcon?: boolean;
    buttonClassName?: string;
    type: FileUploaderType;
    maxCount?: number;
    name?: string;
};

const JsonUploader = (props: CustomFileUploaderProps<any[]>) => {
    const handleChange = async (info: { file: UploadFile }) => {
        const file = info.file.originFileObj;
        if (file instanceof File) {
            try {
                switch (info.file.type) {
                    case 'text/csv':
                        const parsedData = (await parseCSVFile(file)) as patientToCreate[];
                        props.onChange(parsedData); // validated array
                        break;
                    case 'application/json':
                        const jsonData = (await readJsonFile(file)) as patientToCreate[];
                        props.onChange(jsonData); // validated array
                        break;
                    default:
                        throw new TypeError('Invalid file type supported only Json/Csv allowed');
                }
            } catch (error) {
                console.error('Error reading file inserted', error);
            }
        } else {
            console.error('Uploaded file is not a valid File object');
        }
    };

    const handleRemove = () => {
        props.onChange([]);
    };
    return (
        <Dragger
            name={props.name}
            multiple={false}
            onChange={handleChange}
            maxCount={props.maxCount}
            onRemove={handleRemove}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Allowed Types JSON/CSV Only</p>
        </Dragger>
    );
};

const RenderUploader = ({ props }: { props: CustomFileUploaderProps<any> }) => {
    switch (props.type) {
        case FileUploaderType.PICTURE:
            return (
                <PictureUploader
                    files={props.files as File[]}
                    onChange={props.onChange as (files: File[]) => void}
                    classname={props.classname}
                    buttonTitle={props.buttonTitle}
                    plusIcon={props.plusIcon}
                    buttonClassName={props.buttonClassName}
                    type={FileUploaderType.PICTURE}
                />
            );
        case FileUploaderType.JSON:
            return (
                <JsonUploader
                    files={props.files as any[]}
                    onChange={props.onChange as (files: any[]) => void}
                    type={FileUploaderType.JSON}
                    maxCount={props.maxCount}
                    name={props.name}
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
    const [previewImage, setPreviewImage] = useState('');
    const fileList: UploadFile[] = files
        ? files.map((file, index) => ({
              uid: String(index),
              name: file.name,
              status: 'done',
              originFileObj: file as any,
          }))
        : [];

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        const updatedFiles = fileList.map(file => file.originFileObj as File);
        onChange(updatedFiles);
    };

    const uploadButton = (
        <button
            style={{ border: 0, background: 'none' }}
            type="button"
            className={cn('dark:text-slate-50', buttonClassName)} // styling is in globals.css
        >
            {plusIcon && <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{buttonTitle || 'Upload'}</div>
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
            <div className={cn('flex w-full', classname)}>
                <Upload
                    fileList={fileList}
                    listType="picture-circle"
                    className="antdjsjsj"
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
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: visible => setPreviewOpen(visible),
                        afterOpenChange: visible => !visible && setPreviewImage(''),
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
