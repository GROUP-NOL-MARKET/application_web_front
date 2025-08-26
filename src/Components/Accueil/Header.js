import { useContext } from "react";
import carousel_1 from "../assets/Images/carousel_1.jpg";
import carousel_2 from "../assets/Images/carousel_2.jpg";
import carousel_3 from "../assets/Images/carousel_3.jpg";
import "../../Styles/Header.css";
import ReactPlayer from "react-player";

import { Rating } from "@mui/material";
import { Button } from "react-bootstrap";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PanierContext } from "../../Store/Panier_context";
import { DUMMY_PRODUCTS } from "../Product_Data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Header = () => {
  const { addProductToCart } = useContext(PanierContext);

  return (
    <div>
      <div className="container">
        <div className="row">
          {/* Carousel  */}

          <div className="img_principal col-md-8 col-lg-9">
            <div className="">
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
                        Some representative placeholder content for the third
                        slide.
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

          {/* Les meilleurs produits  */}

          <div className="Produits_phares col-md-4 col-lg-3 mt-sm-2 mt-md-0 g-0 d-none d-md-block">
            <div className=" d-flex justify-content-center w-100 titre_principal">
              <h5 className="text-uppercase titre_principal_text" size="lg">
                Meilleurs Produits
              </h5>
            </div>

            {/* Partie produits phares pour les grands écrans */}

            <div className="Description_produits m-2 ">
              {DUMMY_PRODUCTS.map((product) => (
                <div key={product.id} className="product-item mt-0 mt-md-4">
                  <div className="row">
                    <div className="col-5 d-flex justify-content-center align-items-center">
                      <img
                        alt={product.name}
                        src={product.image}
                        className="product_img"
                      />
                    </div>
                    <div className="col-7 d-flex justify-content-center flex-column border-start">
                      <div className="best_product_name">{product.name}</div>
                      <Rating
                        name="size-medium"
                        value={product.notation}
                        readOnly
                      />
                      <div className="row">
                        <span
                          className="best_product_price col-8"
                          style={{ fontSize: "small" }}
                        >
                          {product.price} FCFA
                        </span>
                        <div
                          className="col-4"
                          onClick={() => addProductToCart(product.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{ color: "#FA7F1B", height: "0.2rem" }}
                    className="m-0"
                  />
                </div>
              ))}
            </div>
            <div className="m-4">
              <Button
                className="me-2"
                href="/products"
                style={{ backgroundColor: "#0066BD" }}
              >
                Voir tous les produits
              </Button>
            </div>
          </div>

          {/* LEs produits listés avec map sur le tableau  pour les petits écrans*/}
          <div className="Produits_phares col-md-3 mt-sm-2 mt-md-0 g-0 d-md-none">
            <div className=" d-flex justify-content-center w-100 titre_principal">
              <h5 className="text-uppercase titre_principal_text" size="lg">
                Meilleurs Produits
              </h5>
            </div>
            <div className="Description_produits_mobile m-2">
              <Swiper
                modules={[Navigation]}
                navigation
                loop={true}
                slidesPerView={1}
                spaceBetween={15}
                className="Liste_produits  h-100" // visible que sur mobile
              >
                {DUMMY_PRODUCTS.map((product) => (
                  <SwiperSlide key={product.id} className="product-item mt-4 ">
                    <div className="row h-100">
                      <div className="col-5 h-100 d-flex justify-content-center align-items-center">
                        <img
                          alt={product.name}
                          src={product.image}
                          className="product_img_mobile"
                        />
                      </div>
                      <div className="col-7 d-flex justify-content-center flex-column border-start">
                        <div className="best_product_name">{product.name}</div>
                        <Rating
                          name="size-medium"
                          value={product.notation}
                          readOnly
                        />
                        <div className="row">
                          <span
                            className="best_product_price col-8"
                            style={{ fontSize: "small" }}
                          >
                            {product.price} FCFA
                          </span>
                          <div
                            className="col-4"
                            onClick={() => addProductToCart(product.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <FontAwesomeIcon icon={faCartShopping} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr
                      style={{ color: "#FA7F1B", height: "0.2rem" }}
                      className="m-0"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="m-4">
              <Button
                className="me-2"
                href="/products"
                style={{ backgroundColor: "#0066BD" }}
              >
                Voir tous les produits
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
