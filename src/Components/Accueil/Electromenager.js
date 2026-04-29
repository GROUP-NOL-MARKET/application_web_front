import React, {
    useState,
    useContext,
    useMemo,
    useCallback,
    useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleRight,
    faHeart,
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLimitedProducts } from "../../Store/ProductsSlice";
import Preloader from "../Preloader";
import { AuthContext } from "../AuthContext";
import { FavoriteContext } from "../../Store/Favoris_context";
import { PanierContext } from "../../Store/Panier_context";
import VusProduct from "../Products/VusProduct";
// import API from "../Authentification/api";
import { getProductImage } from "../../Utils/Cloudinary";

const CATEGORY = "Électroménager";
const CACHE_KEY = "electromenager_products_v1";

const Electromenager = () => {
    // const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    const [localProducts, setLocalProducts] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [cacheError, setCacheError] = useState(null);

    const { isLoggedIn } = useContext(AuthContext);
    const { addFavorite, favorites, removeFavorite } = useContext(FavoriteContext);
    const { addProductToCart } = useContext(PanierContext);

    const { items, status } = useSelector((state) => state.products);
    const productsFromRedux = items[CATEGORY] || [];

    // const getImageUrl = (image) => {
    //     if (!image) return "/placeholder.png";

    //     // si backend renvoie déjà une URL complète
    //     if (image.startsWith("http")) {
    //         return encodeURI(image);
    //     }

    //     // si backend renvoie juste "products/xxx.avif"
    //     return encodeURI(`${API.defaults.baseURL}/storage/${image}`);
    // };

    useEffect(() => {
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setLocalProducts(parsed);
                    setLoadingLocal(false);
                    return;
                }
            }
        } catch (err) {
            setCacheError("Erreur cache");
        }
    }, []);

    useEffect(() => {
        if (productsFromRedux.length > 0) {

            setLocalProducts(productsFromRedux);
            setLoadingLocal(false);
            try {
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(productsFromRedux));

            } catch { }
        }
    }, [productsFromRedux]);

    useEffect(() => {
        const shouldFetch =
            localProducts.length === 0 &&
            productsFromRedux.length === 0 &&
            status !== "loading";

        if (shouldFetch) {
            dispatch(fetchLimitedProducts({ category: CATEGORY, limit: 12 }));
        }
    }, [localProducts, productsFromRedux, status, dispatch]);

    const handleNavigation2 = useCallback(
        (category) => navigate(`/products?category=${encodeURIComponent(category)}`),
        [navigate]
    );

    const handleAddToCart = useCallback(
        (product) => addProductToCart(product),
        [addProductToCart]
    );

    const openPopUp = useCallback((product) => {
        setSelectedProduct(product);
        setShowPopUp(true);
    }, []);

    const closePopUp = useCallback(() => {
        setShowPopUp(false);
        setSelectedProduct(null);
    }, []);

    const memoizedProducts = useMemo(
        () => localProducts.slice(0, 12),
        [localProducts]
    );

    const formatPrice = (price) => {
        const numericValue = typeof price === 'string' ? parseFloat(price) : price;

        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numericValue);
    };

    const isLoading =
        loadingLocal || (status === "loading" && memoizedProducts.length === 0);

    return (
        <motion.div
            className="container-fluid mt-2 mt-md-5"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="row">
                <h1 className="col-8 title mt-3 mt-md-0">
                    Électroménager
                </h1>
                <div className="col mt-3 mt-md-0">
                    <div
                        className="voir_tout"
                        onClick={() => handleNavigation2(CATEGORY)}
                        style={{ color: "#FA7F1B", cursor: "pointer" }}
                    >
                        <div className="row d-flex align-content-end">
                            <div className="col text-end"> Voir plus <FontAwesomeIcon className="d-none d-md-inline" icon={faArrowAltCircleRight} /></div>
                        </div>
                    </div>
                </div>
                <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />
            </div>

            {isLoading ? (
                <div className="text-center py-4">
                    <Preloader />
                </div>
            ) : cacheError ? (
                <div className="text-center py-4 text-danger">{cacheError}</div>
            ) : memoizedProducts.length === 0 ? (
                <div className="text-center py-4">Aucun produit trouvé</div>
            ) : null}

            {!isLoading && memoizedProducts.length > 0 && (
                <Swiper
                    modules={[Navigation]}
                    navigation
                    loop={memoizedProducts.length > 4}
                    spaceBetween={12}
                    slidesPerView={2}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        576: {
                            slidesPerView: 3,
                            spaceBetween: 12,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 14,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 16,
                        },
                    }}
                    className="Liste_produits mt-2 d-none d-md-block"
                >
                    {memoizedProducts.map((product) => {

                        const isFavorite =
                            favorites.some((fav) => fav.product_id === product.id);

                        const toggleFavorite = () =>
                            isFavorite
                                ? removeFavorite(
                                    favorites.find((f) => f.product_id === product.id).id
                                )
                                : addFavorite(product.id);

                        return (
                            <SwiperSlide key={product.id}>
                                <div className="product-card shadow-sm">
                                    <div className="product-img-wrapper">
                                        <img
                                            loading="lazy"
                                            src={getProductImage(product.image)}
                                            alt={product.name}
                                            onClick={() => openPopUp(product)}
                                        />
                                    </div>

                                    <div className="product-info text-center">
                                        <div
                                            className="product-name text-truncate"
                                            title={product.name}
                                        >
                                            {product.name}
                                        </div>

                                        <div className="product-price">
                                            {formatPrice(product.price)} FCFA
                                        </div>

                                        <div className="product-actions">
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                onClick={() => handleAddToCart(product)}
                                            />

                                            {isLoggedIn && (
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    onClick={toggleFavorite}
                                                    style={{ color: isFavorite ? "red" : "#FA7F1B" }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>



            )}

            {/* ================= MOBILE SWIPER ================= */}
            <div className="d-md-none">
                <Swiper
                    loop={memoizedProducts.length > 2}
                    spaceBetween={10}
                    slidesPerView={2.3}
                    className="Liste_produits mt-2"
                >
                    {memoizedProducts.map((product) => {
                        const isFavorite =
                            favorites.some((fav) => fav.product_id === product.id);

                        const toggleFavorite = () =>
                            isFavorite
                                ? removeFavorite(
                                    favorites.find((f) => f.product_id === product.id).id
                                )
                                : addFavorite(product.id);

                        return (
                            <SwiperSlide key={product.id}>
                                <div className="product-card shadow-sm">
                                    <div className="product-img-wrapper">
                                        <img
                                            loading="lazy"
                                            src={getProductImage(product.image)}
                                            alt={product.name}
                                            onClick={() => openPopUp(product)}
                                        />
                                    </div>

                                    <div className="product-info text-center">
                                        <div
                                            className="product-name text-truncate"
                                            title={product.name}
                                        >
                                            {product.name}
                                        </div>

                                        <div className="product-price">
                                            {formatPrice(product.price)} FCFA
                                        </div>

                                        <div className="product-actions">
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                onClick={() => handleAddToCart(product)}
                                            />

                                            {isLoggedIn && (
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    onClick={toggleFavorite}
                                                    style={{ color: isFavorite ? "red" : "#FA7F1B" }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>



            {showPopUp && (
                <VusProduct closePopUp={closePopUp} product={selectedProduct} />
            )}
        </motion.div>
    );
};

export default React.memo(Electromenager);
