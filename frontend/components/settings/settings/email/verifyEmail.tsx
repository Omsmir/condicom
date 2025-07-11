'use client';
import React, { useState } from 'react';
import { Form } from '@/components/ui/form';
import SubmitButton from '@/components/togglers/SubmitButton';
import { AccountHook } from '@/components/context/AccountProvider';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { UseVerifyEmail } from '@/actions/mutation';
import { useRouter } from 'next/navigation';

const VerifyEmail = () => {
    const { isVerifyingEmail } = AccountHook();

    const [verified, setVerified] = useState(false);

    const { data: session, update } = useSession();
    const sendEmail = UseVerifyEmail(session?.user.id);



        const router = useRouter()
    

    const form = useForm();

    const onSubmit = async () => {
        const formData = new FormData();
        try {
            await sendEmail.mutateAsync(formData, {
                onSuccess: async response => {
                    setVerified(true);

                    await new Promise(resolve => setTimeout(resolve, 4000));

                    await update();

                    router.push('/dashboard/settings/setting');
                },
            });
        } catch (error: any) {
            console.log(`error from Account profile: ${error.message}`);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-screen flex justify-center items-center flex-col p-8 w-full space-y-4"
            >
                <div className="flex">
                    <p className="text-xs text-slate-500 ">
                        this link will or path will expire in 1 hour, so please click the verify
                        button to confirm your process
                    </p>
                </div>
                <div className="flex w-[250px] space-y-2">
                    {verified ? (
                        <p className="text-green-800 text-sm capitalize">
                            email verified successfully
                        </p>
                    ) : (
                        <SubmitButton
                            className="bg-blue-800 text-slate-50 max-h-[25px] capitalize w-full"
                            isLoading={isVerifyingEmail}
                            innerText="verifying..."
                        >
                            verify email
                        </SubmitButton>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default VerifyEmail;
