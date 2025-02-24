// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import config from 'config'

const firebaseConfig = {
    apiKey: config.get<string>("apiKey"),
    authDomain: config.get<string>("authDomain"),
    databaseURL: config.get<string>("databaseURL"),
    projectId: config.get<string>("projectId"),
    storageBucket: config.get<string>("storageBucket"),
    messagingSenderId: config.get<string>("messagingSenderId"),
    appId: config.get<string>("appId")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)


