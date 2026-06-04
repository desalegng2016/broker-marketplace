import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config (you already generated this)
const firebaseConfig = {
  apiKey: "AIzaSyCo1pcVeroOftJCGoZfXuOCstWdD0YYvxc",
  authDomain: "broker-marketplace-4b7d9.firebaseapp.com",
  projectId: "broker-marketplace-4b7d9",
  storageBucket: "broker-marketplace-4b7d9.firebasestorage.app",
  messagingSenderId: "451287590605",
  appId: "1:451287590605:web:b11af88389d5fffeb52b84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
