'use client';
import { z } from 'zod';
import { formSchemaEdit } from '@/lib/vaildation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from './CustomFormField';
import { FormFieldType } from './CustomFormField';
import FileUploader from './FileUploader';
import { useState } from 'react';
import { User, DollarSign, Trash } from 'lucide-react';
import SubmitButton from './togglers/SubmitButton';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ProductReview from './ProductReview';
import { Product } from '@/types';
import clsx from 'clsx';

const EditForm = ({ product }: { product: Product }) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [idsArray, setIdsArray] = useState<string[] | []>([]);

    const onSubmit = async (values: z.infer<typeof formSchemaEdit>) => {
        formSchemaEdit.parse(values);
        const formData = new FormData();

        const name = values.name;
        const price = values.price.toString();
        const description = values.description;

        const newArray = [];

        idsArray.forEach(id => {
            if (id) formData.append('deletedImages', id);
            newArray.push(id);
        });

        if (product.name !== name) {
            formData.append('name', name);
            newArray.push(name);
        }
        if (product.description !== description) {
            formData.append('description', description);
            newArray.push(description);
        }
        if (product.price !== values.price) {
            formData.append('price', price);
            newArray.push(price);
        }

        if (values.image && values.image.length > 0) {
            values.image.forEach(image => {
                formData.append('image', image, image.name);
                newArray.push(image);
            });
        }

        try {
            if (newArray.length === 0) {
                return Swal.fire('There is no changes', '', 'info');
            }

            Swal.fire({
                title: 'Do you want to confirm the changes?',
                showDenyButton: true,
                denyButtonText: 'cancel',
                confirmButtonText: 'Change',
            }).then(async result => {
                if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info');
                } else if (result.isConfirmed) {
                    setisLoading(true);

                    await axios.put(`http://localhost:8080/api/products/${product._id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    Swal.fire('Changed successfully', '', 'success');

                    router.push(`/dashboard/products/${product._id}`);
                }
            });
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: err,
                text: 'something went wrong',
            });
        } finally {
            setisLoading(false);
        }
    };

    const form = useForm<z.infer<typeof formSchemaEdit>>({
        resolver: zodResolver(formSchemaEdit),
        defaultValues: {
            name: product.name || '',
            description: product.description || '',
            price: product.price | 1,
        },
    });
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 space-y-8 my-auto"
            >
                <section className="grid grid-cols-12">
                    <div className="mr-2 col-span-6 sm:col-span-8">
                        <CustomFormField
                            control={form.control}
                            Lucide={<User className="dark:text-dark-600" />}
                            placeholder="product name"
                            label="product name"
                            fieldType={FormFieldType.INPUT}
                            name="name"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-4 ">
                        <CustomFormField
                            fieldType={FormFieldType.NUMBER}
                            control={form.control}
                            placeholder="50$"
                            label="price"
                            name="price"
                            Lucide={<DollarSign className="dark:text-dark-600" />}
                            min={1}
                            max={999}
                        />
                    </div>
                </section>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.TEXTAREA}
                    name="description"
                    placeholder="product description"
                    label="description"
                />

                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="image"
                    label="Product Image"
                    renderSkeleton={field => (
                        <FormControl>
                            <FileUploader
                                files={field.value}
                                onChange={field.onChange}
                                state={true}
                                className={clsx('flex bg-slate-100 rounded-md p-4 file-upload')}
                            >
                                <ProductReview
                                    product={product}
                                    setIdsArray={setIdsArray}
                                />
                                {/* Needs To Be Refactored In DashboardProvider */}
                            </FileUploader>
                        </FormControl>
                    )}
                />
                <SubmitButton isLoading={isLoading}>Add Product</SubmitButton>
            </form>
        </Form>
    );
};

export default EditForm;

export const dynamic = 'force-dynamic';
