'use client'
import { createContext, useEffect, useState } from "react";

import { User, getAuth } from "firebase/auth";
import { getAuthService } from "@/config/firebaseconfig";
getAuth

export const AuthContext = createContext<User|null>(null);

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    void handleIsLoggedIn();

    return () => {};
  },[]);

  const handleIsLoggedIn = async () => {
    try {
      const auth = await getAuthService();
      auth.onAuthStateChanged(user => {
        try {
          if (!user) throw 'No user';
            setUser(user);
            console.log(user.uid)
        } catch(error) {
          console.log(error);
          setUser(null);
        }
      });
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default AuthProvider;

// export const useAuth = () => {
//   const userProfile = useContext(AuthContext);
//   if (AuthContext === undefined) throw new Error ("useAuth must be used with AuthContext");
//   return userProfile;
// }

