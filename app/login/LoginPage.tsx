"use client";
import React, { useEffect, useState, useContext } from "react";
import { Account, User } from "../_utils/global";
import { useRouter } from "next/navigation";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../_actions/authenticationActions";
import { AuthContext } from "../_components/useContext/AuthContext";
import { Button } from "../_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import FooterMenu from "../_components/FooterMenu";
import CircularProgressBar from "../_components/CircularXp";
import { RiUserFill } from "react-icons/ri";
import LoadingSkeleton from "../_components/ui/loading";
import { calculateTotalExperienceForLevel } from "../_utils/calculateExpInLevel";
import Skeleton from "../_components/ui/skeleton";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LoginPage: React.FC = () => {
  const [loginWindowStatus, setLoginWindowStatus] = useState<number>(0);
  const [currAccount, setCurrAccount] = useState<Account>({} as Account);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    email: "",
    creatingEmail: "",
    password: "",
    creatingPassword: "",
    displayName: "",
  } as User);
  const firebaseUser = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isCreating) return;
    if (firebaseUser != null && !isCreating) {
      void handleFetchUserData();
      setLoginWindowStatus(2);
      setIsLoading(false);
    }
    if (firebaseUser == null) {
      setLoginWindowStatus(0);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [firebaseUser, isCreating]);

  const handleFetchUserData = async () => {
    const data = await fetch(`${BASE_URL}/api/user_profiles/user_stats`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebase_uuid: firebaseUser?.uid }),
    });
    const userData: Account = (await data.json()) as Account;
    setCurrAccount(userData);
  };

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
      setIsCreating(true);
      if (!user.creatingEmail || !user.creatingPassword || !user.displayName)
        throw "Invalid User/Password/Display Name";
      if (user.creatingPassword.length < 6) {
        alert("Password must have at least 6 characters, please try again.");
        throw "Insufficient password length";
      }
      await createUser(
        user.creatingEmail,
        user.creatingPassword,
        user.displayName
      );
      setIsCreating(false);
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
      const isLoginSuccess = await loginUser(user.email, user.password);
      if (isLoginSuccess) router.push("/map");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrAccount({} as Account);
      setLoginWindowStatus(0);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSignOutLayout = (): React.JSX.Element => {
    const { level, xpToNextLevel } = currAccount;
    const currLvMaxXp = calculateTotalExperienceForLevel(level);
    const currXp = currLvMaxXp - xpToNextLevel;
    return (
      <>
        <div className="flex flex-col justify-center items-center gap-4">
          {currAccount.username ? (
            <h1 className="text-primary text-3xl font-extrabold m-0 p-0 h-fit">
              {currAccount.username}
            </h1>
          ) : (
            <Skeleton className="w-24 h-4" />
          )}

          {/* USER PROFILE IMAGE & XP */}
          <div className="relative h-40 my-6">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-100 w-40 h-40 rounded-full flex justify-center items-center">
              <RiUserFill size={100} className="text-secondary-300" />
            </div>
            <CircularProgressBar
              percentage={currAccount ? (currXp / currLvMaxXp) * 100 : 0}
              strokeWidth={16}
              sqSize={200}
            />
          </div>

          {!isNaN(currXp) ? (
            <p>
              Exp: {currXp} / {currLvMaxXp || 0}
            </p>
          ) : (
            <Skeleton className="w-24 h-4" />
          )}

          {currAccount.level ? (
            <p>
              level:{" "}
              <span className="font-bold text-primary-500">
                {currAccount.level}
              </span>{" "}
            </p>
          ) : (
            <Skeleton className="w-12 h-4" />
          )}
        </div>

        <div className="h-[1px] bg-primary-100/40 w-full my-8"></div>

        <div>
          <Button
            className="w-full text-destructive text-lg"
            variant={"link"}
            onClick={(): void => void handleLogout()}
          >
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
        <form onSubmit={(e) => void handleCreateNewAccount(e)}>
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
            <Button>Create account</Button>
          </div>
        </form>

        <div>
          <Button
            variant={"link"}
            className="w-full mt-4"
            onClick={() => setLoginWindowStatus(0)}
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
          variant={"link"}
          className="w-full mt-4"
          onClick={() => setLoginWindowStatus(1)}
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
          ? renderCreateAccountLayout()
          : renderSignInWindow()}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-screen h-screen px-4">
      {!isLoading ? (
        <>
          {renderLoginWindow(loginWindowStatus)}
          <FooterMenu variant="account" />
        </>
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

export default LoginPage;
