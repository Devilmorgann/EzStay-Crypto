// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIS4yz4-PSvhSSUVOyhvPJ6NOVfs4LVDA",
  authDomain: "crypto-d77c2.firebaseapp.com",
  projectId: "crypto-d77c2",
  storageBucket: "crypto-d77c2.firebasestorage.app",
  messagingSenderId: "966207939007",
  appId: "1:966207939007:web:0a85fda2c424b2bb47810a",
  measurementId: "G-7N71HHJY40"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth for signup/login
const auth = getAuth(app);
export const db = getFirestore(app);

export { auth };
