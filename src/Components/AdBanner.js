import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/AdBanner.css";
import phone_inline from "./assets/Images/phone_inline.png";

const AdBanner = ({
  imageUrl,
  title,
  subtitle,
  ctaText1,
  ctaText2,
  ctaLink,
  pub_num,
}) => {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTitle((prev) => !prev); // alterner entre title et subtitle
    }, 1000); // toutes les 3s
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="ad-banner w-100 h-100">
      <div className="container h-100">
        <div className="row  d-flex align-items-center h-100">
          <div className="col-2">
            <img
              src={imageUrl}
              alt="Publicité"
              className="ad-image w-100 h-50"
            />
          </div>
          <div className="col-5 d-flex">
            <AnimatePresence mode="wait">
              {showTitle ? (
                <motion.h2
                  key="title"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ad-title"
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
          </div>
          <div className="col-3 position-relative">
            <a
              href={ctaLink}
              className="ad-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaText1}
            </a>
            <div className="position-absolute top-0 start-50">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 2 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse", // aller-retour
                  ease: "easeInOut", // fluide
                }}
                style={{ fontSize: "25px", color: "white", fontWeight: "bold" }}
              >
                {ctaText2}
              </motion.div>
            </div>
          </div>
          <div
            className="col-2  g-0 text-white text_command d-flex align-items-center"
            style={{
              backgroundColor: "#0066BD",
              minHeight: "100%",
              overflowY: "auto",
            }}
          >
            <div className="row">
              <div className="col-3">
                <img src={phone_inline} alt="phone" className="img-fluid" style={{minWidth: "10px"}}/>
              </div>

              <h6 className="col-9">Commandez au {pub_num}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdBanner;
