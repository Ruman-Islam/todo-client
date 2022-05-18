// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBb3eh1f6B8cBAn4fzGIPD7dFCH9BYmDzc",
    authDomain: "todo-app-e8e0a.firebaseapp.com",
    projectId: "todo-app-e8e0a",
    storageBucket: "todo-app-e8e0a.appspot.com",
    messagingSenderId: "182396348641",
    appId: "1:182396348641:web:3724ad2b78dcf7367e2fa0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;