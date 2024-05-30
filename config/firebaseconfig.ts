// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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

//Use the command firebase emulators:start --only auth
if (process.env.NODE_ENV === 'development') connectAuthEmulator(auth, "http://localhost:9099");

//Authentication Logic
/**
 * Attempts to login the user based on the credentials in Google Firebase Authentication.
 */
const loginEmailPassword = async (email: string, password: string) : Promise<string | undefined> => {
  const loginEmail = email;
  const loginPassword = password
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    return userCredential.user.uid;
  } catch (e: unknown) {
    console.error(e);
  }
}

/**
 * Creates a user in Google Firebase Authentication. Password storage and hashing is handled by Google Firebase.
 */
const createAccount = async (email: string, password: string) : Promise<string | undefined> => {
  const loginEmail = email;
  const loginPassword = password
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    return userCredential.user.uid;
  } catch (e: unknown) {
    console.error(e);
  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log("Logged in as", user);
    } else {
      console.log("Not logged in.")
    }

  })
}
monitorAuthState();

export {
  auth,
}