import { auth } from "@/config/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // onAuthStateChanged,
  signOut,
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
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    return userCredential.user.uid;
  } catch (e: unknown) {
    console.error(e);
  }
};

// const monitorAuthState = async (): Promise<void> => {
//   onAuthStateChanged(auth, user => {
//     if (user) {
//       console.log("Logged in as", user);
//     } else {
//       console.log("Not logged in.")
//     }
//   });
// };

const logout = async (): Promise<void> => {
  await signOut(auth);
}

// monitorAuthState();


export {
  loginEmailPassword,
  createAccount,
  // monitorAuthState,
  logout
}