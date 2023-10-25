import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMvseSKVWpPtb2TisMhnL8DZ6E76Wup8o",
  authDomain: "nyam0604.firebaseapp.com",
  projectId: "nyam0604",
  storageBucket: "nyam0604.appspot.com",
  messagingSenderId: "232010468201",
  appId: "1:232010468201:web:32b91e93604b4bf8e84bf8",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore(app);
