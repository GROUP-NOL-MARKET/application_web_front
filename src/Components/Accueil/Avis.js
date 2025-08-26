import React from "react";
import { Rating } from "@mui/material";
import { Avatar } from "@mui/material";
import img_profil from "../assets/Images/img_profil.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const Avis = () => {
  const Avis = [
    {
      id: 1,
      name: "John Doe",
      rating: 4,
      img: img_profil,
      profil: "Développeur",
      comment: "Excellent service et produits de qualité !",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      img: img_profil,
      profil: "Informaticien",
      comment: "J'ai adoré la variété de produits locaux disponibles.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      rating: 3,
      img: img_profil,
      profil: "Designer UI/UX",
      comment: "Bon choix, mais la livraison était un peu lente.",
    },
    {
      id: 4,
      name: "Bob Brown",
      rating: 4,
      img: img_profil,
      profil: "Producteur de société",
      comment: "Excellent support client et expédition rapide.",
    },
  ];
  return (
    <div className="mt-4 mb-3">
      <div className="container">
        <div className="a_propos_title_1">
          <div className="text-uppercase">Nos clients en parlent</div>
        </div>
        <hr style={{ color: "#FA7F1B", height: "0.5rem" }} className="m-0" />
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={50}
          slidesPerView={2}
        >

            {/* Navigation dans le tableau avec Swiper pour l'affichage des avis  */}

          {Avis.map((avis) => (
            <SwiperSlide
              key={avis.id}
              className="border border-1 bg-white shadow-md m-3 "
              style={{ borderRadius: "10px", padding: "10px" }}
            >
              <div className="d-flex flex-column align-items-center m-0 p-0">
                <div className=" ">
                  <Avatar
                    alt={avis.name}
                    src={avis.img}
                    style={{
                      width: "60px",
                      height: "60px",
                      border: "3px solid #FA7F1B",
                    }}
                  />
                </div>
                <div className="d-flex flex-column align-items-center p-0">
                  <h5 style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
                    {avis.name}
                  </h5>
                  <p style={{ fontFamily: "Roboto" }}>{avis.profil}</p>
                </div>
                <div className="d-flex flex-column align-items-center p-0">
                  <Rating name="size-medium" value={avis.rating} readOnly />
                  <p style={{ fontFamily: "Roboto", fontSize: "14px" }}>
                    {avis.comment}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Avis;
