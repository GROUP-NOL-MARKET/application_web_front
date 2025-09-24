// src/api.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Création instance axios
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Intercepteur pour attacher le token JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur de réponse pour gérer l'expiration du token
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;

    if (message === "Token expiré" || message === "Token invalide") {
      console.warn("Token expiré → logout automatique");

      // Supprimer le token
      localStorage.removeItem("token");

      // Rediriger vers login
      window.location.href = "/application_web_front/login";
    }

    return Promise.reject(error);
  }
);

export default API;
