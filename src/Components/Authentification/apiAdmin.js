import axios from "axios";

// ================================
//  Configuration de base
// ================================
const API_URL = "http://localhost:8000/api";

const APIAdmin = axios.create({
    baseURL: API_URL,
});

// ================================
//  Intercepteurs Axios
// ================================

APIAdmin.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isLoggingOut = false; // évite de déclencher plusieurs fois la déconnexion

APIAdmin.interceptors.response.use(
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

export default APIAdmin;
