import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentViews } from "../../Store/RecentViewsSlice";
import eye from "../assets/Images/icone/hidden.png";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";
import { PanierContext } from "../../Store/Panier_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import VusProduct from "../Products/VusProduct";

const ProdutctsVus = () => {
    const dispatch = useDispatch();
    const { data: recentView, loading, lastFetched } = useSelector((state) => state.recentViews);
    const { addProductToCart } = useContext(PanierContext);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showPopUp, setshowPopUp] = useState(false);
    const closePopUp = () => {
        setshowPopUp(false);
        setSelectedProduct(null);
    }
    const openPopUp = (product) => {
        setSelectedProduct(product);
        setshowPopUp(true);
    }

    const token = localStorage.getItem("token");

    // Charger uniquement si pas de cache récent (< 5 min)
    useEffect(() => {
        const now = Date.now();
        const cacheValid = lastFetched && now - lastFetched < 5 * 60 * 1000; // 5 minutes
        if (!cacheValid && token) {
            dispatch(fetchRecentViews(token));
        }
    }, [dispatch, token, lastFetched]);

    const handleAddToCart = useCallback(
        (product) => {
            addProductToCart(product);
        },
        [addProductToCart]
    );

    const renderedProducts = useMemo(() => {
        return recentView.map((view) => (
            <div key={view.id} className="col-6 col-md-4 col-lg-3 mt-2">
                <div className="border border-1 shadow-sm d-flex flex-column p-2" style={{ height: "250px" }}>
                    <div className="col bg-light d-flex justify-content-center align-items-center" style={{ height: "130px" }}>
                        <img
                            src={view.product?.img}
                            alt={view.product?.name}
                            className="img-fluid"
                            style={{ maxHeight: "120px", objectFit: "contain" }}
                            onClick={() => openPopUp(view.product)}
                        />
                    </div>
                    <h3 className="petit_titre fw-bold mt-2 text-truncate">{view.product?.name}</h3>
                    <h4 className="petit_titre text-muted text-truncate">{view.product?.category}</h4>
                    <h5 className="petit_titre">
                        {view.product?.price} FCFA
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            onClick={() => handleAddToCart(view.product)}
                            style={{ cursor: "pointer", color: "#fa7f1b" }}
                            className="ms-2"
                        />
                    </h5>
                </div>
            </div>
        ));
    }, [recentView, handleAddToCart]);

    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Vus récemment</h2>
                </div>

                <div className="container-fluid">
                    {loading ? (
                        <Lottie animationData={Animation} loop={true} style={{ width: 50, height: 50, margin: "auto" }} />
                    ) : recentView.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center my-3">
                            <img src={eye} alt="" style={{ height: "50px", width: "auto" }} />
                            <p className="p-1 m-0 texte_brut">Vous n'avez vu aucun produit pour l'instant</p>
                            <p className="p-0 m-0 texte_brut text-center">
                                Visitez notre large gamme de produits sur la page d'accueil, vous adorerez vraiment... 😊
                            </p>
                        </div>
                    ) : (
                        <div className="row">{renderedProducts}</div>
                    )}
                </div>
            </div>
            {showPopUp && (
                <VusProduct closePopUp={closePopUp} product={selectedProduct} />
            )}
        </div>
    );
};

export default ProdutctsVus;
