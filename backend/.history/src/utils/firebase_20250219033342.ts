import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import config from 'config'

const firebaseConfig = {
    apiKey: config.get<string>("apiKey"),
    authDomain: config.get<string>("authDomain"),
    projectId: config.get<string>("projectId"),
    storageBucket: config.get<string>("storageBucket"),
    messagingSenderId: config.get<string>("messagingSenderId"),
    appId: config.get<string>("appId"),
    measurementId:config.get<string>("meID")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)


