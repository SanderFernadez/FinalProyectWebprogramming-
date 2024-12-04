import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Autenticación
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCv2vMrPE1O29oeyCHUmKYvl4G9IKeLlF4",
  authDomain: "finalproyect-8908c.firebaseapp.com",
  projectId: "finalproyect-8908c",
  storageBucket: "finalproyect-8908c.firebasestorage.app",
  messagingSenderId: "620737970358",
  appId: "1:620737970358:web:9b0a92cdadddce49a56617",
  measurementId: "G-FWCKKS0VVF"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Necesario para la autenticación de usuarios
const db = getFirestore(app); // Necesario para interactuar con Firestore
const storage = getStorage(app); // Necesario para interactuar con Firebase Storage

export { auth, db, storage };
