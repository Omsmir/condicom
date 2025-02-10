import { Medication } from "../db/schema/medication.js";

export const createMedication = async (req, res, next) => {
  const medication = req.body.medication;
  const requiredInformation = {
    generic_name: medication.generic_name,
    name: medication.name,
    form: medication.form,
    strength: medication.strength,
    route: medication.route,
    drug_category: medication.drug_category,
    expiryDate: medication.expiryDate,
    price: medication.price,
    stock_quantity: medication.stock_quantity,
  };
  const optionalInformation = {
    storage_conditions: medication.storage_conditions,
    description: medication.description,
    manufacturer: medication.manufacturer,
    supplier: medication.supplier,
    batch_number: medication.batch_number,
  };
  const newMedication = {};

  const existedMedication = await Medication.findOne({ name: medication.name,strength:medication.strength });
  try {
    if (existedMedication) {
      if (requiredInformation.hasOwnProperty("stock_quantity")) {
        existedMedication.stock_quantity =
          Number(existedMedication.stock_quantity) +
          Number(medication.stock_quantity);
      }
    
      for (const [key, value] of Object.entries(requiredInformation)) {
        if (key !== "stock_quantity") {
          existedMedication[key] = value;
        }
      }
    
      for (const [key, value] of Object.entries(optionalInformation)) {
        if (value) existedMedication[key] = value;
      }
    
      await existedMedication.save();
      return res.status(201).json({ medication:existedMedication,message: "Quantity added successfully" });
    }
    
    for (const [key, value] of Object.entries(requiredInformation)) {
      if (!value) {
        return res.status(404).json({ message: `${key} is missing` });
      }
      newMedication[key] = value;
    }
    for (const [key, value] of Object.entries(optionalInformation)) {
      if (value) newMedication[key] = value;
    }

    const createdMedication = new Medication(newMedication);

    await createdMedication.save();
    return res.status(201).json({
      medication: createdMedication,
      message: "medication Added successfully",
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllMedications = async (req, res, next) => {
  try {
    const medications = await Medication.find({});

    if (!medications) {
      return res.status(404).json({ message: "no medications exists" });
    }

    return res.status(200).json({ medications, message: "success" });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: error.message });
  }
};



export const GetSpecificMedication = async (req,res,next) => {
  const {id} = req.params
  try {
    const existingMedication = await Medication.findOne({_id:id})
    if(!existingMedication){
      return res.status(404).json({message:"medication doesn't exists"})
    }

    return res.status(200).json({message:"success"})
  } catch (error) {
    
  }
}