// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA89Dg2UpQ-qr5whb_8WDGJ5EvBVuwE5Sw",
  authDomain: "creator-insights-87wpe.firebaseapp.com",
  databaseURL: "https://creator-insights-87wpe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "creator-insights-87wpe",
  storageBucket: "creator-insights-87wpe.appspot.com",
  messagingSenderId: "343035664423",
  appId: "1:343035664423:web:1220f59d262ee0602b9602",
  measurementId: "G-NJXRL3NYP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);