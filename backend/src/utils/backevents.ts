import crypto from 'crypto';
import { NotificationModel } from '@/models/notifications.model';
import { MedicalStuffRegex } from '@/utils/constants';
import { UserDocument } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import { APP_PASSWORD, SALTWORKFACTOR, SMTP_USER } from 'config';
import { createTransport } from 'nodemailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { logger } from './logger';
interface Notification {
    type: string;
    description: string;
    title: string;
    assignedTo: string;
    eventId?: string;
}

// Function to get system notifications based on event type
export const systemNotifications = (
    title: 'newUserHasJoined' | 'emailVerification',
    user: UserDocument
): Notification => {
    const systemNotification: Record<string, Notification> = {
        newUserHasJoined: {
            type: 'New Member',
            description: `New Member (${user.name}) Has Joined Our Community`,
            title: 'System Administration',
            assignedTo: 'AdminOnly',
        },
        emailVerification: {
            type: 'Email Verification',
            description: 'A verification link has sent to your email please verify your email',
            title: 'System Administration',
            assignedTo: 'All',
            eventId: user._id as string,
        },
    };

    if (!systemNotification[title]) {
        throw new Error(`Invalid notification type: ${title}`);
    }

    return systemNotification[title];
};

export const generateRandomToken = ({
    bytes,
    type,
}: {
    bytes: number;
    type: BufferEncoding;
}): string => {
    return crypto.randomBytes(bytes).toString(`${type}`);
};

export const VerifyRandomTokenWithHash = ({ token }: { token: string }) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

export const getUserNotifications = async (user: UserDocument) => {
    let notifications: Notification[] = [];

    if (user.role === 'Admin') {
        notifications = await NotificationModel.find({
            createdAt: { $gt: user.createdAt },
            $or: [
                { assignedTo: 'All', eventId: user._id },
                { assignedTo: 'AdminOnly', user: { $ne: user._id } },
                { assignedTo: 'AdminsFromAll' },
            ],
        });
    } else if (user.role === 'Resident Doctor') {
        notifications = await NotificationModel.find({
            createdAt: { $gt: user.createdAt },
            $or: [{ assignedTo: 'All', eventId: user._id }],
        });
    }

    return notifications;
};

export const assignedNotifications = (user: UserDocument): string => {
    return user.role === 'Admin' ? 'AdminOnly' : 'AdminsFromAll';
};

interface codeProps {
    numbers: string[];
    fiveNumbers: string[];
    characters: string[];
}

export const generateCode = ({ numbers, fiveNumbers, characters }: codeProps) => {
    let code;
    const firstLetter = 'B';

    const lastFiveNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    code = firstLetter + numbers[Math.floor(Math.random() * numbers.length)];

    code += fiveNumbers[Math.floor(Math.random() * fiveNumbers.length)];

    code += characters[Math.floor(Math.random() * characters.length)];

    for (let i = 5; i < lastFiveNumbers.length; i++) {
        code += lastFiveNumbers[Math.floor(Math.random() * lastFiveNumbers.length)];
    }
    return code;
};

export interface role {
    role:
        | 'Admin'
        | 'Senior Consultant'
        | 'Resident Doctor'
        | 'Intern Doctor'
        | 'Head Secretary'
        | 'Charge Secretary'
        | 'Head Nurse'
        | 'Charge Nurse';
}

export const signRole = (code: string): string => {
    let role = '';
    MedicalStuffRegex.map(prefix => {
        if (prefix.regex.test(code)) {
            role = prefix.role;
        }
    });

    return role;
};

const plans: Record<string, number> = {
    month: 30,
    '3month': 90,
    '6month': 180,
    '1year': 365,
};

export const generateExpirationDate = ({ month }: { month: string }) => {
    const days = plans[month];

    if (!days) throw new Error('Invalid plan');

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    return expirationDate;
};

export const detectExpiredCode = ({ expiration }: { expiration: Date }) => {
    if (new Date(expiration) < new Date()) return true;

    return false;
};

export const hashPassword = async ({ password }: { password: string }) => {
    const salt = await bcryptjs.genSalt(parseInt(SALTWORKFACTOR as string) as number);

    const hash = bcryptjs.hashSync(password, salt);

    return hash;
};

interface sendEmailProps {
    to: string;
    link?: string;
    templateName: string;
    health?: string;
    otp?: string;
    year?: string | number | Date;
    date?: string | number | Date;
}

export const sendEmail = async ({
    to,
    link,
    templateName,
    health,
    year,
    date,
    otp,
}: sendEmailProps) => {
    try {
        const transport = createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: SMTP_USER,
                pass: APP_PASSWORD,
            },
        });
        const from = 'HealthCare';
        const subject = 'HealthCare Email Verification';

        const html = renderTemplate(`${templateName}`, {
            to,
            link,
            health,
            year,
            date,
            otp,
        });
        await transport.sendMail({ from, subject, to, html });

        logger.info(`Email sent to ${to} with template ${templateName}`);
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

export const renderTemplate = (templateName: string, context: object) => {
    const filePath = path.resolve(__dirname, `../templates/${templateName}`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const template = Handlebars.compile(source);
    return template(context);
};

type GenerateOtpProps = {
    length: number;
    type: 'number' | 'string';
};

export const generateOtp = ({ length, type }: GenerateOtpProps) => {
    let otp = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    switch (type) {
        case 'number':
            for (let i = 0; i < length; i++) {
                otp += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
            break;
        case 'string':
            for (let i = 0; i < length; i++) {
                otp += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            break;
        default:
            throw new Error("Invalid type. Type should be either 'number' or 'string'.");
    }
    return otp;
};
