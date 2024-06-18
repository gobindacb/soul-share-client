// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC67pn6SIuOk00nptvHPy3RXaxhj1q27Go",
    authDomain: "soul-share-23173.firebaseapp.com",
    projectId: "soul-share-23173",
    storageBucket: "soul-share-23173.appspot.com",
    messagingSenderId: "1002971289664",
    appId: "1:1002971289664:web:307dc53b4074f0aee367a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
