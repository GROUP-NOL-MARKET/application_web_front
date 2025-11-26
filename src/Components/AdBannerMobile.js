import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/AdBannerMobile.css";
import telephone from "./assets/Images/icone/telephone.png";
import promo from "./assets/Images/promo.webp";
import promo_video from "./assets/Images/promo_video.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const AdBannerMobile = React.memo(
  ({ imageUrl, title, subtitle, ctaText1, ctaText2, ctaLink, pub_num }) => {
    const [showTitle, setShowTitle] = useState(true);
    const [videoVisible, setVideoVisible] = useState(false);
    const sentinelRef = useRef(null); //  Élément observé pour le lazy load

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

    // Élément mémorisé : image promo
    const promoImage = useMemo(
      () => (
        <div className="position-absolute end-0 top-0" style={{ zIndex: 0 }}>
          <img
            src={promo}
            alt="promo"
            style={{ width: "100px" }}
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
          className="ad-button-mobile w-100"
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
        className="ad-banner-mobile w-100 position-relative overflow-hidden"
        ref={sentinelRef}
        style={{ "--ad-banner-height": "100px" }}
      >
        {/* Vidéo lazy-loaded */}
        {videoVisible ? (
          <video
            className="ad-banner-video-mobile"
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
        <div className="ad-overlay-mobile" aria-hidden="true" />

        {/*  Contenu principal */}
        <div className="container">
          <div className="ad-content-mobile position-relative">
            <div
              className="row d-flex align-items-center justify-content-between"
              style={{ height: "100%" }}
            >
              {/*  Colonne image */}
              <div className="col-3">
                <img
                  src={imageUrl}
                  alt="Publicité"
                  className="ad-image-mobile w-100"
                  loading="lazy"
                />
              </div>

              {/*  Colonne titre + sous-titre */}
              <div className="col-3 d-flex position-relative">
                <AnimatePresence mode="wait">
                  {showTitle ? (
                    <motion.h2
                      key="title"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 5, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ad-title-mobile text-uppercase"
                    >
                      {title}
                    </motion.h2>
                  ) : (
                    <motion.h2
                      key="subtitle"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 3, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ad-subtitle-mobile text-uppercase"
                    >
                      {subtitle}
                    </motion.h2>
                  )}
                </AnimatePresence>
              </div>
              {promoImage}
              {/* Bouton et pourcentage promo */}
              <div className="col-3 position-relative">
                {ctaButton}
                <div
                  className="position-absolute"
                  style={{
                    top: "15px",
                    right: "10px",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {ctaText2}
                </div>
              </div>

              {/* Section contact */}
              <div
                className="col-3 g-0 text-white text_command-mobile d-flex align-items-center"
                style={{
                  backgroundColor: "rgba(0,102,189,0.85)",
                  overflowY: "auto",
                  zIndex: 3,
                }}
              >
                <h6 className="offset-1" style={{fontSize: "10px"}}>
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  Commandez au {pub_num}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AdBannerMobile;
