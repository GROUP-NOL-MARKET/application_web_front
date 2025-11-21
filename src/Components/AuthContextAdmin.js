// src/Auth/AdminAuthContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import APIAdmin from "./Authentification/apiAdmin"; // ton apiAdmin
import Preloader from "../Preloader";

export const AuthContextAdmin = createContext();

export const AdminAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("adminToken"));
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setIsAuthLoading(false);
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        await APIAdmin.get("/admin"); // endpoint admin
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
    const handleTokenExpired = () => logout();
    window.addEventListener("adminTokenExpired", handleTokenExpired);
    return () => window.removeEventListener("adminTokenExpired", handleTokenExpired);
  }, [logout]);

  return (
    <AuthContextAdmin.Provider value={{ isLoggedIn, setIsLoggedIn, logout, isAuthLoading }}>
      {!isAuthLoading ? children : <Preloader />}
    </AuthContextAdmin.Provider>
  );
};
