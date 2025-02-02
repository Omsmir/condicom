import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../db/firebase/firebase.js";
import dotenv from "dotenv";
import { Notifications } from "../db/schema/notification.js";
import { io } from "../server.js";
import { PatientModel } from "../db/schema/patient.js";
import mongoose from "mongoose"
export const createPatient = async (req, res, next) => {
  const {
    userId,
    firstName,
    lastName,
    gender,
    birthDate,
    phone,
    bloodType,
    country,
    height,
    weight,
    email,
    emergencyContactPerson,
    emergencyContactRelationship,
    emergencyContactNumber,
    residentialAddress,
    insuranceProvider,
    medicalConditions,
    allergies,
    pastSurgeries,
    familyMedicalHistory,
    currentMedications,
    smoking,
    smokingFrequency,
    alcohol,
    alcoholFrequency,
  } = req.body;
  const profileImg = req.file;
  const requiredInformation = {
    firstName,
    lastName,
    gender,
    birthDate,
    phone,
    bloodType,
    country,
    emergencyContactNumber,
    medicalConditions,
    allergies,
    currentMedications,
    smoking,
    alcohol
  };
  const optionalInformation = {
    height,
    weight,
    email,
    emergencyContactPerson,
    emergencyContactRelationship,
    residentialAddress,
    insuranceProvider,
    pastSurgeries,
    familyMedicalHistory,
    smokingFrequency,
    alcoholFrequency,
  };
  let Patient = {};

  try {
    for (const [key, value] of Object.entries(requiredInformation)) {
      if (!value) {
        return res.status(404).json({ message: `${key} is required` });
      }
      Patient[key] = value;
    }

    for (const [key, value] of Object.entries(optionalInformation)) {
      if (value) {
        Patient[key] = value;
      }
    }
    if (profileImg) {
      const StorageBucket = ref(
        storage,
        `patients/${firstName}-${lastName}/${Date.now()}`
      );

      const snapShot = await uploadBytes(StorageBucket, profileImg.buffer, {
        contentType: profileImg.mimetype,
      });

      const downloadUrl = await getDownloadURL(snapShot.ref);

      Patient.profileImg = {
        url: downloadUrl,
        filename: profileImg.originalname,
        path: StorageBucket.fullPath,
      };
    }

    const newPatient = new PatientModel(Patient);

    await newPatient.save();

    const updatePatient =  await PatientModel.findByIdAndUpdate(
      newPatient._id,
      { $addToSet: { assignedBy: userId } },
      { new: true, runValidators: true }
    );

    return res.status(201).json({
      patient: updatePatient,
      message: "New Patient Created Successfully",
    });
  } catch (error) {
    next(error);

    return res.status(500).json({ message: error.message });
  }
};

export const GetPatients = async (req, res, next) => {
  const Patients = await PatientModel.find({});
  try {
    if (!Patients) {
      return res.status(404).json({ message: "No Patients Exists" });
    }

    if (Patients.length === 0) {
      return res.status(200).json({ Patients, message: "No Patients" });
    }

    console.log(Patients.length);
    return res.status(200).json({ Patients, message: "Success" });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: error.message });
  }
};


export const getSpecificPatient = async(req,res,next)=> {
  const {id} = req.params
  try {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message:"patientId is not a valid mongooseId"})
    }
    const existingPatient = await PatientModel.findOne({_id:id})

  } catch (error) {
    
  }
}

export const deleteImage = async (filePath) => {
  try {
    if (!filePath) return;
    const fileRef = ref(storage, filePath);

    await deleteObject(fileRef);
  } catch (error) {
    console.log(error.message);
  }
};

export const DeletePatient = async (req, res, next) => {
  const { id } = req.params;
  const existingPatient = await PatientModel.findOne({ _id: id });
  try {
    if (!existingPatient) {
      return res
        .status(404)
        .json({ message: `Patient with id: ${id} doesn't exist` });
    }

    await deleteImage(existingPatient?.profileImg?.path);


    await existingPatient.deleteOne()


    return res.status(201).json({message:"Patient Deleted Successfully"})
  }
  catch(error){
    console.log(error)
  }
}