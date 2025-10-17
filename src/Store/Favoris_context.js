
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const FavoriteContext = createContext({
    favorites: [],
    addFavorite: async () => { },
    removeFavorite: async () => { },
    fetchFavorites: async () => { },
});

export const FavoriteContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Charger les favoris depuis l’API Laravel
    const fetchFavorites = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/favorites", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) throw new Error("Erreur de chargement des favoris");

            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    // Ajouter un produit aux favoris
    const addFavorite = async (productId) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ product_id: productId }),
            });

            if (!response.ok) throw new Error("Erreur lors de l’ajout aux favoris");

            const result = await response.json();
            toast.success("Produit ajouté aux favoris");
            setFavorites((prev) => [...prev, result.favorite]);
        } catch (error) {
            toast.error("Impossible d’ajouter aux favoris");
            console.error(error);
        }
    };

    // Supprimer un favori
    const removeFavorite = async (favoriteId) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/favorites/${favoriteId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Erreur lors de la suppression");

            toast.info("Favori supprimé");
            setFavorites((prev) =>
                prev.filter((fav) => fav.id !== favoriteId)
            );
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <FavoriteContext.Provider
            value={{ favorites, addFavorite, removeFavorite, fetchFavorites }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};
