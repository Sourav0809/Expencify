// Import the functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// our web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWx40StKOSrRktR-vSNki9teMtZ9f_Lpo",
    authDomain: "expencify-26abb.firebaseapp.com",
    databaseURL: "https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expencify-26abb",
    storageBucket: "expencify-26abb.appspot.com",
    messagingSenderId: "981559063460",
    appId: "1:981559063460:web:dcc8de49547c056cb44731"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }