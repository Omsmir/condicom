'use client';
import { UserInformation } from '@/types';
import { Divider } from '@mui/material';
import { Image, Skeleton } from 'antd';
import { Eye } from 'lucide-react';

const Prescriptions = () => {
    return (
        <div className="flex flex-1 flex-col bg-[var(--sidebar-background)] rounded-md sm:min-w-[386px] overflow-hidden ">
            <div className="flex p-4 items-center">
                <h1 className="dark:text-slate-500 font-medium">Prescriptions</h1>
            </div>
            <Divider className=" dark:bg-slate-500 m-0" />
        </div>
    );
};

export default Prescriptions;
