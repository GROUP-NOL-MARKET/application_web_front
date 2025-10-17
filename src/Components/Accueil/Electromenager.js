import React, { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
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

const Electromenager = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showPopUp, setshowPopUp] = useState(false);
  const closePopUp = () => {
    setshowPopUp(false);
    setSelectedProduct(null);
  }
  const openPopUp = (product) => {
    setSelectedProduct(product);
    setshowPopUp(true);
  }

  const { isLoggedIn } = useContext(AuthContext);
  const addFavorite = useContext(FavoriteContext);
  const addProductToCart = useContext(PanierContext);

  //  Récupération depuis Redux
  const { items, status } = useSelector((state) => state.products);
  const products = items["Matériels Nasco"] || [];

  //  Fetch une seule fois si non présent
  useEffect(() => {
    if (!products.length && status !== "loading") {
      dispatch(fetchProducts("Matériels Nasco"));
    }
  }, [products.length, status, dispatch]);

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

  const memoizedProducts = useMemo(() => products, [products]);

  if (status === "loading") {
    return <div className="text-center mt-5"><Preloader /></div>;
  }

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
            style={{ textDecoration: "none", color: "#FA7F1B", cursor: "pointer" }}
          >
            <div className="row d-flex align-content-end">
              <div className="col-8 text-end d-none d-sm-block">Voir tout</div>
              <div className="col-1">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />

      {/* --- Swiper Desktop --- */}
      <Swiper
        modules={[Navigation]}
        navigation
        loop={memoizedProducts.length > 6}
        slidesPerView={6}
        spaceBetween={15}
        className="Liste_produits d-none d-md-block mt-4"
      >
        {memoizedProducts.length > 0 ? (
          memoizedProducts.map((product) => (
            <SwiperSlide key={product.id} className="product_slide border border-1 shadow-sm">
              <img
                loading="lazy"
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `http://127.0.0.1:8000/storage/${product.image}`
                }
                alt={product.name}
                className="img_product"
                onClick={() => openPopUp(product)}
              />
              <div className="border border-1 border-top w-100 text-center py-2">
                <div className="product_title fw-bold petit_titre">{product.name}</div>
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
                      onClick={() => handleAddFavorite(product.id)}
                      style={{ cursor: "pointer", color: "#FA7F1B" }}
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center w-100">Aucun produit trouvé</div>
        )}
      </Swiper>

      {/* --- Embla Mobile --- */}
      <div className="embla d-lg-none mt-3">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {memoizedProducts.length > 0 ? (
              memoizedProducts.map((product) => (
                <div
                  key={product.id}
                  className="embla__slide border border-1 rounded-3 d-flex flex-column align-items-center me-2 shadow-sm"
                >
                  <img
                    loading="lazy"
                    src={
                      product.image.startsWith("http")
                        ? product.image
                        : `http://127.0.0.1:8000/storage/${product.image}`
                    }
                    alt={product.name}
                    className="img_product"
                    onClick={() => openPopUp(product)}
                  />
                  <div className="text-center mt-2">
                    <div className="petit_titre fw-bold">{product.name}</div>
                    <div className="text-muted small">{product.price} FCFA</div>
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
              ))
            ) : (
              <p className="text-center text-muted">Aucun produit trouvé</p>
            )}
          </div>
        </div>
      </div>
      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default React.memo(Electromenager);
