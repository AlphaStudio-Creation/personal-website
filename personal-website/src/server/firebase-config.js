
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCVp98XO-nb5upgz1tjr1A8ZqwPbUsAVTE",
  authDomain: "personal-website-77269.firebaseapp.com",
  projectId: "personal-website-77269",
  storageBucket: "personal-website-77269.firebasestorage.app",
  messagingSenderId: "776400849664",
  appId: "1:776400849664:web:cdc3e921990a7051adc1e5",
  measurementId: "G-1C0F7Y6R3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
await auth.authStateReady()
export const db = getFirestore(app)
