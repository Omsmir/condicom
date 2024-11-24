import express from "express";
import { deleteProduct, getAllProducts, getSpecificProduct, productCreation, SearchProductByName, updateProduct } from "../controllers/productController.js";
import multer from "multer";


const storage = multer.memoryStorage()

const upload = multer({storage}) 
const router = express.Router()


router.post("/",upload.array("image",10),productCreation)

router.delete("/:id",deleteProduct)

router.get("/",getAllProducts)

router.get("/:id",getSpecificProduct)

router.get("/:name",SearchProductByName)

router.put("/:id",upload.array("image",10),updateProduct)
export default router
