import mongoose, { Document } from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'
import log from "../utils/logger";
export interface UserInput {
  name: string;
  email: string;
  profileImg: {
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
  verified?: boolean;
  token?: string;
  expireToken?: Date;
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
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImg: {
      filename: { type: String, required: true },
      url: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
      path: { type: String, required: true },
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    birthDate: { type: String, required: true },
    gender: { type: String, required: true },
    role: { type: String, required: true },
    profileState: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    token: { type: String },
    expireToken: { type: Date },
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

userSchema.pre("save", async function(next){
    const user = this as UserDocument
    if(!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))

        const hash =  bcrypt.hashSync(user.password,salt)

        user.password = hash
    } catch (error:any) {
        log.error(error.message)
        return  next(error)
    }
})

userSchema.methods.comparePassword = async (candidi) => {

}
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
