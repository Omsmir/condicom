import mongoose from "mongoose"
import { genders


const patientSchema = new mongoose.Schema({
    assignedBy:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
        default:[]
    },
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    profileImg:{
        filename:{type:String},
        url:{type:String},
        path:{type:String},
        uploadedAt:{type:Date,default:Date.now()},
    },
    gender: {type:String,enum:genders,required:true},
        height:{type: String},
        weight:{type: String},
        birthDate:{type: String,required:true},
        email:{type:String},
        phone:{type:String,required:true},
        bloodType:{type:String,required:true},
        country:{type:String,required:true},
        emergencyContactPerson:{type:String},
        emergencyContactRelationship:{type:String},
        emergencyContactNumber:{type:String,required:true},
        residentialAddress:{type:String},
        insuranceProvider:{type:String},
        medicalConditions:{type:String,required:true},
        allergies:{type:String,required:true},
        pastSurgeries:{type:String},
        familyMedicalHistory:{type:String},
        currentMedications:{type:String,required:true},
        smoking:{type:String,required:true},
        smokingFrequency:{type:String},
        alcohol:{type:String,required:true},
        AlcoholFrequency:{type:String},
        createdAt:{type:Date,default:Date.now()}
},{
    timestamps:true
})

export const PatientModel = mongoose.model("patients",patientSchema)