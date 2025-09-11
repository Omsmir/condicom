'use client';
import React from 'react';

const ConstructedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col justify-start items-center h-screen pt-14">{children}</div>
    );
};

export default ConstructedLayout;
