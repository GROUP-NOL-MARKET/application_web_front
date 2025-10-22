
import { createContext, useState, useEffect } from "react";
import API from "./Authentification/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsLoggedIn(false);

      try {
        const res = await API.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
