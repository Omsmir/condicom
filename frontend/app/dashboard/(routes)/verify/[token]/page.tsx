import VerifyEmail from '@/components/settings/settings/email/verifyEmail';
import Encapsulating from '@/components/settings/settings/forget/Encapsulating';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Health - verify email',
};

const page = async ({ params }: { params: Promise<{ token: string }> }) => {
    const token = (await params).token;

    return (
        <Encapsulating
            token={token}
            hashStart="verifyEmail"
            KeyType="VerTokenPrivateKey"
        >
            <VerifyEmail />
        </Encapsulating>
    );
};

export default page;
