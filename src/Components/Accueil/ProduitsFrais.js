import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import produits_frais from "../assets/Images/produits_frais.avif";
import fromage from "../assets/Images/fromages.avif";
import yaourt from "../assets/Images/yaourt.avif";
import surgeles from "../assets/Images/surgeles.avif";
import glaces from "../assets/Images/glaces.avif";
import charcuterie from "../assets/Images/charcuterie.avif";
import "../../Styles/Header.css"

const ProduitsFrais = () => {
  const sousCategories = [
    { id: 1, name: "Fromages - fruits frais - légumes", img: fromage },
    { id: 2, name: "yaourt", img: yaourt },
    { id: 3, name: "Surgeles  crèmerie fraîche", img: surgeles },
    { id: 4, name: "Glaces et crèmes glacées", img: glaces },
    { id: 5, name: "Charcuterie volaille poisson", img: charcuterie },
    { id: 6, name: "Produits Locaux Frais", img: produits_frais },
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
        <h1 className="col-md-9 col-lg-10 col-sm-8 col-10 title mt-3 mt-md-0">
          Produits frais
        </h1>
        <div className="col-md-3 col-lg-2 col-sm-4 col-2 mt-3 mt-md-0">
          <div className="voir_tout">
            <div
              onClick={() => handleNavigation2("Produits Frais")}
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

                <div className="text-center petit_titre">{sub.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProduitsFrais;
