import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "./Authentification/api";
import Preloader from "./Preloader";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAuthLoading(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
         setIsLoggedIn(false);
        setIsAuthLoading(false);
        return;
      }

      try {
        await API.get("/user");
        setIsLoggedIn(true);
      } catch (error) {
        logout();
      } finally {
        setIsAuthLoading(false);
      }
    };

    verifyToken();
  }, [logout]);

  // écoute globale du token expiré
  useEffect(() => {
    const handleTokenExpired = () => {
      logout();
    };

    window.addEventListener("tokenExpired", handleTokenExpired);
    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, isAuthLoading }}>
      {!isAuthLoading ? children : <Preloader />}
    </AuthContext.Provider>
  );
};
