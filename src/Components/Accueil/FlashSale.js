import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useEmblaCarousel from "embla-carousel-react";
import "swiper/css";
import "swiper/css/navigation";
import "../../Styles/FlashSale.css";
import API from "../Authentification/api";
import VusProduct from "../Products/VusProduct";

const FlashSale = ({ duration = 800 }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png"; // Optionnel
    if (image.startsWith("http")) return image;
    return `${API.defaults.baseURL}/storage/${image}`;
  };

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(duration);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [error, setError] = useState(null);

  const closePopUp = useCallback(() => {
    setSelectedProduct(null);
    setShowPopUp(false);
  }, []);

  const openPopUp = useCallback((product) => {
    setSelectedProduct(product);
    setShowPopUp(true);
  }, []);

  //  Caching intelligent pour éviter les appels redondants
 useEffect(() => {
  const cachedPromos = sessionStorage.getItem("promotions_flash");

  if (cachedPromos) {
    setPromotions(JSON.parse(cachedPromos));
    setLoading(false);
  } else {
    const fetchPromos = async () => {
      try {
        setLoading(true);
        const res = await API.get("/promos");
        const now = new Date();

        const data = res.data?.data ?? res.data ?? [];

        const mapped = data
          .filter((promo) => {
            const debut = new Date(promo.start_at);
            const fin = new Date(promo.end_at);
            return debut <= now && now <= fin;
          })
          .map((promo) => {
            const prod = promo.product ?? promo.product_data ?? {};
            const quantity = prod.quantity ?? 1;
            const selled = prod.selled ?? 0;
            const soldPct = Math.floor((selled / quantity) * 100);

            return {
              id: prod.id ?? promo.id ?? Math.random().toString(36).slice(2, 9),
              img: getImageUrl(prod.image ?? ""),
              name: prod.name ?? promo.name ?? "Produit",
              initial_price: promo.initial_price ?? prod.price ?? 0,
              new_price: promo.new_price ?? promo.price_promo ?? 0,
              pourcentage_vendu: promo.pourcentage_vendu ?? 0,
              soldPct: isNaN(soldPct) ? 0 : soldPct,
            };
          });

        setPromotions(mapped);
        sessionStorage.setItem("promotions_flash", JSON.stringify(mapped));
        setError(null);

      } catch (err) {
        console.error("Erreur récupération promotions:", err);
        setError("Impossible de charger les promotions");
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }
}, []);

  // ✅ Décompte du temps (useEffect isolé pour ne pas rerendre tout le composant)
  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t - 1000), 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Mémorisation des produits
  const memoizedPromos = useMemo(() => promotions, [promotions]);

  // ✅ Navigation "Voir tout"
  const handleNavigation = useCallback(() => {
    navigate("/Promotion");
  }, [navigate]);

  // ✅ Formatage du compteur
  const getFormattedTime = useCallback((milliseconds) => {
    let total_seconds = Math.floor(milliseconds / 1000);
    let total_minutes = Math.floor(total_seconds / 60);
    let total_hours = Math.floor(total_minutes / 60);
    let days = Math.floor(total_hours / 24);

    let seconds = total_seconds % 60;
    let minutes = total_minutes % 60;
    let hours = total_hours % 24;

    const Box = ({ value }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "2px",
          margin: "2px",
          border: "1px solid #0066BD",
          borderRadius: "10px",
          backgroundColor: "#FA7F1B",
          minWidth: "25px",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
    );

    return (
      <div className="d-flex">
        <Box value={days} />J<>&nbsp;</>
        <Box value={hours} />H<>&nbsp;</>
        <Box value={minutes} />M<>&nbsp;</>
        <Box value={seconds} />S
      </div>
    );
  }, []);

  const hasPromos = memoizedPromos.length > 0;

  return (
    <div className="container mt-4">
      {/* --- En-tête --- */}
      <div className="enTête row">
        <h2
          className="col-lg-2 col-3 title_flash_sale mt-2"
          style={{ color: "#0066BD" }}
        >
          Vente <span className="d-none d-sm-inline">Flash</span>
        </h2>
        <div className="col-lg-7 col-md-5 col-sm-5 col-6 promo_temps">
          <div className="row">{getFormattedTime(time)}</div>
        </div>
        <div className="col-md-3 col-lg-2 offset-1 col-sm-3 col-1 mt-2">
          <div
            className="voir_tout"
            onClick={handleNavigation}
            style={{
              textDecoration: "none",
              color: "#FA7F1B",
              cursor: "pointer",
            }}
          >
            <div className="row offset-lg-4 d-flex align-content-end">
              <div className="offset-1 offset-md-2 offset-lg-0 col-8 col-lg-9 d-none d-sm-block">
                Voir tout
              </div>
              <div className="col-1">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="m-0" style={{ border: "1px solid #FA7F1B" }} />

      {/* --- ✅ Message de chargement sous le titre --- */}
      {loading ? (
        <div className="text-center py-4">Chargement des promotions...</div>
      ) : error ? (
        <div className="text-center py-4 text-danger">{error}</div>
      ) : !hasPromos ? (
        <div
          className="text-center py-4"
          style={{ color: "#FA7F1B", fontWeight: "700" }}
        >
          Aucun produit en promotion pour l'instant
        </div>
      ) : (
        <>
          {/* --- Swiper Desktop --- */}
          <div className="product_flash_sale d-none d-lg-block">
            <Swiper
              modules={[Navigation]}
              navigation
              loop={memoizedPromos.length > 6}
              slidesPerView={6}
              spaceBetween={15}
              className="Liste_produits"
            >
              {memoizedPromos.map((product) => (
                <SwiperSlide key={product.id} className="product_slide">
                  <img
                    loading="lazy"
                    src={product.img}
                    alt={product.name}
                    className="img_product border border-1 shadow-sm"
                    onClick={() => openPopUp(product)}
                  />
                  <div className="discount_badge">
                    {product.pourcentage_vendu}%
                  </div>
                  <div className="product_title petit_titre">
                    {product.name}
                  </div>
                  <div className="price_flash_sale">
                    <span className="p-2 new_price">
                      {product.new_price} FCFA
                    </span>
                    <span className="initial_price">
                      <s>{product.initial_price} FCFA</s>
                    </span>
                  </div>
                  <div className="progress w-100" style={{ height: "20px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-valuenow={product.soldPct}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${product.soldPct}%` }}
                    >
                      {product.soldPct}% vendu
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* --- Mobile --- */}
          <div className="embla d-md-none mt-2">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {memoizedPromos.map((product) => (
                  <div
                    key={product.id}
                    className="embla__slide border border-1 rounded-3 d-flex flex-column align-items-center me-1"
                    style={{ height: "200px" }}
                  >
                    <img
                      loading="lazy"
                      src={product.img}
                      alt={product.name}
                      className="img_product"
                      onClick={() => openPopUp(product)}
                    />
                    <div className="discount_badge">
                      {product.pourcentage_vendu}%
                    </div>
                    <div className="text-center petit_titre">
                      {product.name}
                    </div>
                    <div className="price_flash_sale text-center">
                      <span className="p-2 new_price">
                        {product.new_price} FCFA
                      </span>
                      <span className="initial_price">
                        <s>{product.initial_price} FCFA</s>
                      </span>
                    </div>
                    <div className="progress w-100" style={{ height: "20px" }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={product.soldPct}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${product.soldPct}%` }}
                      >
                        {product.soldPct}% vendu
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default React.memo(FlashSale);
