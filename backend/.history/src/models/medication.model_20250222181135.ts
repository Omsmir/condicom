import mongoose from "mongoose"
import { medicationCategories, medicationForms, medicationRoutes, medicationStrengths } from "../../lib/constants.js"


const medicationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    generic_name:{type:String,required:true},
    description:{type:String},
    form:{type:String,enum:medicationForms,required:true},
    strength:{type:String,enum:medicationStrengths,required:true},
    route:{type:String,enum:medicationRoutes,required:true},
    drug_category:{type:String,enum:medicationCategories,required:true},
    manufacturer:{type:String},
    supplier:{type:String},
    batch_number:{type:String},
    storage_conditions:{type:String},
    expiryDate:{type:Date,required:true},
    price:{type:Number,required:true},
    stock_quantity:{type:Number,required:true}
},{
    timestamps:true
})


export const Medication = mongoose.model("medications",medicationSchema)