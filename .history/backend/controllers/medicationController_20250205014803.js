import { Medication } from "../db/schema/medication.js";



export const createMedication = async (req,res,next) => {
    const medication = req.body.medication
    try {
        
        return res.status(201).json({message: })
    } catch (error) {
        next(error)
        return res.status(500).json({message:error.message})
    }
}