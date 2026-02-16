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

const FlashSale = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const navigate = useNavigate();

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [error, setError] = useState(null);

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";
    if (image.startsWith("http")) return image;
    return `${API.defaults.baseURL}/storage/${image}`;
  };

  /* ===========================
     FETCH PROMOTIONS
  ============================ */
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setLoading(true);
        const res = await API.get("/promos");
        const now = Date.now();

        const data = res.data?.data ?? [];

        const mapped = data.map((promo) => {
          const prod = promo.product ?? {};
          const endAt = new Date(promo.end_at).getTime();
          const remainingMs = Math.max(endAt - now, 0);

          const quantity = prod.quantity ?? 1;
          const selled = prod.selled ?? 0;
          const soldPct = Math.floor((selled / quantity) * 100);

          return {
            id: prod.id ?? promo.id,
            img: getImageUrl(prod.image),
            name: prod.name ?? "Produit",
            initial_price: promo.initial_price ?? prod.price ?? 0,
            new_price: promo.new_price ?? 0,
            pourcentage_vendu: promo.pourcentage_vendu ?? 0,
            soldPct: isNaN(soldPct) ? 0 : soldPct,
            remainingMs,
          };
        });

        setPromotions(mapped);
        setError(null);
      } catch (err) {
        setError("Impossible de charger les promotions");
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  /* ===========================
     TIMER (décompte)
  ============================ */
  useEffect(() => {
    const interval = setInterval(() => {
      setPromotions((prev) =>
        prev.map((p) => ({
          ...p,
          remainingMs: Math.max(p.remainingMs - 1000, 0),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ===========================
     PROMOS VALIDES (non expirées)
  ============================ */
  const validPromos = useMemo(
    () => promotions.filter((p) => p.remainingMs > 0),
    [promotions]
  );

  const hasPromos = validPromos.length > 0;
  const showVoirTout = validPromos.length >= 6;

  const openPopUp = useCallback((product) => {
    setSelectedProduct(product);
    setShowPopUp(true);
  }, []);

  const closePopUp = useCallback(() => {
    setSelectedProduct(null);
    setShowPopUp(false);
  }, []);

  /* ===========================
     GUARD CLAUSE (ULTRA IMPORTANT)
  ============================ */
  if (!loading && !error && !hasPromos) {
    return null;
  }

  /* ===========================
     HANDLERS
  ============================ */


  const handleNavigation = () => navigate("/Promotion");

  const formatCountdown = (ms) => {
    const total = Math.floor(ms / 1000);
    return {
      d: Math.floor(total / 86400),
      h: Math.floor(total / 3600) % 24,
      m: Math.floor(total / 60) % 60,
      s: total % 60,
    };
  };

  /* ===========================
     RENDER
  ============================ */
  return (
    <div className="container-fluid mt-4">
      {/* --- HEADER --- */}
      <div className="row align-items-center">
        <h2 className="col-lg-9 col-10 title_flash_sale mt-2" style={{ color: "#0066BD" }}>
          Promotions
        </h2>

        {showVoirTout && (
          <div className="col-lg-2 col-md-3 col-2 mt-2 text-end">
            <span
              className="voir_tout"
              onClick={handleNavigation}
              style={{ color: "#FA7F1B", cursor: "pointer" }}
            >
              Voir tout <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </span>
          </div>
        )}
      </div>

      <hr className="m-0 mb-3" style={{ border: "1px solid #FA7F1B" }} />

      {loading && <div className="text-center py-4">Chargement…</div>}
      {error && <div className="text-center text-danger py-4">{error}</div>}

      {/* --- DESKTOP --- */}
      <div className="d-none d-lg-block">
        <Swiper
          modules={[Navigation]}
          navigation
          loop={validPromos.length > 6}
          slidesPerView={6}
          spaceBetween={15}
        >
          {validPromos.map((product) => (
            <SwiperSlide key={product.id}>
              <img
                src={product.img}
                alt={product.name}
                className="img_product shadow-sm"
                onClick={() => openPopUp(product)}
              />
              <div className="discount_badge">{product.pourcentage_vendu}%</div>
              <div className="petit_titre">{product.name}</div>
              <div className="price_flash_sale">
                <span className="new_price">{product.new_price} FCFA</span>
                <s className="initial_price">{product.initial_price} FCFA</s>
              </div>

              <div className="promo-countdown">
                {Object.entries(formatCountdown(product.remainingMs)).map(
                  ([k, v]) => (
                    <span key={k} className="time-pill">
                      {String(v).padStart(2, "0")}
                    </span>
                  )
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- MOBILE --- */}
      <div className="d-lg-none embla mt-2">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {validPromos.map((product) => (
              <div key={product.id} className="embla__slide">
                <img
                  src={product.img}
                  alt={product.name}
                  onClick={() => openPopUp(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPopUp && (
        <VusProduct closePopUp={closePopUp} product={selectedProduct} />
      )}
    </div>
  );
};

export default React.memo(FlashSale);
