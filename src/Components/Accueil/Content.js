import React, { useContext } from "react";
import best_product_1 from "../assets/Images/best_product_1.png";
import best_product_2 from "../assets/Images/best_product_2.png";
import best_product_3 from "../assets/Images/bet_product_3.png";
import best_product_4 from "../assets/Images/best_product_4.png";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/Content.css";


const Content = () => {
  const navigate = useNavigate();

  const handleNavigation = ()=>{
    navigate("/Product")
  }
  const product_category = [
    {
      id: 1,
      name: "Categorie 1",
      description: "Description du produit 1",
      price: 10,
      img: best_product_4,
    },
    {
      id: 2,
      name: "Categorie 2",
      description: "Description du produit 2",
      price: 20,
      img: best_product_4,
    },
    {
      id: 3,
      name: "Categorie 3",
      description: "Description du produit 3",
      price: 30,
      img: best_product_3,
    },
    {
      id: 4,
      name: "Categorie 4",
      description: "Description du produit 4",
      price: 40,
      img: best_product_4,
    },
    {
      id: 5,
      name: "Categorie 5",
      description: "Description du produit 5",
      price: 50,
      img: best_product_4,
    },
  ];
  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="col-md-9 col-lg-10 col-sm-8 title mt-sm-5 mt-md-0">Magasin de produits par catégorie</h1>
        <div className="col-md-3 col-lg-2 col-sm-4 mt-sm-5 mt-md-0">
          <div className="voir_tout">
            <Link
              to="/products"
              className="offset-3 row d-flex align-content-end"
              style={{ textDecoration: "none", color: "#FA7F1B" }}
            >
              <div className="col-8 text-end">Voir tout</div>
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
        slidesPerView={4}
        spaceBetween={15}
        className="Liste_produits d-none d-md-block"
      >
        {product_category.map((product) => (
          <SwiperSlide key={product.id} className="product_slide" onClick={handleNavigation}>
            <img src={product.img} alt={product.name} className="img_product" />
            <div className="product_title">{product.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>

        {/* Le swiper pour les petits écrans  */}

        <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        slidesPerView={3}
        spaceBetween={15}
        className="Liste_produits d-md-none"
      >
        {product_category.map((product) => (
          <SwiperSlide key={product.id} className="product_slide" onClick={handleNavigation}>
            <img src={product.img} alt={product.name} className="img_product" />
            <div className="product_title">{product.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default Content;
