import { Medication } from "../db/schema/medication.js";



export const createMedication = async (req,res,next) => {
    const medication = req.body.medication
    const requiredInformation = {
        name:medication.name,
        generic_name:medication.generic_name,
        form:medication.form,
        
    }
    try {
        if(!medication.name){
            return  res.status(404).json({message:"some fields are missing"})
        }
        return res.status(201).json({message: "medication Added successfully"})
    } catch (error) {
        next(error)
        return res.status(500).json({message:error.message})
    }
}