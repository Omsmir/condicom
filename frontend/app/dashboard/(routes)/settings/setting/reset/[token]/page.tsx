import React from 'react';
import dynamic from 'next/dynamic';
import Encapsulating from '@/components/settings/settings/forget/Encapsulating';
import NotFound from '@/app/not-found';
const ChangePassword = dynamic(
    () => import('@/components/settings/settings/forget/ChangePassword')
);
const page = async ({ params }: { params: Promise<{ token: string }> }) => {
    const token = (await params).token;

    const validatePath = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

    if (!validatePath.test(token)) {
        return <NotFound />;
    }

    return (
        <Encapsulating token={token}>
            <ChangePassword
                reset={false}
                token={token}
            />
        </Encapsulating>
    );
};

export default page;
