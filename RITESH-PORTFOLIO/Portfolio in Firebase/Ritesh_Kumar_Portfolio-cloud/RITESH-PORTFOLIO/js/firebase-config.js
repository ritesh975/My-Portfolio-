// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnfYDnC-xrNyB_GNqeW330OKvQqJotQOw",
  authDomain: "ritesh-portfolio-f8512.firebaseapp.com",
  projectId: "ritesh-portfolio-f8512",
  storageBucket: "ritesh-portfolio-f8512.firebasestorage.app",
  messagingSenderId: "9857809630",
  appId: "1:9857809630:web:13778019a0e5e4760c964f",
  measurementId: "G-HNZ4R2L2H9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);