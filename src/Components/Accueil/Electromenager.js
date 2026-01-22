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
import { fetchLimitedProducts } from "../../Store/ProductsSlice";
import Preloader from "../Preloader";
import { AuthContext } from "../AuthContext";
import { FavoriteContext } from "../../Store/Favoris_context";
import { PanierContext } from "../../Store/Panier_context";
import VusProduct from "../Products/VusProduct";
import API from "../Authentification/api";

const CATEGORY = "Électroménager";
const CACHE_KEY = "electromenager_products_v1";

const Electromenager = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const [localProducts, setLocalProducts] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [cacheError, setCacheError] = useState(null);

  const { isLoggedIn } = useContext(AuthContext);
  const { addFavorite, favorites, removeFavorite } = useContext(FavoriteContext);
  const { addProductToCart } = useContext(PanierContext);

  const { items, status } = useSelector((state) => state.products);
  const productsFromRedux = items[CATEGORY] || [];

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";
    if (typeof image === "string" && image.startsWith("https")) return image;
    return `${API.defaults.baseURL}/storage/${image}`;
  };

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLocalProducts(parsed);
          setLoadingLocal(false);
          return;
        }
      }
    } catch (err) {
      setCacheError("Erreur cache");
    }
  }, []);

  useEffect(() => {
    if (productsFromRedux.length > 0) {
      setLocalProducts(productsFromRedux);
      setLoadingLocal(false);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(productsFromRedux));
      } catch { }
    }
  }, [productsFromRedux]);

  useEffect(() => {
    const shouldFetch =
      localProducts.length === 0 &&
      productsFromRedux.length === 0 &&
      status !== "loading";

    if (shouldFetch) {
      dispatch(fetchLimitedProducts({ category: CATEGORY, limit: 12 }));
    }
  }, [localProducts, productsFromRedux, status, dispatch]);

  const handleNavigation2 = useCallback(
    (category) => navigate(`/products?category=${encodeURIComponent(category)}`),
    [navigate]
  );

  const handleAddToCart = useCallback(
    (product) => addProductToCart(product),
    [addProductToCart]
  );

  const openPopUp = useCallback((product) => {
    setSelectedProduct(product);
    setShowPopUp(true);
  }, []);

  const closePopUp = useCallback(() => {
    setShowPopUp(false);
    setSelectedProduct(null);
  }, []);

  const memoizedProducts = useMemo(
    () => localProducts.slice(0, 12),
    [localProducts]
  );

  const isLoading =
    loadingLocal || (status === "loading" && memoizedProducts.length === 0);

  return (
    <div className="container mt-1 mt-md-5">
      <div className="row">
        <h1 className="col-8 title mt-3 mt-md-0">
          Électroménager
        </h1>
        <div className="col mt-3 mt-md-0">
          <div
            className="voir_tout"
            onClick={() => handleNavigation2(CATEGORY)}
            style={{ color: "#FA7F1B", cursor: "pointer" }}
          >
            <div className="row d-flex align-content-end">
              <div className="col text-end"> Voir plus <FontAwesomeIcon icon={faArrowAltCircleRight} /></div>
            </div>
          </div>
        </div>
        <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <Preloader />
        </div>
      ) : cacheError ? (
        <div className="text-center py-4 text-danger">{cacheError}</div>
      ) : memoizedProducts.length === 0 ? (
        <div className="text-center py-4">Aucun produit trouvé</div>
      ) : null}

      {!isLoading && memoizedProducts.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation
          loop={memoizedProducts.length > 6}
          slidesPerView={6}
          spaceBetween={15}
          className="Liste_produits d-none d-lg-block mt-2"
        >
          {memoizedProducts.map((product) => {
            const isFavorite =
              favorites.some((fav) => fav.product_id === product.id);
            const toggleFavorite = () =>
              isFavorite
                ? removeFavorite(
                  favorites.find((f) => f.product_id === product.id).id
                )
                : addFavorite(product.id);

            return (
              <SwiperSlide
                key={product.id}
                className="product_slide border border-1 shadow-sm"
              >
                <img
                  loading="lazy"
                  src={product.image}
                  alt={product.name}
                  className="img_product"
                  onClick={() => openPopUp(product)}
                />
                <div className="border-top w-100 text-center py-2">
                  <div className="fw-bold petit_titre text-truncate text-lowercase" title={product.name}>{product.name}</div>
                  <div className="text-muted text-primary">
                    {product.price ?? product.new_price ?? "—"} FCFA
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-2">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      onClick={() => handleAddToCart(product)}
                      style={{ cursor: "pointer" }}
                    />
                    {isLoggedIn && (
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={toggleFavorite}
                        style={{ cursor: "pointer", color: isFavorite ? "red" : "#FA7F1B" }}
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {!isLoading && memoizedProducts.length > 0 && (
        <div className="embla d-lg-none mt-2">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {memoizedProducts.map((product) => {
                const isFavorite =
                  favorites.some((fav) => fav.product_id === product.id);
                const toggleFavorite = () =>
                  isFavorite
                    ? removeFavorite(
                      favorites.find((f) => f.product_id === product.id).id
                    )
                    : addFavorite(product.id);

                return (
                  <div
                    key={product.id}
                    className="embla__slide border rounded-3 me-2 shadow-sm"
                  >
                    <img
                      loading="lazy"
                      src={product.image}
                      alt={product.name}
                      className="img_product"
                      onClick={() => openPopUp(product)}
                    />

                    <div className="text-center mt-2">
                      <div className="fw-bold text-lowercase text-truncate" title={product.name} >{product.name}</div>
                      <div className="text-muted small text-primary">
                        {product.price ?? "—"} FCFA
                      </div>
                      <div className="d-flex justify-content-center gap-3 mt-2">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          onClick={() => handleAddToCart(product)}
                          style={{ cursor: "pointer" }}
                        />
                        {isLoggedIn && (
                          <FontAwesomeIcon
                            icon={faHeart}
                            onClick={toggleFavorite}
                            style={{
                              cursor: "pointer",
                              color: isFavorite ? "red" : "#FA7F1B",
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
      )}

      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default React.memo(Electromenager);
