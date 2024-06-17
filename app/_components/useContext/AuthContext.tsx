"use client";
import { createContext, useEffect, useState } from "react";

import { User, getAuth } from "firebase/auth";
import { getAuthService } from "@/config/firebaseconfig";
getAuth;

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    void handleIsLoggedIn();

    return () => {};
  }, []);

  const handleIsLoggedIn = async () => {
    try {
      const auth = await getAuthService();
      auth.onAuthStateChanged((user) => {
        try {
          if (!user) throw "No user";
          setUser(user);
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      });
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
