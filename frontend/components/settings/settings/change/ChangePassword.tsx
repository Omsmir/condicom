'use client';
import React, { Fragment, useState } from 'react';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import SubmitButton from '@/components/togglers/SubmitButton';
import { SettingAuthentcationSchema } from '@/lib/vaildation';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { AccountHook } from '@/components/context/AccountProvider';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import { EyeOff, Eye } from 'lucide-react';
import { UseChangePassword } from '@/actions/mutation';
import { format } from 'date-fns';

const ChangePassword = () => {
    const [oldPasswordShow, setOldPasswordShow] = useState<boolean>(false);
    const [newPasswordState, setNewPasswordState] = useState<boolean>(false);

    const { isLoading, setResetState } = AccountHook();
    const { api } = DashboardHook();
    const { data: session } = useSession();

    const useChange = UseChangePassword(api, session?.user.id);

    const form = useForm<z.infer<typeof SettingAuthentcationSchema>>({
        resolver: zodResolver(SettingAuthentcationSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
        },
    });

    const onSubmit = (values: z.infer<typeof SettingAuthentcationSchema>) => {
        const formData = new FormData();

        const data = {
            password: values.password,
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
                    form.reset();
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
                className="flex flex-col w-full space-y-4"
            >
                <div className="flex flex-col mt-4 space-y-4 px-2">
                    <CustomFormField
                        fieldType={FormFieldType.PASSWORD}
                        control={form.control}
                        name="password"
                        placeholder="current password"
                        type={oldPasswordShow ? 'text' : 'password'}
                        error={form.formState.errors.password}
                    >
                        <ShowPassword
                            state={oldPasswordShow}
                            setState={setOldPasswordShow}
                        />
                    </CustomFormField>
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
                <div className="flex flex-row-reverse justify-between items-center w-full px-2">
                    <SubmitButton
                        className="bg-slate-800 text-slate-50 max-h-[25px]"
                        isLoading={isLoading}
                        innerText=" " // importtant
                    >
                        change password
                    </SubmitButton>
                    <div className="flex justify-between items-center">
                        <Button
                            className="text-blue-700"
                            variant="link"
                            onClick={() => setResetState(true)}
                        >
                            forget password
                        </Button>
                        <p className="text-slate-600 text-sm hidden sm:block">
                            {format(session?.user.passwordUpdatedAt as Date, 'Pp')}
                        </p>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default ChangePassword;
