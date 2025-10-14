// src/api.js
import axios from "axios";


// Création instance axios
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
const API_URL = "http://127.0.0.1:8000/api";

// Ajouter un favori
export const addFavorite = async (productId, token) => {
  return await axios.post(
    `${API_URL}/favorites`,
    { product_id: productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Récupérer les favoris de l'utilisateur
export const getFavorites = async (token) => {
  const res = await axios.get(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Supprimer un favori
export const deleteFavorite = async (id, token) => {
  return await axios.delete(`${API_URL}/favorites/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Messages API
export const getMessages = async (token, page = 1, sort = "récent") => {
  const sortParam = sort === "anciens" ? "anciens" : "recent";
  const res = await axios.get(`${API_URL}/messages?page=${page}&sort=${sortParam}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const deleteMessage = async (id, token) => {
  return await axios.delete(`${API_URL}/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


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
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
