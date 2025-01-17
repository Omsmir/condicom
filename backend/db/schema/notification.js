import mongoose from 'mongoose';


const notifcationsSchema = new mongoose.Schema({
    type: {type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    assignedBy:{type:String},
    eventId:{type:String,default:""},
    assignedTo:{type:String},
    seen: {type:Boolean,default:false},
},{
    timestamps: true,
  
})


export const Notifications = mongoose.model('Notifications',notifcationsSchema) 