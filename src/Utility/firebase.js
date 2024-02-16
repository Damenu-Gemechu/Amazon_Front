import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv0iGlPHjlA3vONy0ahjzkRWMG-_qrejA",
  authDomain: "clone-51ece.firebaseapp.com",
  projectId: "clone-51ece",
  storageBucket: "clone-51ece.appspot.com",
  messagingSenderId: "450799916397",
  appId: "1:450799916397:web:1d6897b928e499f24bf664"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
