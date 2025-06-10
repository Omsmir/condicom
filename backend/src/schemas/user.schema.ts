import { profile } from 'console';
import z from 'zod';

const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

const firstPayload = {
    body: z
        .object({
            name: z.string({ required_error: 'Name is required' }),
            email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
            password: z
                .string({ required_error: 'Password is required' })
                .min(6, 'Password must be at least 6 characters'),
            confirmPassword: z.string({
                required_error: 'confirm password is required',
            }),
            phone: z.string({ required_error: 'Phone number is required' }),
            birthDate: z.string({ required_error: 'Birthdate is required' }),
            gender: z.string({ required_error: 'Gender is required' }),

            code: z.string({ required_error: 'please support a code' }),
        })
        .refine(data => data.password === data.confirmPassword, {
            message: 'passwords must match',
            path: ['confirmPassword'],
        }),
};

const secondPayload = {
    body: z.object({
        bio: z.string().optional(),
        weight: z.string({ message: 'please select a weight' }),
        height: z.string({ message: 'please select a height' }),
        address: z.string().optional(),
        occupation: z.string({ message: 'please select an occupation' }),
        country: z.string({ message: 'please select a country' }),
    }),
    file: z.object({
        profileImg: z
            .custom<Express.Multer.File | undefined>(file => file !== undefined && file !== null, {
                message: 'please select a profile picture',
            })
            .refine(
                file => {
                    if (!file) return false;
                    const fileName = file.originalname.toLowerCase();
                    const extension = fileName.split('.').pop();
                    return validImageExtensions.includes(extension || '');
                },
                { message: 'Invalid image extension' }
            ),
    }),
};

const ChangePayload = {
    body: z.object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        gender: z.string().optional(),
        height: z.string().optional(),
        weight: z.string().optional(),
    }),
};
const ChangePasswordPayload = {
    body: z
        .object({
            password: z.string().min(1, { message: 'please write the old password' }),
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
            newPasswordConfirm: z.string({
                message: 'new password confirm required',
            }),
        })
        .refine(data => data.newPassword === data.newPasswordConfirm, {
            message: 'new passwords must match',
            path: ['newPasswordConfirm'],
        }),
};

const ResetPasswordPayload = {
    body: z.object({
        email: z
            .string({ message: 'email is required' })
            .email({ message: 'invalid email supported' }),
        id: z.string().optional(),
    }),
};

const ChangeEmailPayload = {
    body: z.object({
        email: z
            .string({ message: 'email is required' })
            .email({ message: 'invalid email supported' }),
    }),
};
const ResetPasswordNewPayload = {
    body: z
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
            newPasswordConfirm: z.string({
                message: 'new password confirm required',
            }),
        })
        .refine(data => data.newPassword === data.newPasswordConfirm, {
            message: 'new passwords must match',
            path: ['newPasswordConfirm'],
        }),
};

const CheckTokenExistancePayload = {
    params: z.object({
        token: z.string({ message: 'token is required' }),
    }),
};
const CheckTokenExistancePayload2 = {
    params: z.object({
        token: z.string({ message: 'token is required' }),
        hashname: z.string({ message: 'hashname is required' }),
    }),
};
const CheckOtpPayload = {
    body: z.object({
        otp: z.string({ message: 'otp is required' }),
    }),
};
const ChangeProfilePicturePayload = {
    file: z.object({
        profileImg: z
            .custom<Express.Multer.File | undefined>(file => file !== undefined && file !== null, {
                message: 'please select a profile picture',
            })
            .refine(
                file => {
                    if (!file) return false;
                    const fileName = file.originalname.toLowerCase();
                    const extension = fileName.split('.').pop();
                    return validImageExtensions.includes(extension || '');
                },
                { message: 'Invalid image extension' }
            ),
    }),
};
const params = {
    params: z.object({
        id: z.string({ message: 'id is required' }),
    }),
};

export const CreateUserSchema = z.object({
    ...firstPayload,
});

export const AddAdditionalSchema = z.object({
    ...params,
    ...secondPayload,
});

export const UpdateUserSchema = z.object({
    ...params,
    ...ChangePayload,
});

export const ChangePasswordSchema = z.object({
    ...params,
    ...ChangePasswordPayload,
});

export const ResetPasswordSchema = z.object({
    ...ResetPasswordPayload,
});

export const CheckTokenExistanceSchema = z.object({
    ...CheckTokenExistancePayload2,
});
export const ResetPasswordNewSchema = z.object({
    ...CheckTokenExistancePayload,
    ...ResetPasswordNewPayload,
});

export const ChangeEmailSchema = z.object({
    ...params,
    ...ChangeEmailPayload,
});

export const CheckOtpSchema = z.object({
    ...params,
    ...CheckOtpPayload,
});

export const ChangeProfilePictureSchema = z.object({
    ...params,
    ...ChangeProfilePicturePayload,
});

export const SendEmailVerificationSchema = z.object({
    ...params,
});

export type CreateUserInterface = z.infer<typeof CreateUserSchema>;
export type AddAdditionalInterface = z.infer<typeof AddAdditionalSchema>;
export type ChangeUserInterface = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordInterface = z.infer<typeof ChangePasswordSchema>;
export type ResetPasswordInterface = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordNewInterface = z.infer<typeof ResetPasswordNewSchema>;
export type CheckTokenExistanceInterface = z.infer<typeof CheckTokenExistanceSchema>;
export type ChangeEmailInterface = z.infer<typeof ChangeEmailSchema>;
export type CheckOtpInterface = z.infer<typeof CheckOtpSchema>;
export type ChangeProfilePictureInterface = z.infer<typeof ChangeProfilePictureSchema>;
export type SendEmailVerificationInterface = z.infer<typeof SendEmailVerificationSchema>;
