"use client";
import {
  createAccount,
  loginEmailPassword,
  deleteCurrentlyLoggedInUser,
  logout,
} from "../_utils/authentication";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface UserProfile {
  firebase_uuid: string;
  user_id?: number;
  username: string;
  score: number;
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
    localStorage.removeItem("levelAndXp"); //if user had a session and creates second account
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

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error);
    }

    (await response.json()) as UserProfile;
    alert("Account created successfully!");
  } catch (error) {
    alert(`Account creation failed: ${(error as Error).message}`);
    try {
      await deleteCurrentlyLoggedInUser();
    } catch (deleteError) {
      console.error(deleteError);
    }
    console.error(error);
  }
}

/**
 * Validates the user login via firebase
 * @param email
 * @param password
 */
export async function loginUser(email: string, password: string) {
  localStorage.removeItem("levelAndXp"); //if other user creates second account.
  try {
    await loginEmailPassword(email, password);
    alert("Login successful!");
  } catch (error) {
    alert((error as Error).message);
    console.error(error);
    return false;
  }
}

/**
 * Logs the user out from the app.
 */
export async function logoutUser(): Promise<void> {
  localStorage.removeItem("levelAndXp"); //clean up after user
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
