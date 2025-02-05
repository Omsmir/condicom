import mongoose from "mongoose"
import { medicationForms } from "../../lib/constants"


const medicationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    generic_name:{type:String,required:true},
    description:{type:String},
    form:{type:String,enum:medicationForms,required:true},
    strength:{type:String,enum:medicationForms,required:true}
})