import { useContext, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FavoriteContext } from "../../Store/Favoris_context";
import { PanierContext } from "../../Store/Panier_context";
import { Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../AuthContext";
import API from "../Authentification/api";
import { getProductImage } from "../../Utils/Cloudinary";

const VusProduct = ({ closePopUp, product }) => {
  const { addFavorite, favorites, removeFavorite } = useContext(FavoriteContext);
  const { addProductToCart } = useContext(PanierContext);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  // Bloque le scroll en arrière-plan à l'ouverture
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Débloque quand le popup se ferme
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  // Vérifie si le produit est dans les favoris
  const isFavorite = favorites?.some((fav) => fav.product_id === product.id);

  // Fonction toggle favorite
  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      const fav = favorites.find((f) => f.product_id === product.id);
      removeFavorite(fav.id);
    } else {
      addFavorite(product.id);
    }
  }, [isFavorite, favorites, product.id, addFavorite, removeFavorite]);

  const formatPrice = (price) => {
    const numericValue = typeof price === 'string' ? parseFloat(price) : price;

    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  // Enregistrement vue récente
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && product?.id) {
      const registerView = async () => {
        try {
          await API.post(
            "/recent-views",
            { product_id: product.id },
          );
        } catch (error) {
          console.error("Erreur ajout vue récente :", error.response.data.message);
        }
      };

      registerView();
    }
  }, [product]);

  return (
    <div className="popup-overlay">
      <div className="popup shadow-sm p-3 rounded-3">
        <button
          onClick={closePopUp}
          className="bouton-close text-xxl"
          style={{ color: "red" }}
        >
          ✕
        </button>
        <div className="row">
          <div className="col-lg-6 col-12 me-2">
            <img
              src={getProductImage(product.image)}
              alt={product.name}
              className="image_vus_product"
            />
          </div>

          <div className="col-lg col-12">
            <h5 className="name_entreprise_dashboard mt-4" style={{ textTransform: "none" }}>{product.name}</h5>
            <h5 className="petit_titre fw-bold">
              {formatPrice(product.price || product.new_price)} FCFA
            </h5>
            <p className="texte_brut">{product.description ? product.description : "Description non disponible pour l'instant"}</p>
          </div>

          <div className="d-flex flex-row justify-content-center gap-3 mt-2">
            <Button onClick={() => addProductToCart(product)}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <span>
                  <span className="petit_titre">Ajouter au panier</span>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="ms-2"
                  />
                </span>
              )}
            </Button>

            {/* BOUTON FAVORI */}
            <Button
              onClick={toggleFavorite}
              style={{ backgroundColor: isFavorite ? "red" : "#FA7F1B", }}
              className="border-0"
              disabled={!isLoggedIn}
            >
              <span className="petit_titre">
                {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </span>

              <FontAwesomeIcon
                icon={faHeart}
                className="ms-2"
                style={{
                  cursor: "pointer",
                  color: "white",
                  transition: "0.2s",
                }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VusProduct;
