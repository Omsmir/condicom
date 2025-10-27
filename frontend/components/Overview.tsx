'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

const Overview = () => {
    const { data: session } = useSession();
    if (session)
        return (
            <div className="flex h-screen my-auto justify-center items-center">

            
            </div>
        );
};

export default Overview;
