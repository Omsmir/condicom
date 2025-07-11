'use client';
import React, { Fragment, useState } from 'react';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import SubmitButton from '@/components/togglers/SubmitButton';
import { ResetPasswordNewSchema } from '@/lib/vaildation';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { AccountHook } from '@/components/context/AccountProvider';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import { EyeOff, Eye } from 'lucide-react';
import {  UseResetPassword } from '@/actions/mutation';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const ChangePassword = ({ reset, token }: { reset: boolean; token: string | undefined }) => {
    const [newPasswordState, setNewPasswordState] = useState<boolean>(false);

    const { isLoading } = AccountHook();
    const { api } = DashboardHook();
    const { data: session } = useSession();
    const router = useRouter()
    const useChange = UseResetPassword(api, token);

    const form = useForm<z.infer<typeof ResetPasswordNewSchema>>({
        resolver: zodResolver(ResetPasswordNewSchema),
        defaultValues: {
            newPassword: '',
            newPasswordConfirm: '',
        },
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordNewSchema>) => {
        const formData = new FormData();

        const data = {
            newPassword: values.newPassword,
            newPasswordConfirm: values.newPasswordConfirm,
        };

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                formData.append(key, value as string);
            }
        });
        try {
            useChange.mutate(formData, {
                onSuccess: async () => {
                    router.push('/dashboard/settings/setting');
                },
            });
        } catch (error: any) {
            console.log(`error from password change: ${error.message}`);
        }
    };

    const ShowPassword = ({
        state,
        setState,
    }: {
        state: boolean;
        setState: (value: React.SetStateAction<boolean>) => void;
    }) => {
        return (
            <Fragment>
                {state ? (
                    <Eye
                        onClick={() => setState(false)}
                        size="20px"
                        cursor="pointer"
                    />
                ) : (
                    <EyeOff
                        onClick={() => setState(true)}
                        size="20px"
                        cursor="pointer"
                    />
                )}
            </Fragment>
        );
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col p-8 pb-10 pt-0 w-full space-y-4"
            >
                {!reset && (
                    <div className="flex mt-4">
                        <h1 className="font-medium ">Reset Password</h1>
                    </div>
                )}
                <div className="flex flex-col mt-4 space-y-4 px-2">
                    <CustomFormField
                        fieldType={FormFieldType.PASSWORD}
                        control={form.control}
                        name="newPassword"
                        placeholder="new password"
                        type={newPasswordState ? 'text' : 'password'}
                        error={form.formState.errors.newPassword}
                    >
                        <ShowPassword
                            state={newPasswordState}
                            setState={setNewPasswordState}
                        />
                    </CustomFormField>
                    <CustomFormField
                        fieldType={FormFieldType.PASSWORD}
                        control={form.control}
                        name="newPasswordConfirm"
                        placeholder="confirm password"
                        type={newPasswordState ? 'text' : 'password'}
                        error={form.formState.errors.newPasswordConfirm}
                    >
                        <ShowPassword
                            state={newPasswordState}
                            setState={setNewPasswordState}
                        />
                    </CustomFormField>
                </div>
                <div className="flex justify-between items-center w-full px-2">
                    <SubmitButton
                        className="bg-slate-800 text-slate-50 max-h-[25px]"
                        isLoading={isLoading}
                        innerText=" " // importtant
                    >
                        reset password
                    </SubmitButton>
                    <div className="flex justify-between items-center">
                        {!reset && (
                            <p className="text-slate-600 text-sm">
                                {format(session?.user.passwordUpdatedAt as Date, 'Pp')}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ChangePassword;
