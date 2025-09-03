import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import AdBanner from "./../AdBanner";
import Navbar3 from "./Navbar/Navbar3";
import carousel_1 from "../assets/Images/carousel_1.jpg";
import carousel_2 from "../assets/Images/carousel_2.jpg";
import carousel_3 from "../assets/Images/carousel_3.jpg";
import "../../Styles/Header.css";
import { category_product } from "../Product_Data";
import { banners } from "../Product_Data";
import img_pub from "../assets/Images/img_pub.png";
// import ReactPlayer from "react-player";

// import { Rating } from "@mui/material";
// import { Button } from "react-bootstrap";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { PanierContext } from "../../Store/Panier_context";
// import { DUMMY_PRODUCTS } from "../Product_Data";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Header = () => {
  // const { addProductToCart } = useContext(PanierContext);

  return (
    <div className="mb-3">
      <div className="w-full col-12 banner overflow-hidden rounded-2xl shadow-sm">
        <AdBanner
          imageUrl={img_pub}
          title="Promo exclusive !"
          subtitle="-30% sur toute la collection été"
          ctaText1="J'en profite"
          ctaText2="-30%"
          ctaLink="https://tonsite.com/promo-ete"
          pub_num="0160557866"
        />
      </div>
      <div className="container">
        <div className="row mt-3">
          {/* La liste de navigation  */}
          <div className="col-2">
            <Navbar3 />
          </div>

          {/* Carousel  */}

          <div className="img_principal col-8 mb-2">
            <div className="hauteur_carousel">
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <button
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                  ></button>
                  <button
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                  ></button>
                  <button
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                  ></button>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={carousel_1}
                      className="d-block w-100"
                      alt="carousel_1"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Titre de l'image_1</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src={carousel_2}
                      className="d-block w-100"
                      alt="carousel_2"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Titre de l'image_2</h5>
                      <p>
                        Some representative placeholder content for the second
                        slide.
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src={carousel_3}
                      className="d-block w-100"
                      alt="carousel_3"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Titre de l'image_3</h5>
                      <p>
                        Espace d'explication du contenu du troisième carousel
                      </p>
                    </div>
                  </div>
                </div>

                {/* Les boutons du carousel  */}

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Précédent</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Prochain</span>
                </button>
              </div>
            </div>
            {/* <div className="d-none d-md-block  col-8">
              <ReactPlayer
                url="https://youtu.be/Q93KvEnZZvM?list=RDQ93KvEnZZvM"
                controls
                playing={false}
                height="250px"
              />
            </div> */}
          </div>
          <div className="col-2">
            <div className="m-2">
              {category_product.map((category_p) => (
                <Link to={category_p.link}>
                <div className="border border-1 m-2 category_content">
                  <div className="d-flex flex-column h-100">
                    <img alt={category_p.category} src={category_p.image} className="category_img h-50"/>
                    <h6 className="catgory_name">{category_p.category}</h6>
                    <p className="text_category">{category_p.text}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
