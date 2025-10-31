import axios from "axios";

// ================================
//  Configuration de base
// ================================
const API_URL = "http://127.0.0.1:8000/api";

const API = axios.create({
    baseURL: API_URL,
});

// ================================
//  Intercepteurs Axios
// ================================

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isLoggingOut = false; // évite de déclencher plusieurs fois la déconnexion

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message;

        if (
            message === "Token expiré" ||
            message === "Token invalide" ||
            error.response?.status === 401
        ) {
            if (!isLoggingOut) {
                isLoggingOut = true;
                window.dispatchEvent(new Event("tokenExpired"));
                // on peut aussi vider localStorage immédiatement pour éviter d’autres appels
                localStorage.removeItem("adminToken");
            }
        }

        return Promise.reject(error);
    }
);

export default API;
