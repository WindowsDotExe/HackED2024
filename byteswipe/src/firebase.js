import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCUYPbUfwxWC20UyX2PxqqqLO4pEq3AtPU",
    authDomain: "byteswipe-697ae.firebaseapp.com",
    projectId: "byteswipe-697ae",
    storageBucket: "byteswipe-697ae.appspot.com",
    messagingSenderId: "927395411049",
    appId: "1:927395411049:web:78d90a0991675794cf9ef8",
    measurementId: "G-N58MGNX6RM"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase Auth service for the default app
const auth = getAuth(app);

export { auth }; // Export the Auth service