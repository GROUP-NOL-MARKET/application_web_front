import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import monde from "../assets/Images/monde bb.avif";
import hygiene from "../assets/Images/hygiene dent.avif";
import rasage from "../assets/Images/rasage.avif";
import produits from "../assets/Images/produits menagers.avif";
import soins from "../assets/Images/soins beauté.avif";
import feminine from "../assets/Images/hygiene feminine.avif";
import desodorisant from "../assets/Images/desodorifiant.avif";
import mouchoir from "../assets/Images/mouchoir.avif";
import useEmblaCarousel from "embla-carousel-react";

const Droguerie = () => {
  const sousCategories = [
    { id: 1, name: "Monde de Bébé", img: monde },
    { id: 2, name: "Hygiène dentaire", img: hygiene },
    { id: 3, name: "Rasage", img: rasage },
    { id: 4, name: "Produits ménager", img: produits },
    { id: 5, name: "Soins de beauté", img: soins },
    { id: 6, name: "Hygiène féminine", img: feminine },
    { id: 7, name: "Désodorisants - insecticides", img: desodorisant },
    { id: 8, name: "Mouchoir - papier toilette", img: mouchoir },
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate();

  const handleNavigation = (subcategory) => {
    navigate(`/products?sous_category=${encodeURIComponent(subcategory)}`);
  };
  const handleNavigation2 = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="container mt-1 mt-md-5">
      <div className="row">
        <h1 className="col-md-9 col-lg-10 col-sm-8 col-10 title mt-3 mt-md-0">
          Droguerie
        </h1>
        <div className="col-md-3 col-lg-2 col-sm-4 col-2 mt-3 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={() => handleNavigation2("Droguerie")}
              className="row d-flex align-content-end"
              style={{ textDecoration: "none", color: "#FA7F1B", cursor: "pointer" }}
            >
              <div className="col-8 text-end d-none d-sm-block">Voir tout</div>
              <div className="col-1">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </div>
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
            <div className="border border-1 border-top w-100">
              <div className="product_title petit_titre">{sub.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Le swiper pour les petits écrans  */}
      {/* Le swiper pour les tout petits écrans  */}
      <div className="embla d-lg-none mt-2">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {sousCategories.map((sub) => (
              <div
                key={sub.id}
                className="embla__slide border border-1 rounded-3 d-flex flex-column  me-1"
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

export default Droguerie;
