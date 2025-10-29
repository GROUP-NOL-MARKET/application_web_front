import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentViews, setCurrentPage } from "../../Store/RecentViewsSlice";
import eye from "../assets/Images/icone/hidden.png";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";
import { PanierContext } from "../../Store/Panier_context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import VusProduct from "../Products/VusProduct";

const ProdutctsVus = () => {
    const dispatch = useDispatch();
    const { dataByPage, loading, pagination, lastFetched } = useSelector(
        (state) => state.recentViews
    );
    const { addProductToCart } = useContext(PanierContext);

    const token = localStorage.getItem("token");
    const currentPage = pagination.current_page;
    const currentData = dataByPage[currentPage] || [];

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const perPage = 8;

    // 🔹 Charger seulement si cache vide ou périmé (> 5 min)
    useEffect(() => {
        if (!token) return;
        const now = Date.now();
        const cacheValid = lastFetched && now - lastFetched < 5 * 60 * 1000;
        const pageCached = !!dataByPage[currentPage];

        if (!pageCached || !cacheValid) {
            dispatch(fetchRecentViews({ token, page: currentPage, perPage }));
        }
    }, [dispatch, token, currentPage, dataByPage, lastFetched]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.last_page) {
            dispatch(setCurrentPage(page));

            // Si la page n'est pas encore dans le cache → fetch
            if (!dataByPage[page]) {
                dispatch(fetchRecentViews({ token, page, perPage }));
            }
        }
    };

    const handleAddToCart = useCallback(
        (product) => addProductToCart(product),
        [addProductToCart]
    );

    const renderedProducts = useMemo(() => {
        return currentData.map((view) => (
            <div key={view.id} className="col-6 col-md-4 col-lg-3 mt-2">
                <div className="border border-1 shadow-sm d-flex flex-column p-2" style={{ height: "250px" }}>
                    <div className="col bg-light d-flex justify-content-center align-items-center" style={{ height: "130px" }}>
                        <img
                            src={view.product?.img}
                            alt={view.product?.name}
                            className="img-fluid"
                            style={{ maxHeight: "120px", objectFit: "contain", cursor: "pointer" }}
                            onClick={() => {
                                setSelectedProduct(view.product);
                                setShowPopUp(true);
                            }}
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
    }, [currentData, handleAddToCart]);

    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Vus récemment</h2>
                </div>

                <div className="container-fluid">
                    {loading && currentData.length === 0 ? (
                        <Lottie animationData={Animation} loop style={{ width: 50, height: 50, margin: "auto" }} />
                    ) : currentData.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center my-3">
                            <img src={eye} alt="" style={{ height: "50px", width: "auto" }} />
                            <p className="p-1 m-0 texte_brut">Vous n'avez vu aucun produit pour l'instant</p>
                        </div>
                    ) : (
                        <>
                            <div className="row">{renderedProducts}</div>

                            {/* Pagination */}
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <button
                                    className="btn btn-sm btn-outline-dark me-2"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Précédent
                                </button>
                                <span>
                                    Page {pagination.current_page} / {pagination.last_page}
                                </span>
                                <button
                                    className="btn btn-sm btn-outline-dark ms-2"
                                    disabled={currentPage === pagination.last_page}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Suivant
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showPopUp && (
                <VusProduct closePopUp={() => setShowPopUp(false)} product={selectedProduct} />
            )}
        </div>
    );
};

export default ProdutctsVus;
