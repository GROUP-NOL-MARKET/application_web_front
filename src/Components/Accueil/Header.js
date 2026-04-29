import { useNavigate } from "react-router-dom";
import { useMemo, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import AdBanner from "./../AdBanner";
import Navbar3 from "./Navbar/Navbar3";
import "../../Styles/Header.css";
import API from "../Authentification/api";
import epicerie from "../assets/Images/epicerie.avif";
import droguerie from "../assets/Images/droguerie.avif";
import promo from "../assets/Images/promotions.avif";
import boisson from "../assets/Images/boisson.avif";
import { AnimatePresence } from "framer-motion";
import Skeleton from "../ui/Skeleton";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';



import "swiper/css";
import "swiper/css/navigation";
import { useImageCache } from "../../Store/ImageCacheContext";

const Header = () => {
  const navigate = useNavigate();
  const [isCarouselLoading, setIsCarouselLoading] = useState(true);
  const [isBannerLoading, setIsBannerLoading] = useState(true);
  // const [imageLoaded, setImageLoaded] = useState(false);

  const {
    carouselImages,
    setCarouselImages,
    setImagesLoaded
  } = useImageCache();


  // Images dynamiques du carousel




  // const [carouselImages, setCarouselImages] = useState([]);

  // Bannières dynamiques
  const [banners, setBanners] = useState([]);

  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.offsetWidth * 0.85; // car les slides font 85%
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


  /** ================================
   *   CHARGEMENT DES BANNIÈRES
   *  ================================ */
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsBannerLoading(true);

        const localCache = localStorage.getItem("bannersCache");

        if (localCache) {
          setBanners(JSON.parse(localCache));
          setIsBannerLoading(false);
        }

        const res = await API.get("/bannieres");
        const freshData = res.data.bannieres;

        if (JSON.stringify(freshData) !== localCache) {
          setBanners(freshData);
          localStorage.setItem("bannersCache", JSON.stringify(freshData));
        }
      } catch (err) {
        console.error("Erreur fetch bannières", err);
      } finally {
        setIsBannerLoading(false);
      }
    };

    fetchBanners();


    // Mise à jour automatique après ajout côté admin
    const handler = () => fetchBanners();
    window.addEventListener("bannersUpdated", handler);

    return () => window.removeEventListener("bannersUpdated", handler);
  }, []);

  /** ================================
   *  CHARGEMENT DES IMAGES COVER
   *  ================================ */
  useEffect(() => {
    if (carouselImages.length > 0) return;

    const fetchImages = async () => {
      setIsCarouselLoading(true);

      try {
        const res = await API.get("/cover-images");
        setCarouselImages(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, [carouselImages]);


  useEffect(() => {
    if (carouselImages.length === 0) return;

    let isMounted = true;

    const preloadImages = async () => {
      setIsCarouselLoading(true);

      await Promise.all(
        carouselImages.map((img) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.src = img.url;

            image.onload = resolve;
            image.onerror = resolve;
          });
        })
      );

      if (isMounted) {
        setImagesLoaded(true);
        setIsCarouselLoading(false);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [carouselImages]);

  /** ================================
   *  Navigation catégories
   *  ================================ */
  const handleNavigation2 = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  /** ================================
   *  INDICATEURS DU CAROUSEL
   *  ================================ */
  const carouselIndicators = useMemo(
    () =>
      carouselImages.map((img, index) => (
        <button
          key={img.id}
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-label={`Slide ${index + 1}`}
        />
      )),
    [carouselImages]
  );

  /** ================================
   *  SLIDES DU CAROUSEL
   *  ================================ */
  const carouselSlides = useMemo(
    () =>
      carouselImages.map((img, index) => (
        <div
          key={img.id}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <img
            src={img.url}
            alt={`carousel_${index}`}
          // onLoad={() => {
          //   if (index === 0) {
          //     setImageLoaded(true);
          //     setIsCarouselLoading(false);
          //   }
          // }}
          />

          {/* 
          <div className="carousel-caption d-none d-md-block">
            <h5>{img.description || `Image ${index + 1}`}</h5>
          </div> */}
        </div>
      )),
    [carouselImages]
  );

  const category = [{
    categories: "epicerie",
    image: epicerie,
  },
  {
    categories: "Promotions",
    image: promo,

  },
  {
    categories: "droguerie",
    image: droguerie,

  },
  {
    categories: "boissons",
    image: boisson,

  }];

  return (
    <header className="mb-3 header">
      {/* --- Bannière promo Desktop --- */}
      {banners.map((banner, index) => (
        <div className="container-fluid px-0 d-none d-lg-block" key={index}>
          <div className="banner overflow-hidden shadow-sm">
            <AdBanner
              imageUrl={banner.images}
              title="Promo exclusive !"
              subtitle={banner.subTitle}
              ctaText1="J'en profite"
              ctaText2={`-${banner.percent}%`}
              ctaLink={banner.link}
              pub_num={banner.phone}
            />
          </div>
        </div>
      ))}

      {/* --- Section principale --- */}
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Menu catégories (Desktop) */}
          <aside className="col-lg-2 d-none d-lg-block">
            <Navbar3 />
          </aside>

          {/* Carousel principal */}
          <section className="col mt-2 amazon-hero position-relative">
            <div className="row">
              <div className="col d-none d-lg-block">
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  {/* Indicateurs */}
                  <div className="carousel-indicators">
                    {carouselIndicators}
                  </div>

                  {/* Slides */}
                  <div className="carousel-inner rounded-3 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {isCarouselLoading ? (
                        <motion.div
                          key="skeleton"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Skeleton height={400} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="carousel"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          {carouselSlides}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Contrôles */}
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
                    <span className="visually-hidden">Précédent</span>
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
                    <span className="visually-hidden">Suivant</span>
                  </button>
                </div>
              </div>

              {/* --- Carousel Mobile--- */}
              <div className="d-lg-none mt-2">
                <AnimatePresence mode="wait">
                  {isCarouselLoading ? (
                    <motion.div
                      key="mobile-skeleton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Skeleton height={220} radius={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mobile-carousel"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="mobile-carousel-container" ref={carouselRef}>
                        {carouselImages.map((img, index) => (
                          <div key={img.id || index} className="mobile-carousel-item" onClick={() => navigate(img.link)}>
                            <img
                              src={img.url}
                              alt={`img_${index}`}
                              className="mobile-carousel-img"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
            {/* Blocs superposés type Amazon */}
            <div className="amazon-overlay container d-none d-md-block">
              <div className="row w-100 g-3">
                {category.slice(0, 4).map((category_p) => (
                  <div key={category_p.categories} className="col-3">
                    <div
                      className="amazon-card"
                      onClick={() => handleNavigation2(category_p.categories)}
                    >

                      <img
                        src={category_p.image}
                        alt={category_p.categories}
                        className="img-fluid rounded-2"
                      />

                      <small className="text-primary mt-2 d-block voir">
                        Voir plus <ArrowRightAltIcon />
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* ====== MOBILE SWIPER ====== */}
            <div className=" my-4 d-md-none">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={12}
                slidesPerView={2.4}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
              >
                {category.slice(0, 4).map((category_p, index) => (
                  <SwiperSlide key={category_p.categories}>
                    <motion.div
                      className="amazon-card"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      onClick={() => handleNavigation2(category_p.categories)}
                    >
                      <img
                        src={category_p.image}
                        alt={category_p.categories}
                        className="img-fluid rounded-2"
                      />

                      {/* <small className="text-primary mt-2 d-block voir text-center">
                        Voir plus
                      </small> */}
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>


          </section>


          {/* --- Catégories Mobile --- */}
          {/* <section className="d-lg-none">
            <h5 className="fw-bold mb-2 petit_titre">Catégories de produits</h5>

            <div className="categories-scroll-mobile">
              {categories.slice(0, 9).map((category_p) => (
                <div
                  key={category_p.category}
                  className="category-item-mobile col-4"
                  onClick={() => handleNavigation2(category_p.category)}
                >
                  <div className="border shadow-sm rounded-3 d-flex flex-column align-items-center p-2">
                    <img
                      loading="lazy"
                      src={category_p.image}
                      alt={category_p.category}
                      className="img-fluid rounded-2"
                    />
                    <small className="text-center mt-2 fw-semibold">
                      {category_p.category}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
