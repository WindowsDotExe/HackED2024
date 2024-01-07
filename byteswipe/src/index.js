import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/login';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// const db = getFirestore(app);

// const categoriesRef = db.collection('categories');

// let query = categoriesRef.where('name', '==', 'Technology').get();

// alert(query);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="header">
      <h1>ByteSwipe</h1>
    </div>
    <Login />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
