import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import epicerie from "../assets/Images/epicerie.avif";
import petit_dejeun from "../assets/Images/petit dejeuner.png";
import cereales from "../assets/Images/cereales corn flakes.avif";
import biscuits from "../assets/Images/biscuits gateaux.avif";
import amuse from "../assets/Images/amuse gueule.avif";
// import pains from "../assets/Images/pains et viennesoireries.avif";
import bonbon from "../assets/Images/confiseries.png";
import conserves from "../assets/Images/conserves.png";
import pates from "../assets/Images/pates alimentaires riz.avif";
import assaisonnement from "../assets/Images/condiments.avif";
import huile from "../assets/Images/huile vinaigre.avif";
import sardine from "../assets/Images/sardine.avif";


const Epicerie = () => {

  const sousCategories = [
    { id: 1, name: "Petit Déjeuner", img: petit_dejeun },
    { id: 2, name: "Biscuits et Gâteaux", img: biscuits },
    { id: 3, name: "Chips", img: amuse },
    { id: 4, name: "Conserves-plats cuisinés", img: conserves },
    { id: 5, name: "Confiseries", img: bonbon },
    { id: 6, name: "Produits de base", img: pates },
    { id: 7, name: "Huile-Vinaigre", img: huile },
    { id: 8, name: "Sauces et assaisonnement", img: sardine },
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
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="row">
        <h1 className="col-8 title mt-3 mt-md-0">
          Epicerie
        </h1>
        <div className="col mt-3 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={() => handleNavigation2("Epicerie")}
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
      // style={{ backgroundColor: "#F2F2F2" }}
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

export default Epicerie;
