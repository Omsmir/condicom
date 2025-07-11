'use client';
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
interface AccordationProps {
    value: string;
    title: string;
    classname?: string;
    children: React.ReactNode;
}
const Accordation: React.FC<AccordationProps> = ({
    value,
    classname,
    children,
    title,
}: AccordationProps) => {
    return (
        <AccordionItem
            value={value}
            className={cn('dark:border-slate-500 p-8 pb-6 pt-4', classname)}
        >
            <AccordionTrigger className="!no-underline">
                <div className="flex ">
                    <h1 className="font-medium capitalize">{title}</h1>
                </div>
            </AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
    );
};

export default Accordation;
