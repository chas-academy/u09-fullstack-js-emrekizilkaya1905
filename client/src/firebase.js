// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mert-turkeyblog.firebaseapp.com",
  projectId: "mert-turkeyblog",
  storageBucket: "mert-turkeyblog.appspot.com",
  messagingSenderId: "980414122589",
  appId: "1:980414122589:web:bb0617f17d76a43aeddbb4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
