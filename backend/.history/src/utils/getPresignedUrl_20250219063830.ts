import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

export const uploadImageToFirebase = async ({image,path}:{image:Express.Multer.File,path:string}) =>{
    const Storage = ref(storage,`${path}/${image.originalname}-${Date.now()}`)


    const snapshot = await uploadBytes(Storage,image.buffer,{contentType:image.mimetype})


    const downloadUrl  = await getDownloadURL(snapshot.ref)


    return {
        filename:image.originalname,
        url:downloadUrl,
        path:Storage.fullPath,
    }
}