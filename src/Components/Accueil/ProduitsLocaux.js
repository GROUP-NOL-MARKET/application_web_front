import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PanierContext } from "../../Store/Panier_context";
import { FavoriteContext } from "../../Store/Favoris_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleRight,
    faCartShopping,
    faHeart
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useEmblaCarousel from "embla-carousel-react";
import "../../Styles/Header.css";
import "../../Styles/Content.css";
import Preloader from "../Preloader";
import { AuthContext } from "../AuthContext";
import VusProduct from "../Products/VusProduct";

const ProduitsLocaux = () => {
    const { addProductToCart } = useContext(PanierContext);
    const { addFavorite } = useContext(FavoriteContext);
    const { isLoggedIn } = useContext(AuthContext);

    const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
    const navigate = useNavigate();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopUp, setshowPopUp] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const closePopUp = () => {
        setshowPopUp(false);
        setSelectedProduct(null);
    };

    const openPopUp = (product) => {
        setSelectedProduct(product);
        setshowPopUp(true);
    };

    // ✅ Chargement des produits avec cache session
    useEffect(() => {
        const cachedProducts = sessionStorage.getItem("produits_locaux");

        if (cachedProducts) {
            setProducts(JSON.parse(cachedProducts));
            setLoading(false);
        } else {
            const fetchProducts = async () => {
                try {
                    const url = new URL("http://127.0.0.1:8000/api/products");
                    url.searchParams.append("sous_category", "Produits Locaux");

                    const response = await fetch(url);
                    const result = await response.json();

                    const data = result.data || [];
                    setProducts(data);
                    sessionStorage.setItem("produits_locaux", JSON.stringify(data));
                } catch (error) {
                    console.error("Erreur lors du chargement des produits :", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }
    }, []);

    // Mémorisation
    const memoizedProducts = useMemo(() => products, [products]);

    const handleNavigation2 = useCallback(
        (category) => {
            navigate(`/products?category=${encodeURIComponent(category)}`);
        },
        [navigate]
    );

    const handleAddToCart = useCallback(
        (product) => addProductToCart(product),
        [addProductToCart]
    );

    const handleAddFavorite = useCallback(
        (id) => addFavorite(id),
        [addFavorite]
    );

    return (
        <div className="container mt-1 mt-md-5">
            {/* --- Titre --- */}
            <div className="row">
                <h1 className="col-md-9 col-lg-10 col-sm-8 col-10 title mt-5 mt-md-0">
                    Produits Locaux
                </h1>
                <div className="col-md-3 col-lg-2 col-sm-4 col-2 mt-5 mt-md-0">
                    <div
                        className="voir_tout"
                        onClick={() => handleNavigation2("Produits Locaux")}
                        style={{ textDecoration: "none", color: "#FA7F1B", cursor: "pointer" }}
                    >
                        <div className="row d-flex align-content-end">
                            <div className="col-8 text-end d-none d-sm-block">Voir tout</div>
                            <div className="col-1">
                                <FontAwesomeIcon icon={faArrowAltCircleRight} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />
            </div>

            {/* --- ✅ Message de chargement sous le titre --- */}
            {loading ? (
                <div className="text-center py-4">Chargement des produits...</div>
            ) : memoizedProducts.length > 0 ? (
                <>
                    {/* --- Swiper Desktop --- */}
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        loop={memoizedProducts.length > 6}
                        slidesPerView={6}
                        spaceBetween={15}
                        className="Liste_produits d-none d-md-block mt-2"
                    >
                        {memoizedProducts.map((product) => (
                            <SwiperSlide
                                key={product.id}
                                className="product_slide border border-1 shadow-sm"
                            >
                                <img
                                    loading="lazy"
                                    src={
                                        product.image.startsWith("http")
                                            ? product.image
                                            : `http://127.0.0.1:8000/storage/${product.image}`
                                    }
                                    alt={product.name}
                                    className="img_product swiper-lazy"
                                    onClick={() => openPopUp(product)}
                                />
                                <div className="border border-1 border-top w-100 text-center py-2">
                                    <div className="product_title fw-bold petit_titre">
                                        {product.name}
                                    </div>
                                    <div className="text-muted">{product.price} FCFA</div>
                                    <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                            onClick={() => handleAddToCart(product)}
                                            style={{ cursor: "pointer" }}
                                        />
                                        {isLoggedIn && (
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                onClick={() => handleAddFavorite(product.id)}
                                                style={{ cursor: "pointer", color: "#FA7F1B" }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* --- Carrousel mobile --- */}
                    <div className="embla d-lg-none mt-3">
                        <div className="embla__viewport" ref={emblaRef}>
                            <div className="embla__container">
                                {memoizedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="embla__slide border border-1 rounded-3 d-flex flex-column align-items-center me-2 shadow-sm"
                                    >
                                        <img
                                            loading="lazy"
                                            src={
                                                product.image.startsWith("http")
                                                    ? product.image
                                                    : `http://127.0.0.1:8000/storage/${product.image}`
                                            }
                                            alt={product.name}
                                            className="img_product"
                                            onClick={() => openPopUp(product)}
                                        />
                                        <div className="text-center mt-2">
                                            <div className="fw-bold petit_titre">{product.name}</div>
                                            <div className="text-muted small">{product.price} FCFA</div>
                                            <div className="d-flex flex-row justify-content-center gap-3 mt-2">
                                                <FontAwesomeIcon
                                                    icon={faCartShopping}
                                                    onClick={() => handleAddToCart(product)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    onClick={() => handleAddFavorite(product.id)}
                                                    style={{ cursor: "pointer", color: "#FA7F1B" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-4">Aucun produit trouvé</div>
            )}

            {showPopUp && (
                <VusProduct closePopUp={closePopUp} product={selectedProduct} />
            )}
        </div>
    );
};

export default ProduitsLocaux;
