import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Preloader from "../Preloader";
import { PanierContext } from "../../Store/Panier_context";
import { FavoriteContext } from "../../Store/Favoris_context";
import { AuthContext } from "../AuthContext";
import VusProduct from "./VusProduct";
import API from "../Authentification/api";
import { getProductImage } from "../../Utils/Cloudinary";

const Promotion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sous_category = queryParams.get("sous_category");
  const category = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const { addFavorite } = useContext(FavoriteContext);
  const { addProductToCart } = useContext(PanierContext);
  const { isLoggedIn } = useContext(AuthContext);

  const closePopUp = () => {
    setSelectedProduct(null);
    setShowPopUp(false);
  };

  const openPopUp = (product) => {
    setSelectedProduct(product);
    setShowPopUp(true);
  };

  // const getImageUrl = (image) => {
  //   if (!image) return "/placeholder.png";
  //   if (image.startsWith("http")) return image;
  //   return `${API.defaults.baseURL}/storage/${image}`;
  // };

  const formatPrice = (price) => {
    const numericValue = typeof price === 'string' ? parseFloat(price) : price;

    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get("/promos", {
        params: {
          page,
          ...(sous_category && { sous_category }),
          ...(category && { category }),
        },
      });

      setProducts(response.data.data || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (e) {
      console.error("Erreur produits :", e);
    } finally {
      setLoading(false);
    }
  }, [page, sous_category, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const memoizedProducts = useMemo(() => products, [products]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Preloader />
      </div>
    );
  }

  if (products.length === 0) {
    return navigate("/all_products");
  }

  return (
    <div className="container-fluid mt-lg-4 mt-1">
      {/* --- Header --- */}
      <div className="row">
        <h1 className="col-9 title text-capitalize mt-2">
          {sous_category
            ? sous_category
            : category
              ? category
              : "Tous les produits"}
        </h1>

        <div className="col-3 text-end mt-2">
          <div
            className="voir_tout"
            onClick={() => navigate("/all_products")}
            style={{ cursor: "pointer", color: "#FA7F1B" }}
          >
            <span className="d-none d-md-inline">Voir tous</span>
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="ms-1" />
          </div>
        </div>
      </div>

      <hr style={{ border: "1px solid #FA7F1B" }} />

      {/* --- Liste des produits version FlashSale mais en grille --- */}
      <div className="row mt-3">
        {memoizedProducts.map((product) => {
          const hasPromo = product.initial_price && product.price;

          return (
            <div
              key={product.id}
              className="col-lg-2 col-md-3 col-6 mb-3 d-flex"
            >
              <div
                className="border-md-only p-1 p-md-2 rounded-3 w-100 position-relative"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={getProductImage(product.image, { width: 300, height: 300 })}
                  alt={product.name}
                  className="img_product w-100 border rounded"
                  onClick={() => openPopUp(product)}
                  loading="lazy"
                />

                {/* Badge Promotion */}
                {product.pourcentage_vendu && (
                  <div
                    style={{
                      position: "absolute",
                      background: "#FA7F1B",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      top: "8px",
                      right: "8px",
                      fontSize: "10px",
                    }}
                  >
                    -{product.pourcentage_vendu}%
                  </div>
                )}

                {/* Nom */}
                <div
                  className="petit_titre text-truncate text-center mt-1"
                  title={product.name}
                  style={{ fontWeight: "600", textTransform: "none" }}
                >
                  {product.name}
                </div>

                {/* Prix */}
                <div className="text-center">
                  <span className="new_price fw-bold" style={{ fontSize: "11px" }}>
                    {formatPrice(product.price)} FCFA
                  </span>
                  {hasPromo && (
                    <span
                      className="text-muted ms-1"
                      style={{ fontSize: "10px" }}
                    >
                      <s>{product.initial_price} FCFA</s>
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-center gap-3 mt-1">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    onClick={() => addProductToCart(product)}
                    style={{ cursor: "pointer", color: "#0066BD", fontSize: "14px" }}
                  />
                  {isLoggedIn && (
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={() => addFavorite(product.id)}
                      style={{ cursor: "pointer", color: "#FA7F1B", fontSize: "14px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Pagination --- */}
      <nav className="d-flex justify-content-center my-4">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &laquo;
            </button>
          </li>

          <li className="page-item">
            <span className="page-link">
              Page {page} / {totalPages}
            </span>
          </li>

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>

      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default Promotion;
