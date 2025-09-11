import { APP_PASSWORD, PROJECT_NAME, SMTP_USER } from '@/config';
import { sendEmailProps } from '@/interfaces/global.interface';
import { createTransport, Transporter } from 'nodemailer';
import { logger } from './logger';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface Command {
    execute: () => Promise<boolean | undefined>;
}

export class Invoker {
    private queue: Command[];
    constructor() {
        this.queue = [];
    }

    public add_invoker(command: Command) {
        this.queue.push(command);
    }

    public run = () => {
        for (const cmd of this.queue) {
            cmd.execute();
        }
        this.queue = [];
    };

    public get_queue() {
        return this.queue;
    }
}

export class SendEmail implements Command {
    constructor(private EmailProps: sendEmailProps) {}

    private transport = async (): Promise<
        Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> | undefined
    > => {
        try {
            const transport = createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: SMTP_USER,
                    pass: APP_PASSWORD,
                },
            });
            return transport;
        } catch (error: any) {
            logger.error(error.message);
        }
    };

    private renderTemplate = (templateName: string, context: object) => {
        const filePath = path.resolve(__dirname, `../templates/${templateName}`);
        const source = fs.readFileSync(filePath, 'utf-8');
        const template = Handlebars.compile(source);
        return template(context);
    };

    public execute = async (): Promise<boolean | undefined> => {
        try {
            const from = PROJECT_NAME || 'health';
            const subject = this.EmailProps.subject;

            const html = this.renderTemplate(`${this.EmailProps.templateName}`, {
                to: this.EmailProps.to,
                link: this.EmailProps.link,
                health: this.EmailProps.health,
                year: this.EmailProps.year,
                date: this.EmailProps.date,
                otp: this.EmailProps.otp,
            });

            const transport = await this.transport();

            if (!transport) {
                logger.error('Transporter could not be created');

                return;
            }

            await transport.sendMail({ from, subject, to: this.EmailProps.to, html });

            logger.info(`email have been successfully sent to:${this.EmailProps.to}`);
            return true;
        } catch (error: any) {
            logger.error(`error sending email to: ${this.EmailProps.to}`, error.message);
        }
    };
}

export enum EmailSubjects {
    EMAIL_VERIFICATION_ALERT = `Alert Email Verification`,
    EMAIL_VERIFICATION = 'Email Verification',
    EMAIL_CHANGE = 'Email change',
    EMAIL_DELETION = 'Email Deletion',
    MFA_ENABLING = 'MFA - Auth Enabling',
    MFA_ENABLED = 'MFA - Step Enabled',
    MFA_STEP_OTP = 'MFA - Step Otp',
    PASSWORD_RESET = 'Password Reset',
}
