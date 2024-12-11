import mongoose from "mongoose";
import bcrypt from "bcryptjs";

 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImg:{
    filename: { type: String,},
    contentType: { type: String, },
    url: { type: String, },
    uploadedAt:{type:Date,default:Date.now()},
    path:{type: String},
  },
  password: { type: String, required: true },
  phone:{type:String,required:true},
  birthDate:{type:String,required:true},
  gender:{type:String,required:true},
  role: { type: String,required:true },
  profileState:{type:Boolean,default:false},
  verified: { type:Boolean,default:false},
  bio:{type:String},
  weight: { type:String},
  height: { type: String},
  address:{type:String},
  occupation:{type:String},
  country: { type:String},
  code:{type:String},
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10)

      this.password = await bcrypt.hash(this.password,salt)

      next()
    } catch (error) {
      next(error)
    }
  });


  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
export const User = mongoose.model("user", userSchema);
