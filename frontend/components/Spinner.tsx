import { cn } from '@/lib/utils';
import { Spin } from 'antd';
import React from 'react';

interface SpinnerProps {
    text?: string;
    className: string;
    size?: 'small' | 'large' | 'default';
}
const Spinner: React.FC<SpinnerProps> = ({ text, className, size }) => {
    return (
        <div className={cn('flex justify-center items-center h-screen ', className)}>
            <Spin size={size ?? 'large'} />
            {text && <p className="text-sm font-medium">{text}</p>}
        </div>
    );
};

export default Spinner;
