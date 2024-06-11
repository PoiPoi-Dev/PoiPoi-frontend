"use client";
import { createAccount, 
  loginEmailPassword, 
  deleteCurrentlyLoggedInUser,
  logout, 
} from "../_utils/authentication";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface UserProfile {
  firebase_uuid: string;
  user_id?: string;
  username: string;
}

/**
 * Creates an account on firebase server, then creates a new user in the database
 * @param email
 * @param password
 */
export async function createUser(
  email: string,
  password: string,
  displayName: string
) {
  try {
    const newUserUuid = await createAccount(email, password);
    const newUserProfile = {
      firebase_uuid: newUserUuid,
      username: displayName,
    };
    console.log("Create new user with uuid: ", newUserUuid);

    const response = await fetch(`${baseUrl}/api/user_profiles`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserProfile),
    });
    const resData = (await response.json()) as UserProfile;
    console.log(resData);
    alert("Account created successfully!");
  } catch (error) {
    alert("Account creation failed, please try again.");
    try{ await deleteCurrentlyLoggedInUser(); 
    } catch (error) {console.error(error);}
    console.log(error);
  }
}

/**
 * Validates the user login via firebase
 * @param email
 * @param password
 */
export async function loginUser(email: string, password: string) {
  try {
    const uuid = await loginEmailPassword(email, password);
    if (!uuid) throw 'Could not find user';
    alert("Login successful!");
    } catch (error) {
    alert("Login failed!");
    console.error(error);
  }
}

/**
 * Logs the user out from the app.
 */
export async function logoutUser(): Promise<void> {
  try {
    await logout();
    alert("Logout successful!");
  } catch (error) {
    alert("Logout failed!");
    console.error(error);
  }
}

export async function isVerified(bearerToken: string) {
  try {
    const response = await fetch(`${baseUrl}/authentication`, {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
    });
    const data = (await response.json()) as { message: string };
    console.log("verified with uuid:", data);
  } catch (error) {
    console.log(error);
  }
}
