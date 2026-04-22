import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API_URL from "../Components/Authentification/api";

/**
 * Ouvre une popup OAuth et attend le redirect callback
 */
export const useSocialAuth = () => {
    const navigate = useNavigate();

    const handleSocialLogin = async (provider) => {


        try {
            // 1. Demander l'URL de redirection au backend
            const res = await fetch(`${API_URL}/auth/${provider}/redirect`, {
                credentials: "include",
            });

            if (!res.ok) throw new Error("Erreur lors de la récupération de l'URL OAuth");

            const { url } = await res.json();

            // 2. Ouvrir une popup
            const popup = window.open(url, "_blank", "width=500,height=600");

            // 3. Écouter la fermeture de la popup (si l'utilisateur ferme manuellement)
            const timer = setInterval(() => {
                if (popup?.closed) {
                    clearInterval(timer);
                }
            }, 500);
        } catch (error) {
            console.error("Social login error:", error);
            alert("Une erreur est survenue lors de la connexion sociale.");
        }
    };

    return { handleSocialLogin };
};