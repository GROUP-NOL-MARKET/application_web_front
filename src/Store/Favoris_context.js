import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../Components/Authentification/api";


export const FavoriteContext = createContext({
  favorites: [],
  addFavorite: async () => { },
  removeFavorite: async () => { },
  fetchFavorites: async () => { },
});
export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  // Charger les favoris depuis l’API Laravel 
  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await API.get("/favorites");

      setFavorites(
        Array.isArray(res.data.favorites) ? res.data.favorites : []
      );
    } catch (error) {
      console.error("Erreur chargement favoris :", error);
    } finally {
      setIsLoading(false);
    }
  };



  // Ajouter un produit aux favoris 
  const addFavorite = async (productId) => {
    try {
      const res = await API.post("/favorites", { product_id: productId, });
      toast.success("Produit ajouté aux favoris");
      // Ajout correct 
      setFavorites((prev) => [...prev, res.data.favorite]);
    }
    catch (error) {
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
      toast.error("Erreur lors de la suppression"); console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) { fetchFavorites(); }
  }, []);

  return (
    <FavoriteContext.Provider value={{ isLoading, favorites, addFavorite, removeFavorite, fetchFavorites }} >
      {children}
    </FavoriteContext.Provider>
  );
};