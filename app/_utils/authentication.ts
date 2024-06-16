"use client";
import { getAuthService } from "@/config/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";

//Authentication Logic
/**
 * Attempts to login the user based on the credentials in Google Firebase Authentication.
 * @returns uuid string
 */

// Define a type for Firebase error
interface FirebaseAuthError extends Error {
  code: string;
}

// Type guard for Firebase error
const isFirebaseAuthError = (error: unknown): error is FirebaseAuthError => {
  return (error as FirebaseAuthError).code !== undefined;
};

const loginEmailPassword = async (
  email: string,
  password: string
): Promise<string | undefined> => {
  const loginEmail = email;
  const loginPassword = password;
  try {
    const auth = await getAuthService();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    return userCredential.user.uid;
  } catch (e: unknown) {
    if (isFirebaseAuthError(e)) {
      const errorCode = e.code;
      console.log("errorCode: ", errorCode);
      if (errorCode === 'auth/invalid-credential') {
        throw new Error('Email or password incorrect! Please try again.');
      } else {
        throw new Error('Login unsuccessful due to internal error. Please try again later.');
      }
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
    console.error(e);
  }
};

/**
 * Creates a user in Google Firebase Authentication. Password storage and hashing is handled by Google Firebase.
 * @returns uuid string
 */
const createAccount = async (
  email: string,
  password: string
): Promise<string | undefined> => {
  const loginEmail = email;
  const loginPassword = password;
  try {
    const auth = await getAuthService();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
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
    if (!user) throw "No user currently logged in";
    await deleteUser(user);
  } catch (error) {
    console.error(error);
  }
};

const monitorAuthState = async (): Promise<void> => {
  await getAuthService();
};

const logout = async (): Promise<void> => {
  try {
    const auth = await getAuthService();
    if (!auth) throw "Could not get Authentication Service!";
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

void (async () => await monitorAuthState())();

export {
  loginEmailPassword,
  createAccount,
  deleteCurrentlyLoggedInUser,
  monitorAuthState,
  logout,
};
