import mongoose from "mongoose"


const medicationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    generic_name:{type:String,required:true},
    description:{type:String},

})