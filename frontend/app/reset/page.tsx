'use client';
import React from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { MotionComponent, Motions } from '@/components/relatedComponents/Motion';

const ResetPassword = dynamic(() => import('@/components/settings/settings/forget/ForgetPassword'));
const page = () => {
    const { contextHolder } = DashboardHook();
    return (
        <div className="flex h-screen items-center justify-center p-4 dark:bg-[var(--sidebar-accent)]">
            {contextHolder}
            <div className="flex flex-col justify-center items-center w-full h-full p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <Image
                        src="/assets/icons/mark.svg"
                        alt="SignIn"
                        width={50}
                        height={50}
                    />

                    <h1 className="text-2xl font-bold mx-2">Reset Password</h1>
                </div>
                <MotionComponent form={Motions.FADEIN} className="w-[686px]">
                    <ResetPassword state />
                </MotionComponent>
            </div>
        </div>
    );
};

export default page;
