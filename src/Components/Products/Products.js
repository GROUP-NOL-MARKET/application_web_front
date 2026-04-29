import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sous_category_product } from "../Product_Data";
import {
  faArrowAltCircleRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Preloader from "../Preloader";
import { PanierContext } from "../../Store/Panier_context";
import { FavoriteContext } from "../../Store/Favoris_context";
import { AuthContext } from "../AuthContext";
import VusProduct from "./VusProduct";
import API from "../Authentification/api";
import { Button } from "react-bootstrap";
import { getProductImage } from "../../Utils/Cloudinary";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sous_category = queryParams.get("sous_category");
  const category = queryParams.get("category");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showPopUp, setshowPopUp] = useState(false);
  const closePopUp = () => {
    setshowPopUp(false);
    setSelectedProduct(null);
  };
  const openPopUp = (product) => {
    setSelectedProduct(product);
    setshowPopUp(true);
  };

  const { favorites, removeFavorite, addFavorite } =
    useContext(FavoriteContext);
  const { addProductToCart } = useContext(PanierContext);
  const { isLoggedIn } = useContext(AuthContext);

  // FONCTION DE FORMATAGE DU PRIX
  const formatPrice = (price) => {
    const numericValue = typeof price === 'string' ? parseFloat(price) : price;

    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  const handleNavigation = () => {
    navigate("/all_products");
  };

  const subCategories = sous_category_product.find(
    (item) => item.category === category
  )?.sous_category || [];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await API.get("/products", {
          params: {
            page,
            ...(sous_category ? { sous_category } : {}),
            ...(category ? { category } : {}),
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
  }, [sous_category, page, category]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="container-fluid mt-lg-4 mt-1">
      <div className="row">
        <h1 className="col-md-9 col-lg-8 col-sm-8 col-10 title mt-2 mt-md-0 text-capitalize">
          {sous_category
            ? `${sous_category}`
            : category
              ? `${category}`
              : "Tous les produits"}
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
              <div className="col text-end d-none d-md-block">
                Voir tous les produits <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </div>

            </div>
          </div>
        </div>
      </div>
      <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />
      {category && (
        <div className="dropdown border border-1 p-1 mt-2 d-inline-block" style={{ cursor: "pointer" }}>
          <span
            className="dropdown-toggle texte_brut"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filtrer par : {sous_category || "Toutes"}
          </span>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li
              className="dropdown-item texte_brut"
              onClick={() => navigate(`/products?category=${category}`)}
            >
              Toutes
            </li>

            {subCategories.map((sc, index) => (
              <li
                key={index}
                className="dropdown-item texte_brut"
                onClick={() =>
                  navigate(`/products?category=${category}&sous_category=${sc}`)
                }
              >
                {sc}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="row mt-lg-3 mt-1">
        {products.length > 0
          ? products.map((product) => {
            const toggleFavorite = (product) => {
              const existing = favorites.find(
                (fav) => fav.product_id === product.id
              );

              if (existing) {
                removeFavorite(existing.id);
              } else {
                addFavorite(product.id);
              }
            };
            const isFavorite =
              favorites &&
              favorites.some((fav) => fav.product_id === product.id);

            return (
              <div
                key={product.id}
                className="col-md-3 col-sm-4 col-6 col-lg-2 mb-3"
              >
                <div className="d-flex flex-column p-1 p-md-2 border-md-only h-100">
                  <img
                    src={getProductImage(product.image)}
                    className="img_product"
                    alt={product.name}
                    onClick={() => openPopUp(product)}
                    loading="lazy"
                  />
                  <div className="card-body px-0 pb-0 pt-1">
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

                    {!isLoggedIn ? (
                      <div className="my-1">
                        <Button
                          className="border-0 w-100 btn-panier"
                          onClick={() => addProductToCart(product)}
                          style={{ fontSize: "10px", backgroundColor: "#0066BD" }}
                        >
                          Panier
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex flex-row justify-content-between align-items-center my-1">
                        <Button
                          className="border-0 btn-panier"
                          onClick={() => addProductToCart(product)}
                          style={{ fontSize: "10px", backgroundColor: "#0066BD" }}
                        >
                          Panier
                        </Button>
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
          : navigate("/all_products")}
      </div>

      {/* Pagination */}
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center my-4"
      >
        <ul className="pagination ">
          <li className="page-item">
            <button
              className="page-link"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
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
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
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

export default Products;