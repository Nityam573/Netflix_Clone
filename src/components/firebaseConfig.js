// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB4tDXT2QST1NUJCL5V5fU17Y_1CGSlfMI",
  authDomain: "netflix-b2fb0.firebaseapp.com",
  projectId: "netflix-b2fb0",
  storageBucket: "netflix-b2fb0.appspot.com",
  messagingSenderId: "696500961030",
  appId: "1:696500961030:web:c2b46c55146534de19e887",
  measurementId: "G-DV41775SZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    