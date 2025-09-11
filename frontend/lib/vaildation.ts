import { z } from 'zod';

import * as Yup from 'yup';
import {
    characters,
    codeExpirationPlans,
    firstNumber,
    FiveNumber,
    genders,
    medicationCategories,
    medicationForms,
    medicationRoutes,
    medicationStrengths,
} from './constants';
import { File } from 'buffer';

export const formSchema = z.object({
    name: z.string().min(2, {
        message: 'product name must be at least 2 characters.',
    }),
    price: z.coerce.number().min(1, 'minimum pirce is 1$').max(999, 'maximum price is 999$'),
    description: z
        .string()
        .min(10, 'Please provide more details')
        .max(500, 'The details provided is too much'),
    image: z.custom<File[]>(file => file, {
        message: 'please select an image',
    }),
});

export const formSchemaEdit = z.object({
    name: z.string().min(2, {
        message: 'product name must be at least 2 characters.',
    }),
    price: z.coerce.number().min(1, 'minimum pirce is 1$').max(999, 'maximum price is 999$'),
    description: z
        .string()
        .min(10, 'Please provide more details')
        .max(500, 'The details provided is too much'),
    image: z.custom<File[]>().optional(),
});

export const userSchema = z.object({
    email: z.string().min(1, 'email is required').email({ message: 'invaild email address' }),
    password: z.string().min(6, 'please enter password'),
});

export const RegisterSchema = Yup.object({
    name: Yup.string()
        .min(2, 'username must be at least 2 characters.')
        .required('username is required'),
    email: Yup.string().min(1, 'email is required').email('Invalid email address.'),
    password: Yup.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: Yup.string()
        .min(1, 'Passwords must match.')
        .oneOf([Yup.ref('password'), ''], 'Passwords must match.'),
    phone: Yup.string().min(10, 'Phone number is required.').required('please enter your phone'),
    gender: Yup.string().default('male').oneOf(genders, 'please select a gender'),
    birthDate: Yup.string()
        .test('valid-date', 'Invalid date', (value: any) => value && !isNaN(Date.parse(value)))
        .test(
            'logical-date',
            'Date must be in the past',
            (value: any) => value && new Date(value).getTime() < Date.now()
        )
        .required('BirthDate is required'),

    code: Yup.string()
        .required('Support a code')
        .matches(/B(1|2)[0-5](C|D|E)[0-9]{5}/g, 'Code is Invaild'),
});

const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

export const PostRegisterSchema = z.object({
    profileImg: z
        .custom<File[]>(
            files => {
                return files && files.length > 0;
            },
            {
                message: 'Please select an Image',
            }
        )
        .refine(
            files => {
                if (!Array.isArray(files) || files.length === 0) {
                    return false;
                }
                return files.every(file => {
                    const fileName = file.name.toLowerCase();
                    const extension = fileName.split('.').pop();
                    return validImageExtensions.includes(extension || '');
                });
            },
            { message: 'please select a valid image ' }
        )
        .refine(files => Array.isArray(files) && files.length > 0 && files[0].size <= 1000000, {
            message: 'picture size must be smaller than or equal to 1MB',
        }),
    weight: z.string({ message: 'Please Select Weight' }),
    height: z.string({ message: 'Please Select Height' }),
    address: z.string().optional(),
    bio: z
        .string()
        .min(30, 'Bio Must Exceed 30 characters')
        .max(350, "Bio Can't Be More Than 350 characters")
        .optional(),
    occupation: z.string({ message: 'Please Select Occupation' }),
    country: z.object(
        { label: z.string({ message: 'Please Select' }) },
        { message: 'Please Select a Country' }
    ),
});

export const AppointmentSchema = z.object({
    Task: z
        .string({ message: 'Please Provide a Task' })
        .min(2, 'min characters is 2')
        .max(40, 'max length is 20 characters'),
    description: z.string().max(80, 'max length is 80 characters').optional(),
    startDate: z.date({ message: 'please support a start date' }), // Validates ISO 8601 datetime
    endDate: z.date({ message: 'please support an end time' }),
    color: z.custom(),
    patientEmail: z
        .string({ message: 'Please Provide a Patient Email' })
        .optional(),
});

