import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2geuBQC_oCfznyGwU-UjMXilIjGyUqvw",
  authDomain: "reactchatapp-b0a66.firebaseapp.com",
  databaseURL: "https://reactchatapp-b0a66-default-rtdb.firebaseio.com",
  projectId: "reactchatapp-b0a66",
  storageBucket: "reactchatapp-b0a66.appspot.com",
  messagingSenderId: "976825208266",
  appId: "1:976825208266:web:be934a43ca8987161ad333",
  measurementId: "G-HBPKZMWNN1"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
