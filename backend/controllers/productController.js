import { Product } from "../db/schema/products.js";
import { storage } from "../db/firebase/firebase.js";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
// @desc POST REQUEST

// export const uploadImage = async (req, res, next) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
//     const newImage = new Image({
//       filename: file.originalname,
//       contentType: file.mimetype,
//       data: file.buffer,
//     });

//     await newImage.save();

//     return res.status(201).json({
//       message: "Image uploaded successfully",
//       imageId: newImage._id,
//     });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

async function deleteImageFromFirebase(imageUrl) {
  try {
    // Extract the file path from the URL
    const decodedUrl = decodeURIComponent(imageUrl);
    console.log(decodedUrl);
    const path = decodedUrl.split("/o/")[1].split("/")[0]; // Extracts the path from the URL

    console.log(path);
    // Create a reference to the file to delete
    const folderPath = ref(storage, path);

    // Delete the file
    const imagesInsideTheFolder = await listAll(folderPath);

    const deleteAll = imagesInsideTheFolder.items.map((fileRef) => {
      deleteObject(fileRef)
        .then(() => console.log(`Deleted file: ${fileRef.fullPath}`))
        .catch((error) =>
          console.error(`Error deleting file ${fileRef.fullPath}:`, error)
        );
    });

    await Promise.all(deleteAll);

    console.log(`All files in folder '${folderPath}' deleted successfully.`);
  } catch (error) {
    console.error("Error deleting image from Firebase Storage:", error);
    throw error;
  }
}

export const productCreation = async (req, res, next) => {
  const { name, price, description } = req.body;
  const files = req.files;

  const product = await Product.find({});
  if (!name || !price || !files || !description) {
    const error = new Error("Some Fields Are Missing Out");
    error.status = 404;
    return next(error);
  }
  try {
    const imagesFromFirebase = files.map(async (file) => {
      const storageBucket = ref(
        storage,
        `products_${product.length + 1}/${Date.now()}_${file.originalname}`
      );

      const snapShot = await uploadBytes(storageBucket, file.buffer, {
        contentType: file.mimetype,
      });

      const downloadUrl = await getDownloadURL(snapShot.ref); // important don't forget to use the .ref

      const state = () => {
        if (files[0] === file) {
          return true;
        } else {
          return false;
        }
      };
      return {
        filename: file.originalname,
        url: downloadUrl,
        contentType: file.mimetype,
        path: storageBucket.fullPath,
        ThumbnailImage: state(),
      };
    });

    const images = await Promise.all(imagesFromFirebase);

    console.log(images);

    const newProduct = new Product({ name, price, description, image: images });

    await newProduct.save();
    return res.status(201).json({ sucess: true, data: newProduct });
  } catch (error) {
    
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: `The Product With id:${id} is not found`,
        success: false,
      });
    }

    const imageUrl = product.image.map((image) => image.url);

    await deleteImageFromFirebase(imageUrl);

    await product.deleteOne();

    return res
      .status(200)
      .json({ message: "the product has been deleted", success: true });
  } catch (error) {
    error.status = 404;
    return next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (products.length < 1) {
      return res.status(200).json({ success: false });
    }
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};

export const SearchProductByName = async (req, res, next) => {
  const { name } = req.params;
  try {
    const result = await Product.findOne({ name });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
   return res.status(500).json({ message: "error getting the product" ,error:error.message});
  }
};

export const getSpecificProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    res.status(200).json({ sucess: true, product: product });
  } catch (err) {
    return next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, deletedImages = [] } = req.body;
  const files = req.files;

  const mainProduct = await Product.find({});
  try {
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ msg: "error getting the product" });

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;

    const imagesIds = Array.isArray(deletedImages)
      ? deletedImages
      : [deletedImages];


    if (imagesIds.length > 0) {
      for (const id of imagesIds) {
        const image = product.image.id(id);
        const storageRef = ref(storage, image.path);

        try {
          await deleteObject(storageRef);

          product.image.pull({ _id: id });
        } catch (error) {
          console.log(error);
        }
      }
    }

    console.log(deletedImages);

    if(files && files.length > 0){
      const imagesFromFirebase = files.map(async (file) => {
        const storageBucket = ref(
          storage,
          `products_${mainProduct.length}/${Date.now()}_${file.originalname}`
        );
  
        const snapShot = await uploadBytes(storageBucket, file.buffer, {
          contentType: file.mimetype,
        });
  
        const downloadUrl = await getDownloadURL(snapShot.ref); // important don't forget to use the .ref
  
        const state = () => {
          if (files[0] === file) {
            return true;
          } else {
            return false;
          }
        };
        return {
          filename: file.originalname,
          url: downloadUrl,
          contentType: file.mimetype,
          path: storageBucket.fullPath,
          ThumbnailImage: state(),
        };
      });

      const images = await Promise.all(imagesFromFirebase)

      product.image.push(...images)
    }

    await product.save();

    res.status(201).json({
      edited: true,
      msg: "the product has been updated",
      result: product,
    });
  } catch (error) {
  
    return next(error);
  }
};
