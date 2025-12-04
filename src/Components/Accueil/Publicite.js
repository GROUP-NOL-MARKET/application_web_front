import React, { useState, useEffect, useRef } from "react";
import API from "../Authentification/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import EmblaAutoplay from "embla-carousel-autoplay";

const Publicite = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const autoplay = useRef(
    EmblaAutoplay({ delay: 3000, stopOnInteraction: false }) // défile chaque 3s
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

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
    <div className="container mt-3">
      {/* Mobile: simple scrollable carousel */}
      {/* <div className="mobile-carousel-container d-lg-none">
        {carouselImages.map((img, idx) => (
          <div key={img.id || idx} className="mobile-carousel-item carousel-slide">
            <img src={img.url} alt={`img_${idx}`} className="mobile-carousel-img" />
          </div>
        ))}
      </div> */}

      <div className="embla d-lg-none mt-4">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="mobile-carousel-container">
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
      </div>

      {/* Desktop: Swiper carousel avec navigation et zoom */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={3}
        spaceBetween={15}
        className="d-none d-lg-block mt-4"
      >
        {carouselImages.map((img, idx) => (
          <SwiperSlide
            key={img.id || idx}
            className="carousel-slide mobile-carousel-item"
          >
            <div className="zoom-container">
              <img
                src={img.url}
                alt={`img_${idx}`}
                className="mobile-carousel-img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CSS inline ou via ton fichier CSS */}
      <style jsx>{`
        .zoom-container {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Publicite;
