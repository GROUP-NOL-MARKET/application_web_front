import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
// import useEmblaCarousel from "embla-carousel-react";
// import produits_frais from "../assets/Images/produits_frais.avif";
import fromage from "../assets/Images/charcuterie.png";
import yaourt from "../assets/Images/yaourt.avif";
import surgeles from "../assets/Images/congeles.jpg";
import glaces from "../assets/Images/glaces.png";
import fruit from "../assets/Images/fruit.png";
import frites from "../assets/Images/frites.png";
import divers from "../assets/Images/divers_frais.png";
import "../../Styles/Header.css";
// import { useInView } from "./UseInView";
import { motion } from "framer-motion";

const ProduitsFrais = () => {
  const sousCategories = [
    { id: 1, name: "Fromages-Charcuterie-Beurre", img: fromage },
    { id: 2, name: "Yaourt et Crème fraîche", img: yaourt },
    { id: 3, name: "Viandes-Poissons-Crustassés-Oeufs", img: surgeles },
    { id: 4, name: "Glaces et glacons", img: glaces },
    { id: 5, name: "Divers", img: divers },
    { id: 6, name: "Frites et Pizzas", img: frites },
    { id: 7, name: "Fruits secs et frais", img: fruit },

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
          Produits frais
        </h1>
        <div className="col mt-3 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={() => handleNavigation2("Produits Frais")}
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
            <div className="border border-top border-1 w-100" style={{ cursor: "pointer" }}>
              <div className="product_title taux_moyen  fw-bolder">{sub.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Le swiper pour les petits écrans  */}

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

export default ProduitsFrais;
