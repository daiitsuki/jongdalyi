import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpBPVzFQwUjn1efuxxwY8TKxjdTWxaZNs",
  authDomain: "dalyi1.firebaseapp.com",
  projectId: "dalyi1",
  storageBucket: "dalyi1.appspot.com",
  messagingSenderId: "863576853317",
  appId: "1:863576853317:web:727560383d297f3af58c2c",
  measurementId: "G-DGGC145PBV",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore(app);
