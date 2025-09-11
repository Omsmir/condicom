'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { MotionComponent, Motions } from '@/components/relatedComponents/Motion';
import { DashboardHook } from '@/components/context/Dashboardprovider';
const Rootlayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const { NProgress } = DashboardHook();

    useEffect(() => {
        NProgress.set(0.65);
    }, [pathname]);
    return <MotionComponent form={Motions.FADEIN}>{children}</MotionComponent>;
};

export default Rootlayout;
