'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

interface OtpProps {
    length: number | undefined;
    name: string;
    value: string;
    setValue: (value: string) => void;
    separator?: boolean;
    confirmState?: boolean;
    invalid?: boolean | FieldError;
    form: 'bar' | 'seperate' | undefined;
}

const Otp: React.FC<OtpProps> = ({
    length,
    name,
    value,
    setValue,
    confirmState,
    separator,
    invalid,
    form = 'bar',
}: OtpProps) => {
    if (!length) {
        throw new Error("The 'length' prop is required.");
    }
    if (length % 2 !== 0 && length < 6) {
        throw new Error("The 'length' prop must be an even number.");
    }
    switch (form) {
        case 'bar':
            return (
                <InputOTP
                    maxLength={length}
                    name={name}
                    value={value}
                    onChange={value => setValue(value)}
                    className="w-full"
                >
                    <InputOTPGroup>
                        {Array.from({ length: length }).map((_, index) => (
                            <InputOTPSlot
                                className={clsx(
                                    'border-slate-500',
                                    { 'border-green-700': confirmState },
                                    { 'border-red-700': invalid }
                                )}
                                key={index}
                                index={index}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            );
        case 'seperate':
            return (
                <InputOTP
                    maxLength={length}
                    name={name}
                    value={value}
                    onChange={value => setValue(value)}
                    className="w-full"
                >
                    <InputOTPGroup>
                        {Array.from({ length: length / 2 }).map((_, index) => (
                            <InputOTPSlot
                                className={clsx(
                                    'border-slate-500',
                                    { 'border-green-700': confirmState },
                                    { 'border-red-700': invalid }
                                )}
                                key={index}
                                index={index}
                            />
                        ))}
                    </InputOTPGroup>
                    {separator && <InputOTPSeparator />}
                    <InputOTPGroup>
                        {Array.from({ length: length / 2 }).map((_, index) => (
                            <InputOTPSlot
                                className={clsx(
                                    'border-slate-500',
                                    { 'border-green-700': confirmState },
                                    { 'border-red-700': invalid }
                                )}
                                key={index}
                                index={index + length / 2}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            );
        default:
            return null;
    }
};

export default Otp;
