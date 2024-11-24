import mongoose from "mongoose";


 const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt:{type:Date,default:Date.now()},
  path:{type: String,required:true},
  ThumbnailImage:{type:Boolean,required:true}
});
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description:{type:String,required:true},
    image: [imageSchema]
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
