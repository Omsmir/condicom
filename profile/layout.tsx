'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { MotionComponent } from '@/components/relatedComponents/Motion';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { useRouter } from 'next/navigation';
const Rootlayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const { NProgress } = DashboardHook();

    useEffect(() => {
        NProgress.set(0.65);
    }, [pathname]);
    return <MotionComponent>{children}</MotionComponent>;
};

export default Rootlayout;
