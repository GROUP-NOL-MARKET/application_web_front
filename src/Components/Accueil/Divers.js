import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import chewing from "../assets/Images/chewing.avif";
import piles from "../assets/Images/piles rasoirs.avif";
import papeterie from "../assets/Images/papeterie.avif";
import ampoule from "../assets/Images/ampoule.avif";

const Divers = () => {
  const sousCategories = [
    { id: 1, name: "Chewing gum et Bonbons", img: chewing },
    { id: 2, name: "Rasoirs et Tondeuses", img: piles },
    { id: 3, name: "Fournitures de bureau", img: papeterie },
    { id: 4, name: "Accessoires électriques", img: ampoule },
    { id: 5, name: "Divers", img: piles },
  ];

  // const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
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
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="row">
        <h1 className="col-8 title mt-3 mt-md-0">
          Divers
        </h1>
        <div className="col mt-3 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={() => handleNavigation2("Divers")}
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
        loop={false}
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
              <div className="product_title taux_moyen  fw-bolder">{sub.name}</div>
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

export default Divers;
