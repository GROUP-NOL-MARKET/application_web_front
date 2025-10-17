import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/AdBanner.css";
import telephone from "./assets/Images/icone/telephone.png";
import promo from "./assets/Images/promo.webp";
import promo_video from "./assets/Images/promo_video.mp4";

const AdBanner = React.memo(
  ({ imageUrl, title, subtitle, ctaText1, ctaText2, ctaLink, pub_num }) => {
    const [showTitle, setShowTitle] = useState(true);
    const [videoVisible, setVideoVisible] = useState(false);
    const sentinelRef = useRef(null); // 👈 Élément observé pour le lazy load

    // Alterner entre titre et sous-titre
    useEffect(() => {
      const interval = setInterval(() => setShowTitle((prev) => !prev), 3000);
      return () => clearInterval(interval);
    }, []);

    // Lazy-load vidéo via IntersectionObserver
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVideoVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (sentinelRef.current) observer.observe(sentinelRef.current);
      return () => observer.disconnect();
    }, []);

    // Élément mémoïsé : image promo
    const promoImage = useMemo(
      () => (
        <div className="position-absolute end-0 top-0" style={{ zIndex: 3 }}>
          <img
            src={promo}
            alt="promo"
            style={{ width: "200px" }}
            loading="lazy"
          />
        </div>
      ),
      []
    );

    // Élément mémoïsé : bouton d’action
    const ctaButton = useMemo(
      () => (
        <a
          href={ctaLink}
          className="ad-button w-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaText1}
        </a>
      ),
      [ctaLink, ctaText1]
    );

    return (
      <div
        className="ad-banner w-100 position-relative overflow-hidden"
        ref={sentinelRef}
        style={{ "--ad-banner-height": "320px" }}
      >
        {/* Vidéo lazy-loaded */}
        {videoVisible ? (
          <video
            className="ad-banner-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={promo_video} type="video/mp4" />
            Ton navigateur ne supporte pas la vidéo.
          </video>
        ) : (
          //  Placeholder avant que la vidéo soit visible
          <div
            style={{
              backgroundColor: "#000",
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
        )}

        {/* Voile semi-transparent */}
        <div className="ad-overlay" aria-hidden="true" />

        {/*  Contenu principal */}
        <div className="container">
          <div className="ad-content h-100 position-relative">
            <div className="row d-flex align-items-center h-100">
              {/*  Colonne image */}
              <div className="col-2">
                <img
                  src={imageUrl}
                  alt="Publicité"
                  className="ad-image w-100 h-50"
                  loading="lazy"
                />
              </div>

              {/*  Colonne titre + sous-titre */}
              <div className="col-6 d-flex position-relative">
                <AnimatePresence mode="wait">
                  {showTitle ? (
                    <motion.h2
                      key="title"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ad-title text-uppercase"
                    >
                      {title}
                    </motion.h2>
                  ) : (
                    <motion.p
                      key="subtitle"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ad-subtitle"
                    >
                      {subtitle}
                    </motion.p>
                  )}
                </AnimatePresence>
                {promoImage}
              </div>

              {/* Bouton et pourcentage promo */}
              <div className="col-2 position-relative">
                {ctaButton}
                <div
                  className="position-absolute"
                  style={{ bottom: "0px", right: "28px" }}
                >
                  <motion.div
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1.4 }}
                    transition={{
                      duration: 0.8,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    style={{
                      fontSize: "25px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    className="promo_pourcentage"
                  >
                    {ctaText2}
                  </motion.div>
                </div>
              </div>

              {/* Section contact */}
              <div
                className="col-2 g-0 text-white text_command d-flex align-items-center"
                style={{
                  backgroundColor: "rgba(0,102,189,0.85)",
                  minHeight: "100%",
                  overflowY: "auto",
                  zIndex: 3,
                }}
              >
                <div className="row">
                  <div className="col-2">
                    <img
                      src={telephone}
                      alt="tel_img"
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                  <h6 className="offset-1 col">Commandez au {pub_num}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AdBanner;
