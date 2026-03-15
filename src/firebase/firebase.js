import { initializeApp } from "firebase/app"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX8XzeuevoONjHYP8cqEH_oOXyLECbxms",
  authDomain: "gym-rutinas.firebaseapp.com",
  projectId: "gym-rutinas",
  storageBucket: "gym-rutinas.firebasestorage.app",
  messagingSenderId: "195846124449",
  appId: "1:195846124449:web:62eaddefcd2cf783d251e0",
  measurementId: "G-4C6V5LB5ZW"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)
export const db = getFirestore(app)