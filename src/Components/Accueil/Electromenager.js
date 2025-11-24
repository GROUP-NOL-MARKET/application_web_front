import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Store/ProductsSlice";
import Preloader from "../Preloader";
import { AuthContext } from "../AuthContext";
import { FavoriteContext } from "../../Store/Favoris_context";
import { PanierContext } from "../../Store/Panier_context";
import VusProduct from "../Products/VusProduct";
import API from "../Authentification/api";

const CACHE_KEY = "materiels_nasco_products_v1";

const Electromenager = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // popup state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  // local products state (priorise cache -> redux)
  const [localProducts, setLocalProducts] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [cacheError, setCacheError] = useState(null);

  // contexts
  const { isLoggedIn } = useContext(AuthContext);
  const addFavorite = useContext(FavoriteContext);
  const addProductToCart = useContext(PanierContext);

  // Redux slice
  const { items, status } = useSelector((state) => state.products);
  const productsFromRedux = items["Matériels Nasco"] || [];

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png"; // Optionnel: une image par défaut

    if (typeof image === "string" && image.startsWith("https")) {
      return image; // URL complète déjà fournie
    }

    // Construit automatiquement l'URL depuis l'API actuelle (dev ou prod)
    return `${API.defaults.baseURL}/storage/${image}`;
  };

  // ---- On mount: try sessionStorage cache first ----
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLocalProducts(parsed);
          setLoadingLocal(false);
          return; // use cache, skip immediate fetch
        }
      }
    } catch (err) {
      console.warn("Erreur lecture cache Electromenager:", err);
      setCacheError("Erreur cache");
    }
    // If no cache, keep loadingLocal true and allow next effect to fetch
  }, []);

  // ---- Keep localProducts in sync with Redux when Redux provides data ----
  useEffect(() => {
    if (productsFromRedux && productsFromRedux.length > 0) {
      setLocalProducts(productsFromRedux);
      setLoadingLocal(false);
      // update cache
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(productsFromRedux));
      } catch (err) {
        console.log("Impossible d'écrire le cache Electromenager :", err);
      }
    }
  }, [productsFromRedux]);

  // ---- If nothing in cache and redux empty, dispatch fetch once ----
  useEffect(() => {
    const shouldFetch =
      (!localProducts || localProducts.length === 0) &&
      (!productsFromRedux || productsFromRedux.length === 0) &&
      status !== "loading";

    if (shouldFetch) {
      dispatch(fetchProducts("Matériels Nasco"));
    }
    // note: dispatch is stable
  }, [localProducts, productsFromRedux, status, dispatch]);

  // ---- Callbacks ----
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

  const handleAddFavorite = useCallback(
    (productId) => addFavorite(productId),
    [addFavorite]
  );

  const openPopUp = useCallback((product) => {
    setSelectedProduct(product);
    setShowPopUp(true);
  }, []);

  const closePopUp = useCallback(() => {
    setShowPopUp(false);
    setSelectedProduct(null);
  }, []);

  // ---- Memoize products for render ----
  const memoizedProducts = useMemo(() => localProducts || [], [localProducts]);

  // ---- Compute overall loading state shown under title ----
  // show loading if we are still loading local (cache check) OR redux is loading and no local products yet
  const isLoading =
    loadingLocal || (status === "loading" && memoizedProducts.length === 0);

  return (
    <div className="container mt-1 mt-md-5">
      {/* --- Titre et Voir tout --- */}
      <div className="row">
        <h1 className="col-md-9 col-lg-10 col-sm-8 col-10 title mt-5 mt-md-0">
          Électroménager
        </h1>
        <div className="col-md-3 col-lg-2 col-sm-4 col-2 mt-5 mt-md-0">
          <div
            className="voir_tout"
            onClick={() => handleNavigation2("Electroménager")}
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

      {/* --- Message de chargement / erreur / aucun produit (sous le titre) --- */}
      {isLoading ? (
        <div className="text-center py-4">
          {/* si tu as un Preloader, tu peux l'utiliser */}
          <Preloader />
        </div>
      ) : cacheError ? (
        <div className="text-center py-4 text-danger">{cacheError}</div>
      ) : memoizedProducts.length === 0 ? (
        <div className="text-center py-4">Aucun produit trouvé</div>
      ) : null}

      {/* --- Swiper Desktop --- */}
      {/* On affiche le Swiper seulement si on a des produits (et pas si on est en loading) */}
      {!isLoading && memoizedProducts.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation
          loop={memoizedProducts.length > 6}
          slidesPerView={6}
          spaceBetween={15}
          className="Liste_produits d-none d-lg-block mt-2"
        >
          {memoizedProducts.map((product) => (
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
                <div className="text-muted">
                  {product.price ?? product.new_price ?? "—"} FCFA
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
                      onClick={() => handleAddFavorite(product.id)}
                      style={{ cursor: "pointer", color: "#FA7F1B" }}
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* --- Embla Mobile --- */}
      {!isLoading && memoizedProducts.length > 0 && (
        <div className="embla d-lg-none mt-2">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {memoizedProducts.map((product) => (
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
                    <div className="petit_titre fw-bold">{product.name}</div>
                    <div className="text-muted small">
                      {product.price ?? "—"} FCFA
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
                          onClick={() => handleAddFavorite(product.id)}
                          style={{ cursor: "pointer", color: "#FA7F1B" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pop-up */}
      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default React.memo(Electromenager);
