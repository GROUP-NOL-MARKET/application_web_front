import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchLimitedProducts } from "../../Store/ProductsSlice";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader";
import { getProductImage } from "../../Utils/Cloudinary";
import Rating from "@mui/material/Rating";
import VusProduct from "../Products/VusProduct";

import "swiper/css";
import "swiper/css/navigation";

const CATEGORY = "POPULAIRES";

const PopularProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showPopUp, setshowPopUp] = useState(false);
    const closePopUp = () => {
        setshowPopUp(false);
        setSelectedProduct(null);
    };
    const openPopUp = (product) => {
        setSelectedProduct(product);
        setshowPopUp(true);
    };

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
        <section className="pb-3 pt-5">
            <div className="container-fluid">
                {/* Titre */}
                <div className="d-flex justify-content-between align-items-center mb-0">
                    <h2 className="fw-bold title">Produits populaires</h2>
                    <span
                        className="fw-semibold"
                        style={{ color: "#FA7F1B", cursor: "pointer" }}
                        onClick={() => navigate("/products?popular=true")}
                    >
                        Voir plus <FontAwesomeIcon className="d-none d-md-inline" icon={faArrowAltCircleRight} />
                    </span>
                </div>
                <hr className="mb-2 mt-0" style={{ color: "#FA7F1B" }} />

                {displayedProducts.length === 0 ? (
                    <div className="text-center py-2" style={{ color: "#FA7F1B", fontWeight: "700" }}>
                        Aucun produit populaire
                    </div>
                ) : (
                    <div>
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
                                    <div className="card popular-card shadow-sm">
                                        <img
                                            src={getProductImage(product.image)}
                                            className="card-img-top"
                                            alt={product.name}
                                            onClick={() => openPopUp(product)}
                                            style={{ height: "200px", objectFit: "contain" }}
                                        />
                                        <div className="card-body popular-card-body text-center d-flex flex-column">
                                            <h6 className="fw-semibold">{product.name}</h6>
                                            <p className="fw-bold mb-2" color="#fa7f1e">
                                                {formatPrice(product.price)} FCFA
                                            </p>
                                            <span className="d-flex justify-content-center"><Rating name="half-rating-read" defaultValue={5} precision={0.5} size="sm" readOnly /> 5.0</span>
                                            <button className="btn btn-primary btn-sm mt-auto rounded-4 taux_moyen">
                                                Ajouter au panier
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Pour les petits écrans */}

                        <Swiper
                            slidesPerView={2.4}
                            spaceBetween={12}
                            loop={false}
                            className="d-md-none mt-2"
                        >
                            {displayedProducts.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <div className="card popular-card shadow-sm">
                                        <img
                                            src={getProductImage(product.image)}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: "200px", objectFit: "contain" }}
                                        />
                                        <div className="card-body popular-card-body text-center d-flex flex-column">
                                            <h6 className="fw-semibold text-truncate" title={product.name}>{product.name}</h6>
                                            <p className="fw-bold mb-2" color="#fa7f1e">
                                                {formatPrice(product.price)} FCFA
                                            </p>
                                            <span className="d-flex justify-content-center"><Rating name="half-rating-read" defaultValue={5} precision={0.5} size="sm" readOnly /> 5.0</span>
                                            <button className="btn btn-primary btn-sm mt-2 rounded-4 taux_moyen">
                                                Ajouter au panier
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
            {showPopUp && (
                <VusProduct closePopUp={closePopUp} product={selectedProduct} />
            )}
        </section>

    );
};

export default React.memo(PopularProducts);
