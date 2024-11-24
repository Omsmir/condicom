import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone:{type:String,required:true},
  birthDate:{type:String,required:true},
  gender:{type:String,required:true},
  role: { type: String,required:true },
  code:{type:String}
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
