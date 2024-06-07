'use client'
import { createAccount, loginEmailPassword } from "../_utils/authentication";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface UserProfile {
  firebase_uuid: string,
  user_id?: string,
  username: string,
}

/**
 * Creates an account on firebase server, then creates a new user in the database
 * @param email 
 * @param password 
 */
export async function createUser (email:string, password: string, displayName: string) {
  try{
    const newUserUuid = await createAccount(email, password);
    const newUserProfile = {
      firebase_uuid: newUserUuid,
      username: displayName,
    }
    console.log("Create new user with uuid: ", newUserUuid);
  
    const response = await fetch(`${baseUrl}/api/user_profiles`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUserProfile),
    });
    const resData = await response.json() as UserProfile;
    console.log(resData);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Validates the user login via firebase
 * @param email 
 * @param password 
 */
export async function loginUser(email:string, password: string) {
  try {
    const uuid = await loginEmailPassword(email, password);
    console.log("Log in: " + uuid);
  } catch (error) {
    console.error(error);
  }
}

export async function isVerified(bearerToken:string) {
  try {
    const response = await fetch(`${baseUrl}/authentication`, {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + bearerToken,
      },

    });
    const data = await response.json() as {message: string};
    console.log('verified with uuid:', data);
  } catch (error) {
    console.log(error);
  }
}