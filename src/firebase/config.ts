import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSl-RAz3v6AyyX9pS7EY3l86g6-rb5A8A",
  authDomain: "fir-day-bitalog.firebaseapp.com",
  projectId: "fir-day-bitalog",
  storageBucket: "fir-day-bitalog.appspot.com",
  messagingSenderId: "328381111390",
  appId: "1:328381111390:web:b624cb420f0553dcfda8cf",
  measurementId: "G-KDJDPSPBF7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);