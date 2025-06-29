import { z } from 'zod';

export const SessionSchema = z.object({
    body: z.object({
        email: z.string({ message: 'email is required' }),
        password: z.string({ message: 'password is required' }),
    }),
});

const params = {
    params: z.object({
        id: z.string({ message: 'id is required' }),
    }),
};

export const logOutSchema = z.object({
    ...params,
});
const CheckOtpPayload = {
    body: z.object({
        otp: z.string({ message: 'otp is required' }),
    }),
};

export const CheckOtpSchema = z.object({ ...params, ...CheckOtpPayload });

export type SessionSchemaInterface = z.infer<typeof SessionSchema>;
export type CheckOtpSchemaInterface = z.infer<typeof CheckOtpSchema>;
export type LogOutSchemaInterface = z.infer<typeof logOutSchema>;
