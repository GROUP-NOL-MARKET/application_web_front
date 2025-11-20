import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../Components/Authentification/api";

export const FavoriteContext = createContext({
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
  fetchFavorites: async () => {},
});

export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis l’API Laravel

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/favorites");
      setFavorites(res.data);
    } catch (error) {
      console.error("Erreur chargement favoris :", error);
    }
  };

  // Ajouter un produit aux favoris
  const addFavorite = async (productId) => {
    try {
      const res = await API.post("/favorites", {
        product_id: productId,
      });

      toast.success("Produit ajouté aux favoris");
      setFavorites((prev) => [...prev, res.data.favorite]);
    } catch (error) {
      toast.error("Impossible d’ajouter aux favoris");
      console.error(error);
    }
  };

  // Supprimer un favori
  const removeFavorite = async (favoriteId) => {
    try {
      await API.delete(`/favorites/${favoriteId}`);

      toast.info("Favori supprimé");
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error(error);
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
