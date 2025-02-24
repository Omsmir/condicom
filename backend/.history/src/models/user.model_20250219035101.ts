import mongoose from "mongoose";


export interface userInput
 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImg:{
      filename: { type: String,},
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
    token: { type: String,default:null},
    expireToken:{type:Date,default:null},
    bio:{type:String,default:null},
    weight: { type:String},
    height: { type: String},
    address:{type:String,default:null},
    occupation:{type:String},
    country: { type:String},
    code:{type:String},
    createdAt:{type:Date,default:Date.now()},
  },{
    timestamps: true,
  
  })