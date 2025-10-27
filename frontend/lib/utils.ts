import { GetProp, UploadProps } from 'antd';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Papa from 'papaparse';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const readJsonFile = (file: File): Promise<any> =>
    new Promise((resolve, reject) => {
        if (!(file instanceof Blob)) {
            reject(new TypeError('Expected file to be a Blob or File'));
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
        reader.onerror = error => reject(error);
    });

export const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

export const parseCSVFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true, // Treat first row as field names
            skipEmptyLines: true,
            complete: results => {
                resolve(results.data);
            },
            error: error => {
                reject(error);
            },
        });
    });
};
