
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDI2RMGrZXBt3_lcC6iRDN9MrXQboA1Y1g",
  authDomain: "school-17443.firebaseapp.com",
  projectId: "school-17443",
  storageBucket: "school-17443.firebasestorage.app",
  messagingSenderId: "648922738496",
  appId: "1:648922738496:web:0beccb04ef0011e2d014a5",
  measurementId: "G-9L5TQLTEP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app,analytics}