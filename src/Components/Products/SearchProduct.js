import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FavoriteContext } from "../../Store/Favoris_context";
import { PanierContext } from "../../Store/Panier_context";
import { AuthContext } from "../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import VusProduct from "./VusProduct";
import API from "../Authentification/api";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showPopUp, setshowPopUp] = useState(false);

  const closePopUp = () => {
    setSelectedProduct(null);
    setshowPopUp(false);
  };
  const openPopUp = (product) => {
    setSelectedProduct(product);
    setshowPopUp(true);
  };

  const navigate = useNavigate();

  const { addFavorite, removeFavorite, favorites } = useContext(FavoriteContext);
  const { addProductToCart } = useContext(PanierContext);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      setProducts(JSON.parse(storedResults));
      localStorage.removeItem("searchResults");
    } else if (query) {
      // Fallback API si pas dans le localStorage
      const fetchProducts = async () => {
        try {
          const res = await API.get(
            `/products/search?q=${encodeURIComponent(query)}`
          );
          const data = res.data?.data ?? [];
          setProducts(data);
        } catch (error) {
          console.error("Erreur fetch produits recherche:", error);
        }
      };

      fetchProducts();
    }
  }, [location.search]);

  const handleNavigation = () => {
    navigate("/all_products");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <h1 className="col-md-9 col-lg-8 col-sm-8 col-10 title mt-5 mt-md-0 text-capitalize">
          Résultats de la recherche
        </h1>
        <div className="col-md-3 col-lg-4 col-sm-4 col-2 mt-2 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={handleNavigation}
              className="row d-flex align-content-end"
              style={{
                textDecoration: "none",
                color: "#FA7F1B",
                cursor: "pointer",
              }}
            >
              <div className="col-8 text-end d-none d-md-block">
                Voir tous les produits
              </div>
              <div className="col-1">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />
      {products.length > 0 ? (
        <div className="row mt-2">
          {products.map((prod) => {
            const toggleFavorite = (prod) => {
              const existing = favorites.find(
                (fav) => fav.product_id === prod.id
              );

              if (existing) {
                // Le produit est déjà dans les favoris → SUPPRESSION
                removeFavorite(existing.id);
              } else {
                // Le produit n'est pas favori → AJOUT
                addFavorite(prod.id);
              }
            };
            const isFavorite =
              favorites && favorites.some((fav) => fav.product_id === prod.id);

            return (
              <div
                key={prod.id}
                className="col-md-3 col-sm-4 col-lg-2 col-6 mb-4"
              >
                <div className="d-flex flex-column shadow-sm border border-1 p-2">
                  <img
                    src={prod.image}
                    className="card-img-top img_product"
                    alt={prod.name}
                    onClick={() => openPopUp(prod)}
                  />
                  <div className="card-body">
                    <h5 className="card-truncate petit_titre">{prod.name}</h5>
                    <p className="card-text petit_titre fw-bold">
                      {prod.price.toLocaleString()} FCFA
                    </p>
                    {!isLoggedIn ? (
                      <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          onClick={() => addProductToCart(prod)}
                          style={{ cursor: "pointer", color: "#0066BD" }}
                        />
                      </div>
                    ) : (
                      <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          onClick={() => addProductToCart(prod)}
                          style={{ cursor: "pointer" }}
                        />
                        <FontAwesomeIcon
                          icon={faHeart}
                          onClick={() => toggleFavorite(prod)}
                          style={{
                            cursor: "pointer",
                            color: isFavorite ? "red" : "#FA7F1B",
                            transition: "0.2s",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          ;
        </div>
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default SearchProduct;
