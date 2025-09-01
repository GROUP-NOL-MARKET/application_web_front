import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import best_product_3 from "../assets/Images/bet_product_3.png";
import best_product_4 from "../assets/Images/best_product_4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../Styles/FlashSale.css";

const FlashSale = ({ duration }) => {
  const [time, setTime] = useState(duration);

  // Utilisation de use Effect et des fontions pour le décompte de temps de promotion

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
  }, [time]);
  const getFormattedTime = (milliseconds) => {
    let total_seconds = parseInt(Math.floor(milliseconds / 1000));
    let total_minutes = parseInt(total_seconds / 60);
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    let days = parseInt(Math.floor(total_hours / 24));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    let hours = parseInt(total_hours % 24);

    const Box = ({ value }) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "2px",
          margin: "2px",
          border: "1px solid #0066BD",
          borderRadius: "10px",
          backgroundColor: "#FA7F1B",
          minWidth: "10px",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
    );

    return (
      <div className="d-flex">
        <Box value={days} />
        <span className="d-flex  justify-content-center align-items-center">
          J
        </span>
        <Box value={hours} />
        <span className="d-flex  justify-content-center align-items-center">
          H
        </span>
        <Box value={minutes} />
        <span className="d-flex  justify-content-center align-items-center">
          M
        </span>
        <Box value={seconds} />
        <span className="d-flex  justify-content-center align-items-center">
          S
        </span>
      </div>
    );
  };
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/Promotion");
  };
  const product_flash_sale = [
    {
      id: 1,
      name: "Produit 1",
      description: "Description du produit 1",
      initial_price: 10,
      new_price: 5,
      pourcentage_vendu: 20,
      img: best_product_4,
    },
    {
      id: 2,
      name: "Produit 2",
      description: "Description du produit 2",
      initial_price: 20,
      new_price: 16,
      pourcentage_vendu: 25,
      img: best_product_4,
    },
    {
      id: 3,
      name: "Produit 3",
      description: "Description du produit 3",
      initial_price: 30,
      new_price: 18,
      pourcentage_vendu: 50,
      img: best_product_3,
    },
    {
      id: 4,
      name: "Produit 4",
      description: "Description du produit 4",
      initial_price: 40,
      new_price: 15,
      pourcentage_vendu: 30,
      img: best_product_4,
    },
    {
      id: 5,
      name: "Produit 5",
      description: "Description du produit 5",
      initial_price: 50,
      new_price: 20,
      pourcentage_vendu: 60,
      img: best_product_4,
    },
  ];
  return (
    <div>
      <div className="container mt-4">
        <div className="enTête row ">
          <h2
            className="col-lg-2 col-3 title_flash_sale mt-2"
            style={{ color: "#0066BD" }}
          >
            Vente <span className="d-none d-sm-inline">Flash</span> 
          </h2>
          <div className="col-lg-7 col-md-5 col-sm-5 col-6 promo_temps ">
            <div className="row">{getFormattedTime(time)}</div>
          </div>
          <div className="col-md-3 col-lg-2 offset-1 col-sm-3 col-1 mt-2">
            <div className="voir_tout">
              <Link
                to="/Promotion"
                style={{ textDecoration: "none", color: "#FA7F1B" }}
                className="row offset-lg-4 d-flex align-content-end"
              >
                <div className="offset-1 offset-md-2 offset-lg-0 col-8 col-lg-9 d-none d-sm-block">
                  Voir tout
                </div>
                <div className="col-1">
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <hr className="m-0" style={{ border: "1px solid #FA7F1B" }}></hr>

        <div className="product_flash_sale d-none d-md-block">
          <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            slidesPerView={4}
            spaceBetween={15}
            className="Liste_produits"
          >
            {product_flash_sale.map((product) => (
              <SwiperSlide key={product.id} className="product_slide">
                <img
                  src={product.img}
                  alt={product.name}
                  className="img_product"
                  onClick={handleNavigation}
                />
                <div className="discount_badge">
                  {product.initial_price - product.new_price}%
                </div>
                <div className="product_title">{product.name}</div>
                <div className="price_flash_sale">
                  <span className="p-2 new_price">
                    {product.new_price} FCFA
                  </span>
                  <span className="initial_price">
                    <s>{product.initial_price} FCFA</s>
                  </span>
                </div>
                <div className="progress w-100" style={{ height: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow={product.pourcentage_vendu}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${product.pourcentage_vendu}%` }}
                  >
                    {product.pourcentage_vendu}% vendu
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Produit flash pour les petits écrans  */}

        <div className="product_flash_sale d-none d-sm-block d-md-none">
          <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            slidesPerView={3}
            spaceBetween={15}
            className="Liste_produits"
          >
            {product_flash_sale.map((product) => (
              <SwiperSlide key={product.id} className="product_slide">
                <img
                  src={product.img}
                  alt={product.name}
                  className="img_product"
                  onClick={handleNavigation}
                />
                <div className="discount_badge">
                  {product.initial_price - product.new_price}%
                </div>
                <div className="product_title">{product.name}</div>
                <div className="price_flash_sale">
                  <span className="p-2 new_price">
                    {product.new_price} FCFA
                  </span>
                  <span className="initial_price">
                    <s>{product.initial_price} FCFA</s>
                  </span>
                </div>
                <div className="progress w-100" style={{ height: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow={product.pourcentage_vendu}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${product.pourcentage_vendu}%` }}
                  >
                    {product.pourcentage_vendu}% vendu
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pour les écrans xs  */}

        <div className="product_flash_sale  d-sm-none">
          <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            slidesPerView={2}
            spaceBetween={15}
            className="Liste_produits"
          >
            {product_flash_sale.map((product) => (
              <SwiperSlide key={product.id} className="product_slide">
                <img
                  src={product.img}
                  alt={product.name}
                  className="img_product"
                  onClick={handleNavigation}
                />
                <div className="discount_badge">
                  {product.initial_price - product.new_price}%
                </div>
                <div className="product_title">{product.name}</div>
                <div className="price_flash_sale">
                  <span className="p-2 new_price">
                    {product.new_price} FCFA
                  </span>
                  <span className="initial_price">
                    <s>{product.initial_price} FCFA</s>
                  </span>
                </div>
                <div className="progress w-100" style={{ height: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow={product.pourcentage_vendu}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${product.pourcentage_vendu}%` }}
                  >
                    {product.pourcentage_vendu}% vendu
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
