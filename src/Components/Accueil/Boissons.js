import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import useEmblaCarousel from "embla-carousel-react";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import boisson from "../assets/Images/boisson.avif";
import vins from "../assets/Images/vins.avif";
import spiritueux from "../assets/Images/Spiritueux.avif";
import jus from "../assets/Images/jus de fruits.avif";
import eaux from "../assets/Images/eaux minérales.avif";
import sirop from "../assets/Images/sirop.avif";
import soft from "../assets/Images/soft drink.avif";
import cidre from "../assets/Images/cidre.avif";
import champagnes from "../assets/Images/champagnes.avif";
import biere from "../assets/Images/biere.avif";

const Boissons = () => {
  const sousCategories = [
    { id: 1, name: "Vins", img: vins },
    { id: 2, name: "Spiritueux", img: spiritueux },
    { id: 3, name: "Jus de fruits", img: jus },
    { id: 4, name: "Eaux minérales", img: eaux },
    { id: 5, name: "Sirop", img: sirop },
    { id: 6, name: "Soft Drink", img: soft },
    { id: 7, name: "Cidre", img: cidre },
    { id: 8, name: "Champagnes", img: champagnes },
    { id: 9, name: "Bière et panaché", img: biere },
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate({});

  const handleNavigation = (subcategory) => {
    navigate(`/products?sous_category=${encodeURIComponent(subcategory)}`);
  };
  const handleNavigation2 = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };
  return (
    <motion.div
      className="container-fluid mt-2 mt-md-5"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >

      <div className="row">
        <h1 className="col-8 title mt-3 mt-md-0">
          Boissons
        </h1>
        <div className="col mt-3 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={() => handleNavigation2("Boissons")}
              className="row d-flex align-content-end"
              style={{ textDecoration: "none", color: "#FA7F1B", cursor: "pointer" }}
            >
              <div className="col text-end"> Voir plus <FontAwesomeIcon className="d-none d-md-inline" icon={faArrowAltCircleRight} /></div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />

      {/* Utilisation de Swiper pour la navigation dans le tableau et afficher les produits */}

      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        slidesPerView={6}
        spaceBetween={15}
        className="Liste_produits d-none d-lg-block"
      >
        {sousCategories.map((sub) => (
          <SwiperSlide
            key={sub.id}
            className="product_slide border border-1 shadow-sm"
            onClick={() => handleNavigation(sub.name)}
          >
            <img src={sub.img} alt={sub.name} className="img_product" />
            <div className="border border-1 border-top w-100" style={{ cursor: "pointer" }}>
              <div className="product_title taux_moyen fw-bolder">{sub.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Le swiper pour les petits écrans  */}
      {/* Le swiper pour les tout petits écrans  */}
      <Swiper
        slidesPerView={2.4}
        spaceBetween={12}
        loop={false}
        className="d-lg-none mobile-swiper mt-2"
      >
        {sousCategories.map((sub) => (
          <SwiperSlide key={sub.id}>
            <div
              className="mobile-product-card"
              onClick={() => handleNavigation(sub.name)}
            >
              <img src={sub.img} alt={sub.name} />
              <div className="mobile-product-title text-truncate">{sub.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Boissons;
