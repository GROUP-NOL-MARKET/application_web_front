import React, { useState, useEffect, useRef } from "react";
import API from "../Authentification/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Publicite = () => {
  const [carouselImages, setCarouselImages] = useState([]);

  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.offsetWidth * 0.85; // car tes slides font 85%
    const interval = setInterval(() => {
      // Si on arrive à la fin → retour au début
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 50) {
        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        carousel.scrollBy({
          left: scrollAmount + 10, // +10 = ton gap
          behavior: "smooth",
        });
      }
    }, 3000); // toutes les 3 secondes

    return () => clearInterval(interval);
  }, [carouselImages]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const localCache = localStorage.getItem("carouselImages");
        if (localCache) setCarouselImages(JSON.parse(localCache));

        const res = await API.get("/publicite");
        const freshData = res.data.data;
        if (JSON.stringify(freshData) !== localCache) {
          setCarouselImages(freshData);
          localStorage.setItem("carouselImages", JSON.stringify(freshData));
        }
      } catch (err) {
        console.error("Erreur fetch publicite images", err);
      }
    };

    fetchImages();
    const handler = () => fetchImages();
    window.addEventListener("coverImagesUpdated", handler);
    return () => window.removeEventListener("coverImagesUpdated", handler);
  }, []);

  return (
    <div className="container-fluid mt-3">


      <div className=" d-lg-none mt-4">
        <div className="mobile-carousel-container" ref={carouselRef}>
          {carouselImages.map((img, idx) => (
            <div className=" mobile-carousel-item" key={idx}>
              <img
                src={img.url}
                alt={`img_${idx}`}
                className="mobile-carousel-img"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Swiper carousel avec navigation et zoom */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={15}
        slidesPerView={1}
        className="d-none d-lg-block mt-4"
      >
        {carouselImages.map((img, idx) => (
          <SwiperSlide
            key={img.id || idx}
            className="desktop-slide"
          >

            <img
              src={img.url}
              alt={`img_${idx}`}
              className="desktop-slide-img"
            />

          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default Publicite;
