"use client";
import React, { useEffect, useState, useContext } from "react";
import { User } from "../_utils/global";
import {
  createUser,
  isVerified,
  loginUser,
  logoutUser,
} from "../_actions/authenticationActions";
import { getAuthService } from "@/config/firebaseconfig";
import { AuthContext } from "../_components/useContext/AuthContext";
import { Button } from "../_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import FooterMenu from "../_components/FooterMenu";

const LoginPage: React.FC = () => {
  const [loginWindowStatus, setLoginWindowStatus] = useState<number>(0);
  const [user, setUser] = useState<User>({
    email: "",
    creatingEmail: "",
    password: "",
    creatingPassword: "",
    displayName: "",
  } as User);
  const firebaseUser = useContext(AuthContext);

  useEffect(() => {
    if (firebaseUser != null) {
      setLoginWindowStatus(2);
    }
    return () => {};
  }, [firebaseUser]);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      if (!user.creatingEmail || !user.creatingPassword || !user.displayName)
        throw "Invalid User/Password/Display Name";
      await createUser(
        user.creatingEmail,
        user.creatingPassword,
        user.displayName
      );
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
  };

  const checkIfVerified = async () => {
    try {
      const auth = await getAuthService();
      if (!auth.currentUser) {
        alert("No current user");
        throw "No current user";
      }
      const idToken: string = await auth.currentUser.getIdToken(true);
      await isVerified(idToken);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSignOutLayout = (): React.JSX.Element => {
    return (
      <>
        <h1 className="text-primary text-2xl font-bold">
          Would you like to sign out?
        </h1>
        <div>
          <Button className="w-full" onClick={(): void => void handleLogout()}>
            Sign out
          </Button>
        </div>
      </>
    );
  };

  const renderCreateAccountLayout = () => {
    return (
      <div className="w-full">
        <h1 className="text-primary text-2xl font-bold">Create new account</h1>
        <form onSubmit={void handleCreateNewAccount}>
          {/* INPUT */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="creatingEmail">Email :</Label>
              <Input
                type="email"
                id="creatingEmail"
                required
                placeholder="Email"
                onChange={({ target: { value } }) =>
                  handleInputChange({
                    target: { name: "creatingEmail", value },
                  })
                }
                value={user.creatingEmail}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="creatingUsername">Username :</Label>
              <Input
                type="username"
                id="creatingUsername"
                required
                placeholder="username"
                onChange={({ target: { value } }) =>
                  handleInputChange({
                    target: { name: "displayName", value },
                  })
                }
                value={user.displayName}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="creatingPassword">Password :</Label>
              <Input
                type="password"
                id="creatingPassword"
                required
                placeholder="password"
                onChange={({ target: { value } }) =>
                  handleInputChange({
                    target: { name: "creatingPassword", value },
                  })
                }
                value={user.creatingPassword}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <Button onClick={(e) => void handleCreateNewAccount(e)}>
              Create account
            </Button>
          </div>
        </form>

        <div>
          <Button
            variant={"outline"}
            className="w-full mt-4"
            onClick={() => setLoginWindowStatus(1)}
          >
            {" "}
            Switch to Login Menu{" "}
          </Button>
        </div>
      </div>
    );
  };

  const renderSignInWindow = () => {
    return (
      <div className="w-full">
        <h1 className="text-primary text-2xl font-bold">Login</h1>

        <form onSubmit={(e) => void handleLogin(e)}>
          {/* BEWARE! onSubmit event fires when user presses "enter" key at any point */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email :</Label>
              <Input
                type="email"
                id="email"
                required
                placeholder="Email"
                onChange={({ target: { value } }) =>
                  handleInputChange({ target: { name: "email", value } })
                }
                value={user.email}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password :</Label>
              <Input
                type="password"
                id="password"
                required
                placeholder="password"
                onChange={({ target: { value } }) =>
                  handleInputChange({ target: { name: "password", value } })
                }
                value={user.password}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button onClick={(e) => void handleLogin(e)}>Log in</Button>
          </div>
        </form>

        <Button
          variant={"outline"}
          className="w-full mt-4"
          onClick={() => setLoginWindowStatus(0)}
        >
          {" "}
          Switch to create new account menu
        </Button>
      </div>
    );
  };

  const renderLoginWindow = (status: number) => {
    return (
      <div className="bg-white border rounded-2xl shadow-lg mt-2 p-4 w-full animate-fade fade-in">
        {status === 2
          ? renderSignOutLayout()
          : status === 1
          ? renderSignInWindow()
          : renderCreateAccountLayout()}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-screen h-screen px-4">
      {renderLoginWindow(loginWindowStatus)}
      <div>
        <Button variant={"link"} onClick={() => void checkIfVerified()}>
          Click here to test if verified
        </Button>
      </div>
      <FooterMenu variant="account" />
    </div>
  );
};

export default LoginPage;
