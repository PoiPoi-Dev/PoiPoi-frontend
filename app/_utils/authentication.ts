'use server'
import { getAuthService } from "@/config/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";

//Authentication Logic
/**
 * Attempts to login the user based on the credentials in Google Firebase Authentication. 
 * @returns uuid string
 */
const loginEmailPassword = async (email: string, password: string) : Promise<string | undefined> => {
  const loginEmail = email;
  const loginPassword = password
  try {
    const auth = await getAuthService()
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    return userCredential.user.uid;
  } catch (e: unknown) {
    console.error(e);
  }
};

/**
 * Creates a user in Google Firebase Authentication. Password storage and hashing is handled by Google Firebase. 
 * @returns uuid string
 */
const createAccount = async (email: string, password: string) : Promise<string | undefined> => {
  const loginEmail = email;
  const loginPassword = password
  try {
    const auth = await getAuthService();
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    return userCredential.user.uid;
  } catch (e: unknown) {
    console.error(e);
  }
};

const monitorAuthState = async (): Promise<void> => {
  const auth = await getAuthService();
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log("Logged in as", user);
    } else {
      console.log("Not logged in.")
    }
  });
};

const logout = async (): Promise<void> => {
  const auth = await getAuthService();
  await signOut(auth);
}

(async () => await monitorAuthState()) ();


export {
  loginEmailPassword,
  createAccount,
  monitorAuthState,
  logout
}