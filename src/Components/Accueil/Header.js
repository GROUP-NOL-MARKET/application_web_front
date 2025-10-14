// src/components/Header/Header.jsx
import { Link } from "react-router-dom";
import AdBanner from "./../AdBanner";
import Navbar3 from "./Navbar/Navbar3";
import carousel_1 from "../assets/Images/carousel_1.webp";
import carousel_2 from "../assets/Images/carousel_2.avif";
import carousel_3 from "../assets/Images/carousel_3.avif";
import "../../Styles/Header.css";
import { category_product } from "../Product_Data";
import img_pub from "../assets/Images/img_pub.webp";
import "swiper/css";
import "swiper/css/navigation";

const Header = () => {
  return (
    <header className="mb-3">
      {/* --- Bannière promo Desktop --- */}
      <div className="container-fluid px-0 d-none d-lg-block">
        <div className="banner overflow-hidden rounded-3 shadow-sm">
          <AdBanner
            imageUrl={img_pub}
            title="Promo exclusive !"
            subtitle="-30% sur toute la collection été"
            ctaText1="J'en profite"
            ctaText2="-30%"
            ctaLink="https://tonsite.com/promo-ete"
            pub_num="0160557866"
          />
        </div>
      </div>

      {/* --- Section principale --- */}
      <div className="container mt-3">
        <div className="row">
          {/* Menu catégories (Desktop) */}
          <aside className="col-lg-3 d-none d-lg-block">
            <Navbar3 />
          </aside>

          {/* Carousel principal */}
          <section className="col-12 col-lg-9 hauteur_carousel mt-2">
            <div className="row">
              <div className="hauteur_carousel col-lg-9">
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                  {/* Indicateurs */}
                  <div className="carousel-indicators">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Images du carousel */}
                  <div className="carousel-inner rounded-3 overflow-hidden">
                    {[carousel_1, carousel_2, carousel_3].map((img, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <img src={img} className="d-block w-100" alt={`carousel_${index + 1}`} />
                        <div className="carousel-caption d-none d-md-block">
                          <h5>Titre de l'image {index + 1}</h5>
                          <p>
                            {index === 0
                              ? "Découvrez nos meilleures offres sur la collection été."
                              : index === 1
                                ? "Profitez des dernières tendances à prix réduits."
                                : "Explorez nos nouveautés et bons plans du moment."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contrôles du carousel */}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Précédent</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Suivant</span>
                  </button>
                </div>
              </div>

              {/* --- Catégories Desktop --- */}

              <div className="col-3 d-none d-lg-block">
                <p className="text-uppercase font-bold title_category_product d-flex justify-content-center"> Catégories de produits </p>
                <div className="m-2">
                  {category_product.slice(0, 3).map((category_p) => (
                    <Link key={category_p.category} to={category_p.link} className="text-decoration-none text-black" >
                      <div className="border border-1 mt-2 category_content shadow-sm">
                        <div className="d-flex flex-column">
                          <img alt={category_p.category} src={category_p.image} className="category_img rounded-2" />
                          <h3 className="category_name text-uppercase"> {category_p.category} </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 d-none d-lg-block">
                <div className="row">
                  {category_product.slice(3, 9).map((category_p) => (
                    <Link key={category_p.category} to={category_p.link} className="text-decoration-none text-black col-2" >
                      <div className="border border-1 category_content shadow-sm">
                        <div className="d-flex flex-column">
                          <img alt={category_p.category} src={category_p.image} className="category_img rounded-2" />
                          <h3 className="category_name text-uppercase"> {category_p.category} </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>






          {/* --- Catégories Mobile --- */}
          <section className="d-lg-none ">
            <h5 className="fw-bold mb-2">Catégories de produits</h5>
            <div className="row g-2">
              {category_product.slice(0, 9).map((category_p) => (
                <div key={category_p.category} className="col-4 col-md-3">
                  <Link
                    to={category_p.link}
                    className="text-decoration-none text-dark"
                  >
                    <div className="border shadow-sm rounded-3 d-flex flex-column align-items-center p-2">
                      <img
                        src={category_p.image}
                        alt={category_p.category}
                        className="img-fluid rounded-2"
                      />
                      <small className="text-center mt-2 fw-semibold">
                        {category_p.category}
                      </small>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div >
      </div>
    </header >
  );
};

export default Header;
