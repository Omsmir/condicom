import z from 'zod';

const payload = {
    body: z.object({
        type: z.string({ message: 'Type is required' }),
        title: z.string({ message: 'Title is required' }),
        description: z.string({ message: 'Description is required' }),
        assignedBy: z.string({ message: 'assigned by is required' }),
        eventId: z.string().optional(),
        user: z.string({ message: 'user is required' }),
    }),
};

const updatePayload = {
    body: z.object({
        seen: z.boolean({ message: 'state is required' }),
        notificationId: z.string({ message: 'notificationId is required' }),
    }),
};
const params = {
    params: z.object({
        id: z.string({ message: 'id is required' }),
    }),
};

export const notificationSchema = z.object({
    ...payload,
});

export const getNotificationSchema = z.object({
    ...params,
});

export const updateNotificationSchema = z.object({
    ...params,
    ...updatePayload,
});
export type notificationSchemaInterface = z.infer<typeof notificationSchema>;
export type GetnotificationSchemaInterface = z.infer<typeof getNotificationSchema>;
export type updateNotificationSchemaInterface = z.infer<typeof updateNotificationSchema>;
