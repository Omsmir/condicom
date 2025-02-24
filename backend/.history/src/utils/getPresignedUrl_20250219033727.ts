import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

const uploadImageToFirebase = async ({image}:{image:Express.Multer.File}) =>{
    const Storage = ref(storage,`${image.filename}-${Date.now()}`)


    const snapshot = await uploadBytes(Storage,image.buffer,{contentType:image.mimetype})


    const downloadUrl  = await getDownloadURL(snapshot.ref)


    return {
        filename:image.originalname,
        url:downloadUrl,
        path:Storage.fullPath,
    }
}