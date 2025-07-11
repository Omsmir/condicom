'use client';
import { MotionComponent } from '@/components/relatedComponents/Motion';

const Rootlayout = ({ children }: { children: React.ReactNode }) => {
    return <MotionComponent>{children}</MotionComponent>;
};

export default Rootlayout;
