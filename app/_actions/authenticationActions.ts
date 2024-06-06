'use server'
import { createAccount, loginEmailPassword } from "../_utils/authentication";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


/**
 * Creates an account on firebase server, then creates a new user in the database
 * @param email 
 * @param password 
 */
export async function createUser (email:string, password: string) {
  try{
    const newUserUuid = await createAccount(email, password);
    const newUserProfile = {
      firebase_uuid: newUserUuid,
    }
    console.log("Create new user with uuid: ", newUserUuid);
  
    const response = await fetch(`${baseUrl}/api/user_profiles`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUserProfile),
    });
    const resData = await response.json();
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