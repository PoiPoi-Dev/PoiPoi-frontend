"use client";
import React, { useEffect, useState, useContext } from "react";
import { User } from "../_utils/global";
import { Button } from "../_components/ui/button";
import {
  createUser,
  isVerified,
  loginUser,
  logoutUser,
} from "../_actions/authenticationActions";
import { getAuthService } from "@/config/firebaseconfig";
import { AuthContext } from "../_components/useContext/AuthContext"

const LoginPage: React.FC = () => {
  const [loginWindowStatus, setLoginWindowStatus] = useState<number>(0);
  const [user, setUser] = useState<User>({} as User);
  const firebaseUser = useContext(AuthContext);

  useEffect(() => {
    if (firebaseUser != null) {
      setLoginWindowStatus(2);
    }
    return () => {};
  }, [firebaseUser]);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleCreateNewAccount = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      if (!user.email || !user.password || !user.displayName)
        throw "Invalid User/Password/Display Name";
      await createUser(user.email, user.password, user.displayName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    
    try {
      if (!user.email || !user.password) throw "Invalid User/Password";
      await loginUser(user.email, user.password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setLoginWindowStatus(0);
    } catch (error) {
      console.error(error);
    }
  }

  const checkIfVerified = async () => {
    try {
      const auth = await getAuthService();
      if (!auth.currentUser) throw "No current user";
      const idToken: string = await auth.currentUser.getIdToken(true);
      await isVerified(idToken);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSignOutLayout = ():React.JSX.Element => {
    return (
      <>
        Would you like to sign out?
        <div>
          <Button onClick={(): void => void handleLogout()}>Sign out</Button>
        </div>
      </>
    )
  }

  const renderCreateAccountLayout = () => {
    return (
      <>
      Create new account:
        <form onSubmit={void handleCreateNewAccount}>
          <div>
            <label htmlFor="email">Email address:</label>
            <input
              className="border border-black rounded"
              type="text"
              required
              onChange={handleInputChange}
              name="email"
              value={user.email}
            ></input>
          </div>
          <div>
            <label htmlFor="username">Set display name:</label>
            <input
              className="border border-black rounded"
              type="text"
              required
              onChange={handleInputChange}
              name="displayName"
              value={user.displayName}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Set password:</label>
            <input
              className="border border-black rounded"
              type="password"
              required
              onChange={handleInputChange}
              name="password"
              value={user.password}
            ></input>
          </div>
          <Button onClick={(e) => void handleCreateNewAccount(e)}>
            Create account
          </Button>
          <Button onClick={() => setLoginWindowStatus(1)}> Switch to Login Menu </Button>
        </form>
      </>
    )
  }

  const renderSignInWindow = () => {
    return (
      <>
        Log in:
          <form onSubmit={(e) => void handleLogin(e)}>
            {/* BEWARE! onSubmit event fires when user presses "enter" key at any point */}
            <div>
              <label htmlFor="email">Email address:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
                onChange={handleInputChange}
                name="email"
                value={user.email}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Set password:</label>
              <input
                className="border border-black rounded"
                type="password"
                required
                onChange={handleInputChange}
                name="password"
                value={user.password}
              ></input>
            </div>
            <Button onClick={(e) => void handleLogin(e)}>Log in</Button>
            <Button onClick={() => setLoginWindowStatus(0)}>
              {" "}
              Switch to create new account menu
            </Button>
          </form>
        </>
    )
  }

  const renderLoginWindow = (status: number) => {
    return (
      <div className="bg-white border rounded shadow-lg mt-2 p-2">
        {
          (status === 2) ? renderSignOutLayout()
          : (status === 1) ?  renderSignInWindow()
          : renderCreateAccountLayout()
        }
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between">
      { renderLoginWindow(loginWindowStatus) }
      {/* creation */}
      <div>
        <Button onClick={() => void checkIfVerified()}>
          Click here to test if verified
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
