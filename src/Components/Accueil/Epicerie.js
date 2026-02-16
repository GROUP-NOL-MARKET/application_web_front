import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import epicerie from "../assets/Images/epicerie.avif";
import petit_dejeun from "../assets/Images/petit dejeuner.avif";
import cereales from "../assets/Images/cereales corn flakes.avif";
import biscuits from "../assets/Images/biscuits gateaux.avif";
import amuse from "../assets/Images/amuse gueule.avif";
import pains from "../assets/Images/pains et viennesoireries.avif";
import bonbon from "../assets/Images/bonbon chocolat.avif";
import conserves from "../assets/Images/conserves plats cuisines.avif";
import pates from "../assets/Images/pates alimentaires riz.avif";
import assaisonnement from "../assets/Images/condiments.avif";
import huile from "../assets/Images/huile vinaigre.avif";
import sardine from "../assets/Images/sardine.avif";


const Epicerie = () => {

  const sousCategories = [
    { id: 1, name: "Petit déjeuner", img: petit_dejeun },
    { id: 2, name: "Céréales-corn flakes Pain gri", img: cereales },
    { id: 3, name: "Biscuits gâteaux", img: biscuits },
    { id: 4, name: "Amuse gueules", img: amuse },
    { id: 5, name: "Pains et viennoiseries", img: pains },
    { id: 6, name: "Bonbons-chocolat", img: bonbon },
    { id: 7, name: "Conserves-plats cuisines", img: conserves },
    { id: 8, name: "Pâtes alimentaires -riz - purée", img: pates },
    { id: 9, name: "Assaisonnement - condiments", img: assaisonnement },
    { id: 10, name: "Huile - Vinaigre", img: huile },
    { id: 11, name: "Sardine", img: sardine },
    { id: 12, name: "Epicerie", img: epicerie },
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
    <div className="container-fluid mt-1 mt-md-5">
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
        style={{ backgroundColor: "#F2F2F2" }}
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
      <div className="embla d-lg-none mt-2" style={{ backgroundColor: "#F2F2F2" }}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {sousCategories.map((sub) => (
              <div
                key={sub.id}
                className="embla__slide border border-1 rounded-3 d-flex flex-column me-1"
                onClick={() => handleNavigation(sub.name)}
              >
                <img src={sub.img} alt={sub.name} className="img_product" />

                <div className="text-center taux_moyen  fw-bolder w-auto">{sub.name}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Epicerie;
