import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
        <Encapsulating
            token={token}
            KeyType="VerTokenPrivateKey"
        >
            <div className="flex h-screen justify-center items-center p-4 dark:bg-[var(--sidebar-accent)]">
                <div className="flex flex-col justify-center items-center w-full h-full p-4 sm:p-6">
                    <Image
                        src="/assets/icons/mark.svg"
                        alt="reset"
                        width={75}
                        height={75}
                    />
                    <div className="flex max-w-[886px] sm:w-full w-full flex-col justify-center items-center p-4 sm:p-6">
                        <ChangePassword
                            reset
                            token={token}
                        />
                    </div>
                </div>
            </div>
        </Encapsulating>
    );
};

export default page;
