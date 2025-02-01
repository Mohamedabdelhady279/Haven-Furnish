// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1yKnS2BYi7qcrAQ6KTIZvEdIVzPYRBbY",
  authDomain: "havenfurnish.firebaseapp.com",
  projectId: "havenfurnish",
  storageBucket: "havenfurnish.firebasestorage.app",
  messagingSenderId: "592332591283",
  appId: "1:592332591283:web:a675f9de441c13653fe0c6",
  measurementId: "G-EHSEJEH8EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const facebookProvider  = new FacebookAuthProvider();


export {facebookProvider };