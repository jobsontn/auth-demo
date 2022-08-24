// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEVJgzGfSLXwJToIEcWdSJTpyYSSoG0qA",
  authDomain: "auth-demo-f11eb.firebaseapp.com",
  projectId: "auth-demo-f11eb",
  storageBucket: "auth-demo-f11eb.appspot.com",
  messagingSenderId: "195757618095",
  appId: "1:195757618095:web:0c3e1b13c4ac4a74f3f55a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default  app;