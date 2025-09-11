import crypto from 'crypto';
import { MedicalStuffRegex } from '@/utils/constants';
import { UserDocument } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import { SALTWORKFACTOR } from 'config';
import { codeProps, GenerateOtpProps } from '@/interfaces/global.interface';

import { isSameDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const IsSameDayWithTimeZone = ({
    startDate,
    endDate,
}: {
    startDate: Date;
    endDate: Date;
}): boolean => {
     const tz = 'Europe/Athens';

    return isSameDay(toZonedTime(startDate, tz), toZonedTime(endDate, tz));
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

export const assignedNotifications = (user: UserDocument): string => {
    return user.role === 'Admin' ? 'AdminOnly' : 'AdminsFromAll';
};

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
