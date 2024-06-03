'use client'
import { createAccount, loginEmailPassword } from "../_utils/authentication";
import { useEffect } from "react";

export default function Home(): JSX.Element {

  useEffect(()=>{
    createUserAccount();
  },[]);
  
  const createUserAccount = async () => {
    const email:string = "test@gmail.com";
    const plainTextPassword:string = "test1234"

    const uuid = await loginEmailPassword(email, plainTextPassword);
    if (uuid) {
        console.log("Login with user: ", {email, plainTextPassword, uuid});
        return;
    }

    const newUserID = await createAccount(email, plainTextPassword);
    const newUserAccountObj = {
      email,
      plainTextPassword,
      uuid: newUserID,
    }
    console.log("Creating a new user: ", newUserAccountObj);
  }

  return <main>
    <h1>Running Log in commands: Check the firebase authentication emulator. Check the terminal see how to view the Emulator UI.</h1>
  </main>;
}