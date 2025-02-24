import { ref } from "firebase/storage"
import { storage } from "./firebase"

const uploadImageToFirebase = async ({image}:{image:Express.Multer.File}) =>{
    const Storage = ref(storage,)
}