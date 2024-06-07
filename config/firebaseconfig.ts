'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth,
} from "firebase/auth";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
authDomain: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_PROJECT_ID,
storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_APP_ID
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
  
export async function getAuthService() {
    return await auth;
}