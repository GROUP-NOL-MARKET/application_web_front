// import { useContext } from "react";
import carousel_1 from "../assets/Images/carousel_1.jpg";
import carousel_2 from "../assets/Images/carousel_2.jpg";
import carousel_3 from "../assets/Images/carousel_3.jpg";
import "../../Styles/Header.css";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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
import { category_product } from "../Product_Data";

const Header = () => {
  // const { addProductToCart } = useContext(PanierContext);

  return (
    <div>
      <div className="container">
        <div className="banner">
          <div className="col-12"></div>
        </div>
        <div className="row">
          {/* Carousel  */}

          <div className="img_principal col-4 mb-2">
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
          <div className="category_product col-md-4">

              {/* Champ de recherche  */}

            <div className="col-12 d-flex align-items-center">
              <div className="row g-0 rounded-5 border border-black overflow-hidden w-100">
                {/* Menu déroulant */}
                <div className="col-5">
                  <select className="form-select h-100 rounded-0 border-end select_1">
                    <option>Catégories</option>
                    <option>Droguerie</option>
                    <option>Animalerie</option>
                    <option>Epicerie</option>
                  </select>
                </div>

                {/* Champ de recherche */}
                <div className="col-5">
                  <InputBase
                    placeholder="Tapez ici..."
                    inputProps={{ "aria-label": "search" }}
                    className="w-100 px-3 h-100"
                    sx={{ height: "100%" }}
                  />
                </div>

                {/* Bouton de recherche */}
                <div className="col-2">
                  <IconButton
                    type="button"
                    className="w-100 h-100"
                    sx={{
                      backgroundColor: "#0066BD",
                      color: "white",
                      borderRadius: 0,
                      ":hover": {
                        backgroundColor: "#0066BD",
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
            </div>

                    {/* Les catégories de produits  */}

            <div>
              {category_product.map((category_p) => (
                <div className="border border-1">
                  <img alt={category_p.category} src={category_p.image} />
                  <h6>{category_p.category} </h6>
                </div>
              ))}
            </div>
          </div>
        </div>
        
              {/* Suite des catégories de produits sous le carousel  */}

        <div>
          {category_product.map((category_p) => (
            <div className="border border-1">
              <img alt={category_p.category} src={category_p.image} />
              <h6>{category_p.category}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