const PatientPayload = {
    firstName: z
        .string({ message: 'First name is required' })
        .min(2, { message: 'Minimum characters is 2' }),
    lastName: z
        .string({ message: 'Last name is required' })
        .min(2, { message: 'Minimum characters is 2' }),
    profileImg: z
        .custom<File[]>(files => files && files.length > 0, {
            message: 'Please select an image',
        })
        .refine(
            files =>
                files.every(file => {
                    const fileName = file.name.toLowerCase();
                    const extension = fileName.split('.').pop();
                    return validImageExtensions.includes(extension || '');
                }),
            { message: 'Invalid image extension' }
        )
        .refine(files => Array.isArray(files) && files.length > 0 && files[0].size <= 1000000, {
            message: 'picture size must be smaller than or equal to 1MB',
        })
        .optional(),
    phone: z.string({ message: 'Phone number is required' }),
    weight: z.string().optional(),
    height: z.string().optional(),
    email: z.string({ message: 'email is required' }).email({ message: 'invalid email' }),
    gender: z.string({ message: 'please select a gender' }),
    bloodType: z.string({ message: 'please select a blood type' }),
    emergencyContactPerson: z.string().optional(),
    emergencyContactRelationship: z.string().optional(),
    emergencyContactNumber: z.string({ message: 'emergency number is required' }),
    residentialAddress: z.string().optional(),
    insuranceProvider: z.string().optional(),
    medicalConditions: z.string({ message: 'please select a medical condition' }),
    allergies: z.string({ message: 'please select an allergy' }),
    pastSurgeries: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    currentMedications: z
        .string({ message: 'please describe your medications' })
        .min(1, 'please describe your medications'),
    smoking: z.enum(['yes', 'no'], {
        required_error: 'Please select if you smoke',
    }),
    smokingFrequency: z.enum(['daily', 'occasionally', 'rarely', 'never']).optional(),
    alcohol: z.enum(['yes', 'no'], {
        required_error: 'Please select if you consume alcohol',
    }),
    alcoholFrequency: z.enum(['daily', 'occasionally', 'rarely', 'never']).optional(),
};

export const patientSchema = z.object({
    ...PatientPayload,
    birthDate: z
        .date({ message: 'Please select a date' })
        .refine(date => date < new Date(), { message: 'Date must be in past' }),
    country: z.object(
        { label: z.string({ message: 'Please select a country' }) },
        { message: 'Please select a country' }
    ),
});

const PatientsPayload = z.object({
    ...PatientPayload,
    birthDate: z.string({ message: 'please mention the patient birth date' }).optional(),
    country: z.string({ message: 'please mention the patient country' }).optional(),
});

export const PatientsSchema = z.object({
    patients: z
        .array(PatientsPayload, { message: 'please select json or csv' })
        .min(1, { message: 'Please provide at least one patient' }),
});
export const MedicationSchema = z.object({
    name: z
        .string()
        .max(30, 'max characters is 30')
        .refine(value => value !== '', {
            message: 'please write the medication name',
        }),
    generic_name: z
        .string()
        .max(30, 'max characters is 30')
        .refine(value => value !== '', {
            message: 'please write the generic name',
        }),
    description: z.string().optional(),
    form: z.enum(medicationForms, { message: 'please select a medication form' }),
    strength: z.enum(medicationStrengths, {
        message: 'please select a medication strength',
    }),
    route: z.enum(medicationRoutes, {
        message: 'please select a medication route',
    }),
    manufacturer: z.string().optional(),
    supplier: z.string().optional(),
    batch_number: z.string().optional(),
    storage_conditions: z.string().optional(),
    expiryDate: z.string().optional(),
    drug_category: z.enum(medicationCategories, {
        message: 'please select a medication category',
    }),
    price: z.coerce
        .number({ message: 'please write down a price' })
        .min(1, { message: 'min price is 1' })
        .max(9999, { message: 'max price is 9999' }),
    stock_quantity: z.coerce
        .number({ message: 'please write down a stock quantity' })
        .min(1, { message: 'min quantity is 1' })
        .max(9999, { message: 'max quantity is 9999' }),
});

