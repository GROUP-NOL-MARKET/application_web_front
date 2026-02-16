import React, { useEffect, useState } from "react";
import { Rating, Avatar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import API from "../Authentification/api"; // ton axios personnalisé

const Avis = () => {
  const [avisList, setAvisList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement des avis depuis l'API
  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const response = await API.get("/reviews"); // GET /api/reviews
        setAvisList(response.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des avis :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvis();
  }, []);

  // Si en chargement rien pour éviter les flashs
  if (loading) return null;

  //  Si aucun avis ne pas afficher le composant
  if (avisList.length === 0) return null;

  return (
    <div className="mt-4 mb-3">
      <div className="container-fluid">
        <div className="a_propos_title_1 text-uppercase">
          Nos clients en parlent
        </div>
        <hr
          style={{ color: "#FA7F1B", height: "0.5rem" }}
          className="m-0"
        />

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={50}
          slidesPerView={2}
        >
          {avisList.map((avis) => (
            <SwiperSlide
              key={avis.id}
              className="border border-1 bg-white shadow-md m-3"
              style={{ borderRadius: "10px", padding: "10px" }}
            >
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  alt={avis.user?.name}
                  src={avis.user?.avatar || "/default-avatar.webp"} // ton image par défaut
                  sx={{
                    width: 60,
                    height: 60,
                    border: "3px solid #FA7F1B",
                  }}
                />

                <h5 style={{ fontWeight: "bold" }}>
                  {avis.user?.name || "Client"}
                </h5>

                <Rating value={avis.notation} readOnly />

                <p style={{ fontSize: "14px", textAlign: "center" }}>
                  {avis.appreciation}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Avis;
