import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAee7n7hPmgxQDDfqCwcirNq3LFtXmHNo",
  authDomain: "proyectofinal-db6c8.firebaseapp.com",
  projectId: "proyectofinal-db6c8",
  storageBucket: "proyectofinal-db6c8.firebasestorage.app",
  messagingSenderId: "1018835670891",
  appId: "1:1018835670891:web:acd460c969b3ddc6001e2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;