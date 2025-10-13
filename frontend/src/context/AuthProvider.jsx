import React, { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const checkUser = localStorage.getItem("user");
  const [authUser, setAuthUser] = useState(
    checkUser ? JSON.parse(checkUser) : undefined
  );
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
