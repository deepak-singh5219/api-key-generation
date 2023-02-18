// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHlmJknZhIKxP15VmruuGITYkqRU9BATM",
  authDomain: "codex-31c9b.firebaseapp.com",
  projectId: "codex-31c9b",
  storageBucket: "codex-31c9b.appspot.com",
  messagingSenderId: "334436442476",
  appId: "1:334436442476:web:1c9f9dc2822a3927d15349",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default app;
export {auth, provider};
