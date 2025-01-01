// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);