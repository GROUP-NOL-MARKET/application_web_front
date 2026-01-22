import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import "../../Styles/Content.css";
import epice from "../assets/Images/epices.avif";
import the from "../assets/Images/the.avif";
import farine from "../assets/Images/farines.avif";
import jus from "../assets/Images/jus.avif";
import vins from "../assets/Images/vins.avif";
import sodabi from "../assets/Images/sodabi.avif";
import riz from "../assets/Images/riz.avif";
import cosmetique from "../assets/Images/cosmetique.avif";
import eau from "../assets/Images/eau.avif";
import amuse from "../assets/Images/amuse.avif";
import miel from "../assets/Images/miel.avif";

const ProduitsLocaux = () => {
  const sousCategories = [
    { id: 1, name: "Épices", img: epice },
    { id: 2, name: "Thés & Infusions", img: the },
    { id: 3, name: "Miel & Divers", img: miel },
    { id: 4, name: "Amuses bouches", img: amuse },
    { id: 5, name: "Farines", img: farine },
    { id: 6, name: "Jus", img: jus },
    { id: 7, name: "Vins", img: vins },
    { id: 8, name: "Sodabi", img: sodabi },
    { id: 9, name: "Riz, haricots...", img: riz },
    { id: 10, name: "Cosmétique", img: cosmetique },
    { id: 11, name: "Eau", img: eau },
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
    <div className="container mt-1 mt-md-5">
      <div className="row">
        <h1 className="col-8 title mt-3 mt-md-0">
          Produits Locaux
        </h1>
        <div className="col mt-3 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={() => handleNavigation2("Produits Locaux")}
              className="row d-flex align-content-end"
              style={{
                textDecoration: "none",
                color: "#FA7F1B",
                cursor: "pointer",
              }}
            >
              <div className="col text-end"> Voir plus <FontAwesomeIcon icon={faArrowAltCircleRight} /></div>
              
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
            <div className="border border-top border-1 w-100">
              <div className="product_title petit_titre">{sub.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Le swiper pour les petits écrans  */}

      <div
        className="embla d-lg-none mt-2"
        style={{ backgroundColor: "#F2F2F2" }}
      >
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {sousCategories.map((sub) => (
              <div
                key={sub.id}
                className="embla__slide border border-1 rounded-3 d-flex flex-column me-1"
                onClick={() => handleNavigation(sub.name)}
              >
                <img src={sub.img} alt={sub.name} className="img_product" />

                <div className="text-center petit_titre">{sub.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProduitsLocaux;
