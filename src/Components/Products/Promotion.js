import { useContext, useEffect, useState } from "react";
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

const Promotion = () => {
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

  const { addFavorite } = useContext(FavoriteContext);
  const { addProductToCart } = useContext(PanierContext);
  const { isLoggedIn } = useContext(AuthContext);

  const handleNavigation = () => {
    navigate("/all_products");
  };

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
    <div className="container mt-lg-4 mt-1">
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

      <div className="row mt-lg-3 mt-1">
        {products.length > 0
          ? products.map((product) => (
              <div key={product.id} className="col-md-2 col-6 shadow-sm mb-4">
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top img_product"
                    alt={product.name}
                    onClick={() => openPopUp(product)}
                  />
                  <div className="card-body">
                    <h5 className="card-title petit_titre">{product.name}</h5>
                    <p className="card-text petit_titre fw-bold">
                      {product.price} FCFA
                    </p>
                    {!isLoggedIn ? (
                      <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          onClick={() => addProductToCart(product)}
                          style={{ cursor: "pointer", color: "#0066BD" }}
                        />
                      </div>
                    ) : (
                      <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          onClick={() => addProductToCart(product)}
                          style={{ cursor: "pointer" }}
                        />
                        <FontAwesomeIcon
                          icon={faHeart}
                          onClick={() => addFavorite(product.id)}
                          style={{ cursor: "pointer", color: "#FA7F1B" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
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
          <li className="page-item">
            <span className="page-link">
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

export default Promotion;
