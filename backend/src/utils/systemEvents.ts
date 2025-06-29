import App from '@/app';
import { deleteUser, getAllUsers } from '@/services/user.service';
import { sendEmail, systemNotifications } from './backevents';
import { createNotification } from '@/services/notifications.service';
import { checkHash, createHash, DelHash } from './redis';
import { DFTOKENTTL } from '@/config';
import { logger } from './logger';
import cron from 'node-cron';
import { deleteImage } from './getPresignedUrl';
import { deleteCode } from '@/services/code.service';

/**
 * This function checks for unverified users and sends them an email alert
 * to verify their email addresses. It runs daily at 7 AM.
 */
const AlertUnVerifiedUsersRotation = async () => {
    try {
        const unVerifiedUsers = await getAllUsers({ verified: false });
        const initiator = App.initiator;

        if (!unVerifiedUsers || unVerifiedUsers.length < 1) return;

        unVerifiedUsers.map(async user => {
            const notification = systemNotifications('emailVerification', user);

            const createdNotification = await createNotification({
                ...notification,
                user: user._id,
                assignedBy: 'system',
            });

            if (!createdNotification) {
                throw new Error('error creating a notification');
            }

            initiator.emit(`EmailVerification${user._id}`, createdNotification);

            await sendEmail({
                to: user.email,
                health: 'health',
                year: new Date().getFullYear(),
                templateName: 'emailVerificationAlert.hbs',
            });

            const HashName = `emailVerificationAlert:${user._id}`;

            await createHash({
                HashName,
                content: { lastemail: new Date().toISOString() },
                expire: parseInt(DFTOKENTTL as string) * 24,
            });
        });
        logger.info('Alert emails has been sent successfully');
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
};

// Schedule the AlertUnVerifiedUsersRotation function to run every day at 7 AM

cron.schedule('0 7 * * *', AlertUnVerifiedUsersRotation); // Runs every day at 7 AM

/**
 * This function deletes unverified users after a certain period of time
 * if they have not verified their email addresses. It runs weekly on Sundays at 8 AM.
 */
const deleteUmverifiedUsers = async () => {
    try {
        const unverified = await getAllUsers({ verified: false });

        if (!unverified || unverified.length < 1) {
            throw new Error('no unverified users found');
        }

        for (let user of unverified) {
            const HashName = `emailVerificationAlert:${user._id}`;

            const lastEmail = await checkHash(HashName, 'lastemail');

            if (!lastEmail) {
                throw new Error('User is still within the warning phase');
            }

            await sendEmail({
                to: user.email,
                templateName: 'emailDeletion.hbs',
                health: 'healthcare',
                year: new Date().getFullYear(),
            });

            await deleteImage(user.profileImg?.path);

            await deleteCode({ user: user._id });

            await deleteUser({ _id: user._id });

            await DelHash(HashName, 'lastemail');
        }
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
};

// Schedule the deleteUmverifiedUsers function to run once every week at 8 AM

cron.schedule('0 8 * * 0', deleteUmverifiedUsers); // Runs every Sunday at 8 AM
