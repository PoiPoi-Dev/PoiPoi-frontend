"use client";
// // import { createAccount, loginEmailPassword } from "../_utils/authentication";
// import { useEffect } from "react";

// //TODO: Handle the async await in a use effect
// export default function Home(): JSX.Element {

//   useEffect(()=>{
//     // void createUserAccount()
//   },[]);

//   // const createUserAccount = async ():Promise<void> => {
//   //   const email:string = "test@gmail.com";
//   //   const plainTextPassword:string = "test1234"

//   //   const uuid = await loginEmailPassword(email, plainTextPassword);
//   //   if (uuid) {
//   //       console.log("Login with user: ", {email, plainTextPassword, uuid});
//   //       return;
//   //   }

//   //   const newUserID = await createAccount(email, plainTextPassword);
//   //   const newUserAccountObj = {
//   //     email,
//   //     plainTextPassword,
//   //     uuid: newUserID,
//   //   }
//   //   console.log("Creating a new user: ", newUserAccountObj);
//   // }

//   return <main>
//     <h1>Running Log in commands: Check the firebase authentication emulator. Check the terminal see how to view the Emulator UI.</h1>
//   </main>;
// }

import React, { useState } from "react";
import { User } from "../_utils/global";
import { Button } from "../_components/ui/button";

const CreateSearchzoneButton: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [User, setUser] = useState<User>({} as User);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
    console.log("login status", isLogin);
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

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("User", User);
    //send req to BE
    // const response = await fetch("endpoint url", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newUser),
    // });
    // console.log("response", response);
  };

  return (
    <div>
      {isLogin ? (
        <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 top-[100px] left-0 z-[1000]">
          {/* {toggleLogin ? (<h4>Log in:</h4> ): (<h4>Create new account:</h4>)} */}
          Log in:
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Email address:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
                onChange={handleInputChange}
                name="email"
                value={User.email}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Set password:</label>
              <input
                className="border border-black rounded"
                type="password"
                required
                onChange={handleInputChange}
                name="password"
                value={User.password}
              ></input>
            </div>
            <Button onClick={handleSubmit}>Log in</Button>
            <Button onClick={toggleLogin}> Create new account</Button>
          </form>
        </div>
      ) : (
        <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 top-[100px] left-0 z-[1000]">
          Create new account:
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Email address:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
                onChange={handleInputChange}
                name="email"
                value={User.email}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Set password:</label>
              <input
                className="border border-black rounded"
                type="password"
                required
                onChange={handleInputChange}
                name="password"
                value={User.password}
              ></input>
            </div>
            <Button onClick={handleSubmit}>Create account</Button>
            <Button onClick={toggleLogin}> Return</Button>
          </form>
        </div>
      )}

      {/* creation */}
    </div>
  );
};

export default CreateSearchzoneButton;
