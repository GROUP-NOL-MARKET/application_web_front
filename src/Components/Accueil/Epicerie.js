import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { product_flash_sale } from "../Product_Data";

const Epicerie = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const navigate = useNavigate({});
  const handleNavigation = () => {
    navigate("/products");
  };
  return (
    <div className="container mt-1 mt-md-5">
      <div className="row">
        <h1 className="col-md-9 col-lg-10 col-sm-8 col-10 title mt-5 mt-md-0">
          Epicerie
        </h1>
        <div className="col-md-3 col-lg-2 col-sm-4 col-2 mt-5 mt-md-0">
          <div className="voir_tout">
            <Link
              to="/products"
              className="row d-flex align-content-end"
              style={{ textDecoration: "none", color: "#FA7F1B" }}
            >
              <div className="col-8 text-end d-none d-sm-block">Voir tout</div>
              <div className="col-1">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </div>
            </Link>
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
        className="Liste_produits d-none d-md-block"
      >
        {product_flash_sale.map((product) => (
          <SwiperSlide
            key={product.id}
            className="product_slide border border-1 shadow-sm"
            onClick={handleNavigation}
          >
            <img src={product.img} alt={product.name} className="img_product" />
            <div className="border border-1 border-top w-100">
              <div className="product_title">{product.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Le swiper pour les petits écrans  */}
      {/* Le swiper pour les tout petits écrans  */}
      <div className="embla d-lg-none">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {product_flash_sale.map((product) => (
              <div
                key={product.id}
                className="embla__slide border border-1 rounded-3 d-flex flex-column alin-items-center me-1"
                onClick={handleNavigation}
              >
                <img src={product.img} alt={product.name} className="img-fluid h-75 img_product" />

                <div className="product_title text-center">{product.name}</div>


              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Epicerie;
