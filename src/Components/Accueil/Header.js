import { useNavigate } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import AdBanner from "./../AdBanner";
import Navbar3 from "./Navbar/Navbar3";
import "../../Styles/Header.css";
import { category_product } from "../Product_Data";
import API from "../Authentification/api";

import "swiper/css";
import "swiper/css/navigation";

const Header = () => {
  const navigate = useNavigate();
  const categories = useMemo(() => category_product, []);

  // Images dynamiques du carousel
  const [carouselImages, setCarouselImages] = useState([]);

  // Bannières dynamiques
  const [banners, setBanners] = useState([]);

  /** ================================
   *   CHARGEMENT DES BANNIÈRES
   *  ================================ */
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const localCache = localStorage.getItem("bannersCache");

        // Charger immédiatement depuis le cache
        if (localCache) {
          const parsed = JSON.parse(localCache);
          setBanners(parsed);
        }

        // Fetch en arrière-plan
        const res = await API.get("/bannieres");
        const freshData = res.data.bannieres;

        // Si aucune différence → ne rien mettre à jour
        if (JSON.stringify(freshData) !== localCache) {
          setBanners(freshData);
          localStorage.setItem("bannersCache", JSON.stringify(freshData));
        }
      } catch (err) {
        console.error("Erreur fetch bannières", err);
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
    const fetchImages = async () => {
      try {
        const localCache = localStorage.getItem("carouselImages");

        if (localCache) {
          const parsed = JSON.parse(localCache);
          setCarouselImages(parsed);
        }

        // On fetch en arrière-plan pour vérifier si y’a du nouveau
        const res = await API.get("/cover-images");
        const freshData = res.data.data;

        // Si aucune différence → ne rien faire
        if (JSON.stringify(freshData) !== localCache) {
          setCarouselImages(freshData);
          localStorage.setItem("carouselImages", JSON.stringify(freshData));
        }
      } catch (err) {
        console.error("Erreur fetch cover images", err);
      }
    };

    fetchImages();

    // Mettre à jour automatiquement après ajout côté admin
    const handler = () => fetchImages();
    window.addEventListener("coverImagesUpdated", handler);

    return () => window.removeEventListener("coverImagesUpdated", handler);
  }, []);

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
            loading="lazy"
            src={img.url}
            className="d-block w-100 hauteur_carousel"
            alt={`carousel_${index}`}
          />
{/* 
          <div className="carousel-caption d-none d-md-block">
            <h5>{img.description || `Image ${index + 1}`}</h5>
          </div> */}
        </div>
      )),
    [carouselImages]
  );

  return (
    <header className="mb-3">
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
      <div className="container mt-3">
        <div className="row">
          {/* Menu catégories (Desktop) */}
          <aside className="col-lg-3 d-none d-lg-block">
            <Navbar3 />
          </aside>

          {/* Carousel principal */}
          <section className="col-12 col-lg-9 mt-2">
            <div className="row">
              <div className="col-lg-9 d-none d-lg-block">
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
                    {carouselSlides}
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
                <div className="mobile-carousel-container">
                  {carouselImages.map((img, index) => (
                    <div key={img.id || index} className="mobile-carousel-item">
                      <img
                        src={img.url}
                        alt={`img_${index}`}
                        className="mobile-carousel-img"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Catégories Desktop */}
              <div className="col-3 d-none d-lg-block">
                <p className="text-uppercase font-bold title_category_product d-flex justify-content-center">
                  Catégories de produits
                </p>

                <div className="m-2">
                  {categories.slice(0, 3).map((category_p) => (
                    <div
                      key={category_p.category}
                      onClick={() => handleNavigation2(category_p.category)}
                      className="text-decoration-none text-black"
                    >
                      <div className="border border-1 mt-2 category_content shadow-sm">
                        <div className="d-flex flex-column">
                          <img
                            loading="lazy"
                            alt={category_p.category}
                            src={category_p.image}
                            className="category_img rounded-2"
                          />
                          <h3 className="category_name text-uppercase">
                            {category_p.category}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Autres catégories Desktop */}
              <div className="mt-4 d-none d-lg-block">
                <div className="row">
                  {categories.slice(3, 9).map((category_p) => (
                    <div
                      key={category_p.category}
                      onClick={() => handleNavigation2(category_p.category)}
                      className="text-decoration-none text-black col-2"
                    >
                      <div className="border border-1 category_content shadow-sm">
                        <div className="d-flex flex-column">
                          <img
                            loading="lazy"
                            alt={category_p.category}
                            src={category_p.image}
                            className="category_img rounded-2"
                          />
                          <h3 className="category_name text-uppercase">
                            {category_p.category}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- Catégories Mobile --- */}
          <section className="d-lg-none">
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
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
