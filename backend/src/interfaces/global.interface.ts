export interface Notification {
    type: string;
    description: string;
    title: string;
    assignedTo: string;
    eventId?: string;
}

export interface codeProps {
    numbers: string[];
    fiveNumbers: string[];
    characters: string[];
}

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

export interface sendEmailProps {
    to: string;
    link?: string;
    templateName: string;
    health?: string;
    otp?: string;
    year?: string | number | Date;
    date?: string | number | Date;
}

export interface GenerateOtpProps {
    length: number;
    type: 'number' | 'string';
}
