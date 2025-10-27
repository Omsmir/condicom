'use client';
import React from 'react';
import { Form } from '@/components/ui/form';
import SubmitButton from '@/components/togglers/SubmitButton';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { AccountHook } from '@/components/context/AccountProvider';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { UseSendEmailVerification } from '@/actions/mutation';

const SendEmailVerification = () => {
    const { isVerifyingEmail } = AccountHook();
    const { api } = DashboardHook();

    const { data: session } = useSession();
    const sendEmail = UseSendEmailVerification(api, session?.user.id);

    const form = useForm();

    const onSubmit = async () => {
        try {
            await sendEmail.mutateAsync();
        } catch (error: any) {
            console.log(`error from Account profile: ${error.message}`);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col p-8  w-full space-y-4"
            >
                <div className="flex items-center">
                    <div className="flex w-full flex-col space-y-2">
                        <div className="flex">
                            <h1 className="font-medium capitalize">email verification</h1>
                        </div>
                        <p className="text-xs text-slate-500">
                            Verifying your email will keep your account away from deletions security
                            checkups
                        </p>
                    </div>
                    <div className="flex flex-col h-full space-y-2">
                        <SubmitButton
                            className="bg-blue-800 text-slate-50 max-h-[25px] capitalize "
                            isLoading={isVerifyingEmail}
                            disabled={session?.user.verified}
                            disabledText={'verified'}
                            innerText=" " // importtant
                        >
                            verify email
                        </SubmitButton>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default SendEmailVerification;
