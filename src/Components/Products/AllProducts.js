import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import Preloader from "../Preloader";
import { Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext";
import { FavoriteContext } from "../../Store/Favoris_context";
import { PanierContext } from "../../Store/Panier_context";
import { sous_category_product } from "../Product_Data";
import VusProduct from "./VusProduct";
import API from "../Authentification/api";
import { getProductImage } from "../../Utils/Cloudinary";

const AllProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sous_category = queryParams.get("sous_category");

  const categories = sous_category_product.map((item) => item.category);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const closePopUp = () => {
    setSelectedProduct(null);
    setShowPopUp(false);
  };

  const openPopUp = (product) => {
    setSelectedProduct(product);
    setShowPopUp(true);
  };

  const { isLoggedIn } = useContext(AuthContext);
  const { favorites, removeFavorite, addFavorite } =
    useContext(FavoriteContext);
  const { addProductToCart } = useContext(PanierContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const formatPrice = (price) => {
    const numericValue = typeof price === 'string' ? parseFloat(price) : price;

    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await API.get("/products", {
          params: {
            page,
            ...(sous_category && sous_category.trim() !== ""
              ? { sous_category }
              : {}),
          },
        });

        const result = response.data;
        setProducts(result.data);
        setTotalPages(result.total_pages);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sous_category, page]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="container-fluid mt-4">
      {/* En-tête */}
      <div className="row">
        <h1 className="col-md-9 col-lg-10 col-sm-8 col-6 title mt-2 mt-md-0">
          {sous_category ? `${sous_category}` : "Tous les produits"}
        </h1>
        <div
          className="dropdown border border-0 p-1 mt-2 col text-end"
          style={{ cursor: "pointer" }}
        >
          <span
            className="dropdown-toggle texte_brut"
            id="dropdownMenuCategories"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filtrer par catégorie
          </span>

          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuCategories"
          >
            {categories.map((cat, index) => (
              <li
                key={index}
                className="dropdown-item texte_brut"
                onClick={() =>
                (window.location.href = `/products?category=${encodeURIComponent(
                  cat
                )}`)
                }
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />

      {/* Liste des produits */}
      <div className="row mt-md-3 mt-0 ">
        {products.length > 0 ? (
          products.map((product) => {
            const toggleFavorite = (product) => {
              const existing = favorites.find(
                (fav) => fav.product_id === product.id
              );

              if (existing) {
                // Le produit est déjà dans les favoris → SUPPRESSION
                removeFavorite(existing.id);
              } else {
                // Le produit n'est pas favori → AJOUT
                addFavorite(product.id);
              }
            };
            const isFavorite =
              favorites &&
              favorites.some((fav) => fav.product_id === product.id);

            return (
              <div
                key={product.id}
                className="col-md-3 col-sm-4 col-lg-2 mb-3 col-6"
              >
                <div className="d-flex flex-column border-md-only p-1 p-md-2 h-100 mt-2 ">
                  <img
                    src={getProductImage(product.image)}
                    className="img_product "
                    alt={product.name}
                    onClick={() => openPopUp(product)}
                    loading="lazy"
                  />
                  <div className="card-body  px-0 pb-0 pt-1">
                    <h5
                      className="text-truncate petit_titre mb-1"
                      style={{ textTransform: "none" }}
                      title={product.name}
                    >
                      {product.name}
                    </h5>
                    <p className="card-text petit_titre fw-bold mb-1">
                      {formatPrice(product.price)} FCFA
                    </p>
                    <h5
                      className="card-text petit_titre text-truncate mb-1"
                      title={product.sous_category}
                    >
                      {product.sous_category}
                    </h5>

                    <div className="d-flex flex-row justify-content-between align-items-center my-1">
                      <Button
                        className="border-0 btn-panier"
                        onClick={() => addProductToCart(product)}
                        style={{ fontSize: "10px", backgroundColor: "#0066BD" }}
                      >
                        <span className="d-inline">Panier</span>
                        <FontAwesomeIcon className="d-sm-none" icon={faCartShopping} />
                      </Button>

                      {isLoggedIn && (
                        <FontAwesomeIcon
                          icon={faHeart}
                          onClick={() => toggleFavorite(product)}
                          style={{
                            cursor: "pointer",
                            color: isFavorite ? "red" : "#FA7F1B",
                            transition: "0.2s",
                            fontSize: "14px"
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted">
            Aucun produit trouvé{" "}
            {sous_category ? "dans cette sous-catégorie" : ""}.
          </p>
        )}
      </div>

      {/* Pagination */}
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center my-4"
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              &laquo;
            </button>
          </li>

          <li className="page-item" style={{ width: "150px " }}>
            <span className="page-link w-100">
              Page {page} / {totalPages}
            </span>
          </li>

          <li className="page-item">
            <button
              className="page-link"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
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

export default AllProducts;
