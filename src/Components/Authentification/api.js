import axios from "axios";

// ======================================
//   BASE URL depuis .env
// ======================================


const API_URL = "http://localhost:8000/api";

//process.env.REACT_APP_API_URL ||



// Création d'une instance Axios
const API = axios.create({
  baseURL: API_URL,
});

// ======================================
//   Messages API
// ======================================

// Récupérer les messages
export const getMessages = async (token, page = 1, sort = "récent") => {
  const sortParam = sort === "anciens" ? "anciens" : "recent";

  const res = await API.get(`/messages?page=${page}&sort=${sortParam}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// Supprimer un message
export const deleteMessage = async (id, token) => {
  return await API.delete(`/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ======================================
//   Intercepteurs Axios
// ======================================

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isLoggingOut = false;

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("token");
    const message = error.response?.data?.message;
    const status = error.response?.status;

    // Si on recevait un 401/erreur d'auth et qu'il y avait un token,
    // on considère que le token a expiré / est invalide.
    if (token && (message === "Token expiré" || message === "Token invalide" || status === 401)) {
      if (!isLoggingOut) {
        isLoggingOut = true;
        window.dispatchEvent(new Event("tokenExpired"));
        localStorage.removeItem("token");
      }
    }

    return Promise.reject(error);
  }
);

export default API;
