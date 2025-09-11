import App from '@/app';
import UserService from '@/services/user.service';
import NotificationService from '@/services/notifications.service';
import { RedisConnection, RedisServices } from './redis';
import { DFTOKENTTL } from '@/config';
import { logger } from './logger';
import cron from 'node-cron';
import { deleteImage } from './getPresignedUrl';
import CodeService from '@/services/code.service';
import { EmailSubjects, Invoker, SendEmail } from './emailUtils';

/**
 * This function checks for unverified users and sends them an email alert
 * to verify their email addresses. It runs daily at 7 AM.
 */

class SystemBackEvents {
    private userService: UserService;
    private codeService: CodeService;
    private RedisService: RedisServices;
    private notificationService: NotificationService;
    private emailInvoker: Invoker;
    constructor() {
        this.userService = new UserService();
        this.codeService = new CodeService();
        this.RedisService = new RedisServices(RedisConnection.getInstance().getClient());
        this.notificationService = new NotificationService();
        this.emailInvoker = new Invoker();
    }

    public AlertUnVerifiedUsersRotation = async () => {
        try {
            const unVerifiedUsers = await this.userService.getAllUsers({ verified: false });
            const initiator = App.initiator;

            if (!unVerifiedUsers || unVerifiedUsers.length < 1) return;

            for (const user of unVerifiedUsers) {
                const notification = this.notificationService.systemNotifications(
                    'emailVerification',
                    user
                );

                const createdNotification = await this.notificationService.createNotification({
                    ...notification,
                    user: user._id,
                    assignedBy: 'system',
                });

                if (!createdNotification) {
                    throw new Error('error creating a notification');
                }

                initiator.emit(`EmailVerification${user._id}`, createdNotification);

                this.emailInvoker.add_invoker(
                    new SendEmail({
                        to: user.email,
                        health: 'health',
                        year: new Date().getFullYear(),
                        templateName: 'emailVerificationAlert.hbs',
                        subject: EmailSubjects.EMAIL_VERIFICATION_ALERT,
                    })
                );

                const HashName = `emailVerificationAlert:${user._id}`;

                await this.RedisService.createHash({
                    HashName,
                    content: { lastemail: new Date().toISOString() },
                    expire: parseInt(DFTOKENTTL as string) * 24,
                });
            }
             this.emailInvoker.run();
            logger.info('Alert emails has been sent successfully');
        } catch (error: any) {
            logger.error(error.message);
            throw new Error(error.message);
        }
    };
    public deleteUmverifiedUsers = async () => {
        try {
            const unverified = await this.userService.getAllUsers({ verified: false });

            if (!unverified || unverified.length < 1) {
                throw new Error('no unverified users found');
            }

            for (const user of unverified) {
                const HashName = `emailVerificationAlert:${user._id}`;

                const lastEmail = await this.RedisService.checkHash(HashName, 'lastemail');

                if (!lastEmail) {
                    throw new Error('User is still within the warning phase');
                }

                this.emailInvoker.add_invoker(
                    new SendEmail({
                        to: user.email,
                        templateName: 'emailDeletion.hbs',
                        health: 'healthcare',
                        year: new Date().getFullYear(),
                        subject: EmailSubjects.EMAIL_DELETION,
                    })
                );

                await deleteImage(user.profileImg?.path);

                await this.codeService.deleteCode({ user: user._id });

                await this.userService.deleteUser({ _id: user._id });

                await this.RedisService.DelHash(HashName, 'lastemail');
            }
             this.emailInvoker.run();
        } catch (error: any) {
            logger.error(error.message);
            throw new Error(error.message);
        }
    };
}

const systemEvents = new SystemBackEvents();
// Schedule the AlertUnVerifiedUsersRotation function to run every day at 7 AM

cron.schedule('0 7 * * *', systemEvents.AlertUnVerifiedUsersRotation); // Runs every day at 7 AM

/**
 * This function deletes unverified users after a certain period of time
 * if they have not verified their email addresses. It runs weekly on Sundays at 8 AM.
 */

// Schedule the deleteUmverifiedUsers function to run once every week at 8 AM

cron.schedule('0 8 * * 0', systemEvents.deleteUmverifiedUsers); // Runs every Sunday at 8 AM
