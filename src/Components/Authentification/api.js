// src/api.js
import axios from "axios";

// ================================
// 🔧 Configuration de base
// ================================
const API_URL = "http://127.0.0.1:8000/api";

const API = axios.create({
    baseURL: API_URL,
});

// ================================
// 💬 Messages API
// ================================

// Récupérer les messages avec pagination et tri
export const getMessages = async (token, page = 1, sort = "récent") => {
    const sortParam = sort === "anciens" ? "anciens" : "recent";
    const res = await axios.get(`${API_URL}/messages?page=${page}&sort=${sortParam}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Supprimer un message
export const deleteMessage = async (id, token) => {
    return await axios.delete(`${API_URL}/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// ================================
// ⚙️ Intercepteurs Axios
// ================================

// Ajout automatique du token JWT à chaque requête
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Gestion automatique de l’expiration du token
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message;

        if (message === "Token expiré" || message === "Token invalide") {

            // Suppression du token
            localStorage.removeItem("token");

            // Redirection vers la page de connexion
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;
