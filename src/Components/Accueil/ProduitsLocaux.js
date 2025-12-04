import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { PanierContext } from "../../Store/Panier_context";
import { FavoriteContext } from "../../Store/Favoris_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import "../../Styles/Header.css";
import "../../Styles/Content.css";
import { AuthContext } from "../AuthContext";
import VusProduct from "../Products/VusProduct";
import API from "../Authentification/api";
import divers from "../assets/Images/divers.avif";

const ProduitsLocaux = () => {
  const { addProductToCart } = useContext(PanierContext);
  const { addFavorite, favorites, removeFavorite } =
    useContext(FavoriteContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (!image) return divers; // Optionnel: une image par défaut

    if (typeof image === "string" && image.startsWith("https")) {
      return image; // URL complète déjà fournie
    }

    // Construit automatiquement l'URL depuis l'API actuelle (dev ou prod)
    return `${API.defaults.baseURL}/storage/${image}`;
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopUp, setshowPopUp] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const closePopUp = () => {
    setshowPopUp(false);
    setSelectedProduct(null);
  };

  const openPopUp = (product) => {
    setSelectedProduct(product);
    setshowPopUp(true);
  };

  //  Chargement des produits avec cache session
  useEffect(() => {
    const fetchProducts = async () => {
      const cachedProducts = sessionStorage.getItem("produits_locaux");

      // Charger depuis le cache si disponible
      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
        setLoading(false);
      }

      // Toujours tenter de rafraîchir depuis l'API
      try {
        const response = await API.get("/products/limited", {
          params: {
            category: "Produits Locaux",
            limit: 10,
          },
        });

        setProducts(response.data.data);
        sessionStorage.setItem("produits_locaux", JSON.stringify(response.data.data));
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Mémorisation
  const memoizedProducts = useMemo(() => products, [products]);

  const handleNavigation2 = useCallback(
    (category) => {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    },
    [navigate]
  );

  const handleAddToCart = useCallback(
    (product) => addProductToCart(product),
    [addProductToCart]
  );

  // const handleAddFavorite = useCallback((id) => addFavorite(id), [addFavorite]);

  return (
    <div className="container mt-md-5">
      {/* --- Titre --- */}
      <div className="row">
        <h1 className="col-md-9 col-lg-10 col-sm-8 col-10 title mt-3 mt-md-0">
          Produits Locaux
        </h1>
        <div className="col-md-3 col-lg-2 col-sm-4 col-2 mt-3 mt-md-0">
          <div
            className="voir_tout"
            onClick={() => handleNavigation2("Produits Locaux")}
            style={{
              textDecoration: "none",
              color: "#FA7F1B",
              cursor: "pointer",
            }}
          >
            <div className="row d-flex align-content-end">
              <div className="col-8 text-end d-none d-sm-block">Voir tout</div>
              <div className="col-1">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </div>
            </div>
          </div>
        </div>
        <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />
      </div>

      {/* ---  Message de chargement sous le titre --- */}
      {loading ? (
        <div className="text-center py-4">Chargement des produits...</div>
      ) : memoizedProducts.length > 0 ? (
        <>
          {/* --- Swiper Desktop --- */}
          <Swiper
            modules={[Navigation]}
            navigation
            loop={memoizedProducts.length > 6}
            slidesPerView={6}
            spaceBetween={15}
            className="Liste_produits d-none d-lg-block mt-2"
          >
            {memoizedProducts.map((product) => {
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
                <SwiperSlide
                  key={product.id}
                  className="product_slide border border-1 shadow-sm"
                >
                  <img
                    loading="lazy"
                    src={getImageUrl(product.image)}
                    alt={product.name ?? "Produit"}
                    className="img_product swiper-lazy"
                    onClick={() => openPopUp(product)}
                  />
                  <div className="border border-1 border-top w-100 text-center py-2">
                    <div className="product_title fw-bold petit_titre">
                      {product.name}
                    </div>
                    <div className="text-muted">{product.price} FCFA</div>
                    <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        onClick={() => handleAddToCart(product)}
                        style={{ cursor: "pointer" }}
                      />
                      {isLoggedIn && (
                        <FontAwesomeIcon
                          icon={faHeart}
                          onClick={() => toggleFavorite(product)}
                          style={{
                            cursor: "pointer",
                            color: !isFavorite ? "#FA7F1B" : "red",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* --- Carrousel mobile --- */}
          <div className="embla d-lg-none mt-2">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {memoizedProducts.map((product) => {
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
                      className="embla__slide border border-1 rounded-3 d-flex flex-column align-items-center me-2 shadow-sm"
                    >
                      <img
                        loading="lazy"
                        src={getImageUrl(product.image)}
                        alt={product.name ?? "Produit"}
                        className="img_product"
                        onClick={() => openPopUp(product)}
                      />
                      <div className="text-center mt-2">
                        <div className="fw-bold petit_titre">
                          {product.name}
                        </div>
                        <div className="text-muted small">
                          {product.price} FCFA
                        </div>
                        <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            onClick={() => handleAddToCart(product)}
                            style={{ cursor: "pointer" }}
                          />
                          {isLoggedIn && (
                            <FontAwesomeIcon
                              icon={faHeart}
                              onClick={() => toggleFavorite(product)}
                              style={{
                                cursor: "pointer",
                                color: !isFavorite ? "#FA7F1B" : "red",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-4">Aucun produit trouvé</div>
      )}

      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default ProduitsLocaux;
