import React from 'react';
import dynamic from 'next/dynamic';
import Encapsulating from '@/components/settings/settings/forget/Encapsulating';

const MultiAuthPage = dynamic(
    () => import('@/components/settings/settings/security/MultiAuthPage')
);
const page = async ({ params }: { params: Promise<{ token: string }> }) => {
    const token = (await params).token;

    return (
        <Encapsulating
            token={token}
            KeyType="MULTI_AUTH_SECRET"
        >
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-[586px] p-4 rounded-lg shadow-md">
                    <MultiAuthPage />
                </div>
            </div>
        </Encapsulating>
    );
};

export default page;
