import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const APIAdmin = axios.create({
    baseURL: API_URL,
});

APIAdmin.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

APIAdmin.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        const isAuthError =
            status === 401 &&
            (message === "Token expired" || message === "Token invalid" || message === "Authentification requise" || message === "User not found");

        const isLoginRoute = error.config?.url?.includes("/admin/login");

        if (isAuthError && !isLoginRoute) {
            localStorage.removeItem("adminToken");
            // Réinitialise avant de rediriger
            window.location.href = "/admin/login";
        }

        return Promise.reject(error);
    }
);

export default APIAdmin;