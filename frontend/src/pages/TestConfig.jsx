import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvQzu-TklAUeCb1Suwz3P9lALTuXX1aQk",
  authDomain: "hackathon-150e4.firebaseapp.com",
  projectId: "hackathon-150e4",
  storageBucket: "hackathon-150e4.firebasestorage.app",
  messagingSenderId: "554915459387",
  appId: "1:554915459387:web:bd90282ccf1d9d2141471e",
  measurementId: "G-5N6WZBJRPK"
};

const Firebase = initializeApp(firebaseConfig);
const db = getFirestore(Firebase);
const auth = getAuth(Firebase);
export {Firebase, db, auth}; 