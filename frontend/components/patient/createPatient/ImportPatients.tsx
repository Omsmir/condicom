"use client"
import React, { useState } from 'react';
import AddMultipleDocuments from '../../AddMultipleDocuments';
import { useForm } from 'react-hook-form';
import { PatientsSchema } from '@/lib/vaildation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl } from '../../ui/form';
import CustomFormField, { FormFieldType } from '../../CustomFormField';
import CustomFileUploader, { FileUploaderType } from '../../CustomFileUploader';
import SubmitButton from '@/components/togglers/SubmitButton';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { UseCreateMultiplePatients } from '@/actions/mutation';
import { PatientHook } from '@/components/context/PatientProvider';

const ImportPatients = () => {
    const { api } = DashboardHook();

    const { isLoading, alertMessage } = PatientHook();
    const [ErrorMessage, setErrorMessage] = useState<string | null>('');

    const oneIterableMessage = new Set(ErrorMessage);
    const importPatients = UseCreateMultiplePatients(api);

    const onSubmit = async (values: Zod.infer<typeof PatientsSchema>) => {
        try {
            if (values.patients !== undefined || values.patients !== null) {
                await importPatients.mutateAsync(values.patients, {
                    onError: async (error: any) => {
                        console.log(error);
                        setErrorMessage(
                            error.response.data.errorMessages?.map((message: string) => message)
                        );
                    },
                });
            }
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const form = useForm<Zod.infer<typeof PatientsSchema>>({
        resolver: zodResolver(PatientsSchema),
        defaultValues: {},
    });
    return (
        <AddMultipleDocuments
            title="Import Patients"
            buttonText="Import"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col w-full space-y-10 p-4 "
                >
                    <div className="flex flex-col justify-start gap-10">
                        <CustomFormField
                            control={form.control}
                            name="patients"
                            label="Select Patients File"
                            fieldType={FormFieldType.SKELETON}
                            renderSkeleton={field => (
                                <FormControl>
                                    <CustomFileUploader
                                        classname="justify-center"
                                        type={FileUploaderType.JSON}
                                        files={field.value}
                                        onChange={field.onChange}
                                        maxCount={1}
                                        name='patient'
                                    />
                                </FormControl>
                            )}
                        />
                        <div className="flex flex-col justify-start">
                            {ErrorMessage
                                ? Array.from(oneIterableMessage).map(message => (
                                      <p
                                          key={message}
                                          className="text-red-500 font-medium text-sm"
                                      >
                                          {message}
                                      </p>
                                  ))
                                : alertMessage && (
                                      <p className="text-green-500 font-medium text-sm">
                                          {alertMessage} patients will be added if there is no
                                          conflict
                                      </p>
                                  )}
                        </div>
                        <SubmitButton
                            className="bg-[#6366f1] text-slate-50 w-full"
                            isLoading={isLoading}
                            innerText="Importing"
                        >
                            Import Patients
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </AddMultipleDocuments>
    );
};

export default ImportPatients;