export const MedicationsSchema = z.object({
    medications: z
        .array(MedicationSchema, { message: 'please select json or csv' })
        .min(1, { message: 'Please provide at least one patient' }),
});

export const AccountSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    weight: z.string().optional(),
    height: z.string().optional(),
    gender: z.string().optional(),
});

export const CodeSchema = z.object({
    numbers: z.enum(firstNumber, { message: 'please select the first number' }),
    characters: z.enum(characters, { message: 'please select character' }),
    fiveNumbers: z.enum(FiveNumber, { message: 'please select the last number' }),
    expiration: z.enum(codeExpirationPlans, { message: 'please select a plan' }),
});

export const CodeDeletionSchema = z.object({
    code: z
        .string({ message: 'please write down the code' })
        .refine(code => code.match(/B(1|2)[0-5](C|D|E)[0-9]{5}/g), {
            message: 'invalid code',
        }),
});

export const SettingAuthentcationSchema = z
    .object({
        password: z.string().min(1, { message: 'current password is required' }),
        newPassword: z
            .string({ message: 'enter new password' })
            .min(8, 'Password must be at least 8 characters long')
            .refine(value => /[a-z]/.test(value), {
                message: 'Password must contain at least one lowercase letter',
            })
            .refine(value => /[A-Z]/.test(value), {
                message: 'Password must contain at least one uppercase letter',
            })
            .refine(value => /\d/.test(value), {
                message: 'Password must contain at least one number',
            })
            .refine(value => /[@$!%*?&]/.test(value), {
                message: 'Password must contain at least one special character (@$!%*?&)',
            }),
        newPasswordConfirm: z.string({ message: 'new password confirm required' }),
    })
    .refine(data => data.newPassword === data.newPasswordConfirm, {
        message: 'new passwords must match',
        path: ['newPasswordConfirm'],
    });

export const ResetPasswordNewSchema = z
    .object({
        newPassword: z
            .string({ message: 'enter new password' })
            .min(8, 'Password must be at least 8 characters long')
            .refine(value => /[a-z]/.test(value), {
                message: 'Password must contain at least one lowercase letter',
            })
            .refine(value => /[A-Z]/.test(value), {
                message: 'Password must contain at least one uppercase letter',
            })
            .refine(value => /\d/.test(value), {
                message: 'Password must contain at least one number',
            })
            .refine(value => /[@$!%*?&]/.test(value), {
                message: 'Password must contain at least one special character (@$!%*?&)',
            }),
        newPasswordConfirm: z.string({ message: 'new password confirm required' }),
    })
    .refine(data => data.newPassword === data.newPasswordConfirm, {
        message: 'new passwords must match',
        path: ['newPasswordConfirm'],
    });

export const ResetPasswordSchema = z.object({
    email: z.string({ message: 'email is required' }).email({ message: 'invalid email supported' }),
    id: z.string().optional(),
});

export const ConfirmEmailChangeSchema = z.object({
    otp: z.string({ message: 'otp is required' }).min(8, 'otp is required'),
});

export const profilePictureSchema = z.object({
    profilePicture: z
        .custom<File[]>(files => files && files.length > 0, {
            message: 'Please select an image',
        })
        .refine(
            files =>
                files.every(file => {
                    const fileName = file.name.toLowerCase();
                    const extension = fileName.split('.').pop();
                    return validImageExtensions.includes(extension || '');
                }),
            { message: 'Invalid image extension' }
        ),
});

export const VerifyOtp = z.object({
    otp: z.string({ message: 'otp is required' }).min(8, 'otp is required'),
});
