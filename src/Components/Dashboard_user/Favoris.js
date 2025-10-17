// src/components/Favoris/Favoris.jsx
import React, { useEffect, useMemo, lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoris, removeFavori } from "../../Store/FavorisSlice";
import favorisImg from "../assets/Images/icone/favourite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PanierContext } from "../../Store/Panier_context";
import Animation from "../animation/loading_gray.json";
import VusProduct from "../Products/VusProduct";

const Lottie = lazy(() => import("lottie-react"));

const Favoris = () => {
    const dispatch = useDispatch();
    const { items: favorites, loading } = useSelector((state) => state.favoris);
    const { addProductToCart } = React.useContext(PanierContext);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        dispatch(fetchFavoris());
    }, [dispatch]);

    const openPopUp = (product) => {
        setSelectedProduct(product);
        setShowPopUp(true);
    };

    const closePopUp = () => {
        setSelectedProduct(null);
        setShowPopUp(false);
    };

    const contenu = useMemo(() => {
        if (loading) {
            return (
                <Suspense fallback={<div>Chargement...</div>}>
                    <Lottie animationData={Animation} loop style={{ width: 50, height: 50, margin: "auto" }} />
                </Suspense>
            );
        }

        if (!favorites || favorites.length === 0) {
            return (
                <div className="d-flex flex-column align-items-center justify-content-center my-3 text-center">
                    <img src={favorisImg} alt="Favoris vide" style={{ height: "60px" }} />
                    <p className="p-1 m-0 texte_brut">Vous n'avez aucun favoris pour l'instant.</p>
                    <p className="p-0 m-0 texte_brut">
                        Trouvez un article que vous aimez ? Cliquez sur le ❤️ pour l'ajouter à votre liste d'envies.
                    </p>
                </div>
            );
        }

        return (
            <div className="row">
                {favorites.map((favori) => (
                    <div key={favori.id} className="col-6 col-md-4 col-lg-3 mt-2">
                        <div className="border border-1 shadow-sm p-2 d-flex flex-column justify-content-between" style={{ height: "250px" }}>
                            <div className="bg-light text-center p-1">
                                <img
                                    src={favori.product?.image}
                                    alt={favori.product?.name}
                                    className="img_product"
                                    style={{ maxHeight: "120px", objectFit: "contain" }}
                                    onClick={() => openPopUp(favori.product)}
                                />
                            </div>
                            <div className="mt-2 text-center">
                                <h3 className="petit_titre fw-bold text-truncate">{favori.product?.name}</h3>
                                <h4 className="petit_titre text-secondary">{favori.product?.category}</h4>
                                <h5 className="petit_titre fw-bold">
                                    {favori.product?.price?.toLocaleString()} FCFA
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        onClick={() => addProductToCart(favori.product)}
                                        style={{ cursor: "pointer", color: "#fa7f1b" }}
                                        className="ms-2"
                                    />
                                </h5>
                                <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => dispatch(removeFavori(favori.id))}>
                                    Retirer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }, [favorites, loading, addProductToCart]);

    return (
        <div className="shadow-sm border border-1 p-2">
            <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                <h2 className="taux_moyen">Favoris</h2>
            </div>
            <div className="container-fluid">{contenu}</div>
            {showPopUp && <VusProduct closePopUp={closePopUp} product={selectedProduct} />}
        </div>
    );
};

export default Favoris;
