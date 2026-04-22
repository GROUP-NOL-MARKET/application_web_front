import React, { useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchLimitedProducts } from "../../Store/ProductsSlice";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader";
import { getProductImage } from "../../Utils/Cloudinary";

import "swiper/css";
import "swiper/css/navigation";

const CATEGORY = "POPULAIRES";

const PopularProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(
        (state) => state.products.items[CATEGORY] || []
    );

    const status = useSelector(
        (state) => state.products.statusByCategory[CATEGORY] || "idle"
    );

    const error = useSelector(
        (state) => state.products.errorByCategory[CATEGORY]
    );

    /* =======================
        FETCH UNE SEULE FOIS
    ======================= */
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchLimitedProducts({ category: CATEGORY, limit: 12 }));
        }
    }, [status, dispatch]);

    const displayedProducts = useMemo(
        () => products.slice(0, 12),
        [products]
    );

    /* =======================
        RENDER
    ======================= */
    if (status === "loading") {
        return (
            <section className="py-5 bg-light">
                <div className="container text-center">
                    <Preloader />
                </div>
            </section>
        );
    }

    if (status === "failed") {
        return (
            <section className="py-5 bg-light">
                <div className="container text-center text-danger">
                    {error || "Erreur de chargement"}
                </div>
            </section>
        );
    }
    const formatPrice = (price) => {
        const numericValue = typeof price === 'string' ? parseFloat(price) : price;

        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numericValue);
    };

    return (
        <section className="py-5 bg-light">
            <div className="container-fluid">
                {/* Titre */}
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="fw-bold mb-0 title">Produits populaires</h2>
                    <span
                        className="fw-semibold"
                        style={{ color: "#FA7F1B", cursor: "pointer" }}
                        onClick={() => navigate("/products?popular=true")}
                    >
                        Voir plus <FontAwesomeIcon className="d-none d-md-inline" icon={faArrowAltCircleRight} />
                    </span>
                </div>

                <hr className="mb-2" style={{ height: "3px", backgroundColor: "#FA7F1B" }} />

                {displayedProducts.length === 0 ? (
                    <div className="text-center py-2" style={{ color: "#FA7F1B", fontWeight: "700" }}>
                        Aucun produit populaire
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        spaceBetween={20}
                        breakpoints={{

                            768: { slidesPerView: 4 },
                            992: { slidesPerView: 6 },
                        }}
                        className="d-none d-md-block"
                    >
                        {displayedProducts.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <img
                                        src={getProductImage(product.image)}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body text-center d-flex flex-column">
                                        <h6 className="fw-semibold">{product.name}</h6>
                                        <p className="fw-bold mb-2" color="#fa7f1e">
                                            {formatPrice(product.price)} FCFA
                                        </p>
                                        <button className="btn btn-primary btn-sm mt-auto rounded-4 taux_moyen">
                                            Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default React.memo(PopularProducts);
