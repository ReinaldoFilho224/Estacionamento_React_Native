// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgJ6hSCzmbOiWVHDAlJWIPz5MS6cfYuIM",
  authDomain: "estacionamento-298c9.firebaseapp.com",
  projectId: "estacionamento-298c9",
  storageBucket: "estacionamento-298c9.appspot.com",
  messagingSenderId: "862031494301",
  appId: "1:862031494301:web:830a6cd089ac7e0149a874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { auth, storage };