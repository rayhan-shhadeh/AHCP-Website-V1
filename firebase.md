// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBl-aOdAdfiFQMDGk-gk_oDL9D6BLfZPMM",
authDomain: "ahpc-website.firebaseapp.com",
projectId: "ahpc-website",
storageBucket: "ahpc-website.firebasestorage.app",
messagingSenderId: "335499592067",
appId: "1:335499592067:web:8e1d1537a0985f9e3876b6",
measurementId: "G-79T11LQE3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
