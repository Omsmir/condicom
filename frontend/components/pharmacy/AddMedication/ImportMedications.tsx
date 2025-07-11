"use client"
import React, { useState } from 'react';
import AddMultipleDocuments from '../../AddMultipleDocuments';
import { useForm } from 'react-hook-form';
import { MedicationsSchema } from '@/lib/vaildation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl } from '../../ui/form';
import CustomFormField, { FormFieldType } from '../../CustomFormField';
import CustomFileUploader, { FileUploaderType } from '../../CustomFileUploader';
import SubmitButton from '@/components/togglers/SubmitButton';
import { DashboardHook } from '@/components/context/Dashboardprovider';
import { UseCreateMultipleMedications } from '@/actions/mutation';
import { PatientHook } from '@/components/context/PatientProvider';

const ImportMedications = () => {
    const { api } = DashboardHook();

    const { isLoading, alertMessage } = PatientHook();
    const [ErrorMessage, setErrorMessage] = useState<string | null>('');

    const oneIterableMessage = new Set(ErrorMessage);
    const ImportMedications = UseCreateMultipleMedications(api);

    const onSubmit = async (values: Zod.infer<typeof MedicationsSchema>) => {
        try {
            if (values.medications !== undefined || values.medications !== null) {
                await ImportMedications.mutateAsync(values.medications, {
                    onError: async (error: any) => {
                        console.log(error);
                        setErrorMessage(
                            error.response.data.errorMessages?.map((message: string) => message)
                        );
                    },
                });
            }
            console.log('values', values.medications);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    const form = useForm<Zod.infer<typeof MedicationsSchema>>({
        resolver: zodResolver(MedicationsSchema),
        defaultValues: {},
    });
    return (
        <AddMultipleDocuments
            title="Import Medications"
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
                            name="medications"
                            label="Select Medications File"
                            fieldType={FormFieldType.SKELETON}
                            renderSkeleton={field => (
                                <FormControl>
                                    <CustomFileUploader
                                        classname="justify-center"
                                        type={FileUploaderType.JSON}
                                        files={field.value}
                                        onChange={field.onChange}
                                        maxCount={1}
                                        name='medication'
                                    />
                                </FormControl>
                            )}
                        />
                        <div className="flex flex-col justify-start">
                            {
                                ErrorMessage ?
                                    Array.from(oneIterableMessage).map(message => (
                                        <p
                                            key={message}
                                            className="text-red-500 font-medium text-sm"
                                        >
                                            {message}
                                        </p>
                                    ))
                                : alertMessage && (
                                      <p className="text-green-500 font-medium text-sm">
                                          {alertMessage} medications will be added if there is no
                                          conflict
                                      </p>
                                  )}
                            
                        </div>
                        <SubmitButton
                            className="bg-[#6366f1] text-slate-50 w-full"
                            isLoading={isLoading}
                            innerText="Importing"
                        >
                            Import medications
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </AddMultipleDocuments>
    );
};

export default ImportMedications;
