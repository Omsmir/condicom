import mongoose, { Document } from 'mongoose';
import bcryptjs from 'bcryptjs';
import config, { SALTWORKFACTOR } from 'config';
import log from '../utils/logger';
export interface UserInput {
    name: string;
    email: string;
    profileImg?: {
        filename: string;
        url: string;
        uploadedAt?: Date;
        path: string;
    };
    password: string;
    phone: string;
    birthDate: string;
    gender: string;
    role: string;
    profileState?: boolean;
    mfa_state?: boolean;
    verified?: boolean;
    bio?: string;
    weight?: string;
    height?: string;
    address?: string;
    occupation?: string;
    country?: string;
    code?: string;
}

export interface UserDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
    passwordUpdatedAt: Date;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        profileImg: {
            filename: { type: String },
            url: { type: String },
            uploadedAt: { type: Date, default: Date.now },
            path: { type: String },
        },
        password: {
            type: String,
            required: true,
        },
        passwordUpdatedAt: { type: Date, default: Date.now },
        phone: { type: String, required: true },
        birthDate: { type: String, required: true },
        gender: { type: String, required: true },
        role: { type: String, required: true },
        profileState: { type: Boolean, default: false },
        mfa_state: { type: Boolean, default: false },
        verified: { type: Boolean, default: false },
        bio: { type: String },
        weight: { type: String },
        height: { type: String },
        address: { type: String },
        occupation: { type: String },
        country: { type: String },
        code: { type: String },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this as UserDocument;

    if (user.isModified('password')) {
        user.passwordUpdatedAt = new Date();

        try {
            const salt = await bcryptjs.genSalt(parseInt(SALTWORKFACTOR as string));
            const hash = bcryptjs.hashSync(user.password, salt);
            user.password = hash;
        } catch (error: any) {
            log.error(error.message);
            return next(error);
        }
    }

    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcryptjs.compare(candidatePassword, user.password).catch(e => false);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
