'use client'
import { getAuthService } from "@/config/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
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

/**
 * Deletes the currently signed in user from ONLY Google Firebase Authentication Database. 
 * This has no interaction with the project database.
 * @returns uuid string
 */
const deleteCurrentlyLoggedInUser = async (): Promise<void> => {
  try {
    const auth = await getAuthService();
    const user = auth.currentUser;
    if (!user) throw 'No user currently logged in'
    await deleteUser(user);
  } catch (error) {
    console.error(error);
  }
}

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

void (async () => await monitorAuthState()) ();


export {
  loginEmailPassword,
  createAccount,
  deleteCurrentlyLoggedInUser,
  monitorAuthState,
  logout,
}