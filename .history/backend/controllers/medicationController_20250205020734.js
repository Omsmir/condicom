import { Medication } from "../db/schema/medication.js";

export const createMedication = async (req, res, next) => {
  const medication = req.body.medication;
  const requiredInformation = {
    name: medication.name,
    generic_name: medication.generic_name,
    form: medication.form,
    strength: medication.strength,
    route: medication.route,
    drug_category: medication.drug_category,
    expiryDate: medication.expiryDate,
    price: medication.price,
    stock_Quantity: medication.stock_Quantity,
  };
  const optionalInformation = {
    storage_conditions: medication.storage_conditions,
    description: medication.description,
    manufacturer: medication.manufacturer,
    supplier:medication.supplier,
    batch_number:medication.batch_number
  };
  const newMedication = {}
  try {
    for(const [key,value] of Object.entries(requiredInformation)){
        if(!value){
            return res.status(404).json({message:`${key} is missing`})
        }
        newMedication[key] = value
    }
    for(const [key,value] of Object.entries(optionalInformation)){
        if(value)  newMedication[key] = value
    }

    const createdMedication =   Medication.create(newMedication)

    await createMedication.sa
    return res.status(201).json({ message: "medication Added successfully" });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: error.message });
  }
};
