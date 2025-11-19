import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import "../../Styles/UserDashboard/Commandes.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommandes } from "../../Store/CommandesSlice";
import Animation from "../animation/loading_gray.json";
import Rating from "./Rating";

const Lottie = lazy(() => import("lottie-react"));

const Commandes = () => {
    const [showPopUp, setshowPopUp] = useState(false);
    const [commandeId, setCommandeId] = useState("");

    const dispatch = useDispatch();
    const { orders, loading, totalPages, currentPage, cache } = useSelector(
        (state) => state.commandes
    );

    const [activeTab, setActiveTab] = useState("livraison");

    const statusColors = useMemo(
        () => ({
            livrée: "green",
            en_cours: "orange",
            en_attente: "gray",
            annulée: "red",
            retournée: "purple",
        }),
        []
    );

    const closePopUp = () => {
        setCommandeId(null);
        setshowPopUp(false);
    };
    const openPopUp = (id) => {
        setCommandeId(id);
        setshowPopUp(true);
    };

    // Charger les commandes avec cache
    useEffect(() => {
        if (!cache[currentPage]) {
            dispatch(fetchCommandes(currentPage));
        }
    }, [dispatch, cache, currentPage]);

    // Gestion pagination
    const handlePageChange = useCallback(
        (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
                dispatch(fetchCommandes(newPage));
            }
        },
        [dispatch, totalPages]
    );

    // Filtrage selon l'onglet actif
    const commandesFiltrees = useMemo(() => {
        return orders.filter((cmd) =>
            activeTab === "livraison"
                ? ["livrée", "en_cours", "en_attente", "pending"].includes(cmd.status)
                : ["annulée", "retournée", "cancelled"].includes(cmd.status)
        );
    }, [orders, activeTab]);

    return (
        <div className="commandes-container">
            <div className="shadow-sm border border-1 p-2 mb-5">
                {/* Titre */}
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Commandes</h2>
                </div>

                {/* Onglets */}
                <div className="row mt-3 mb-2">
                    <div className="col-6 col-md-3">
                        <button
                            className={`nav-link text-truncate ${activeTab === "livraison" ? "active-tab" : "text-dark"
                                }`}
                            onClick={() => {
                                setActiveTab("livraison");
                                handlePageChange(1);
                            }}
                        >
                            En cours / Livrées
                        </button>
                    </div>
                    <div className="col-6 col-md-3">
                        <button
                            className={`nav-link text-truncate ${activeTab === "annule" ? "active-tab" : "text-dark"
                                }`}
                            onClick={() => {
                                setActiveTab("annule");
                                handlePageChange(1);
                            }}
                        >
                            Annulées / Retournées
                        </button>
                    </div>
                </div>

                {/* Liste des commandes */}
                <div className="mt-3">
                    {loading ? (
                        <Suspense fallback={<div>Chargement...</div>}>
                            <Lottie
                                animationData={Animation}
                                loop
                                style={{
                                    width: 50,
                                    height: 50,
                                    margin: "2rem auto",
                                    display: "block",
                                }}
                            />
                        </Suspense>
                    ) : commandesFiltrees.length === 0 ? (
                        <h4 className="petit_titre text-center">
                            Vous n’avez aucune commande{" "}
                            {activeTab === "livraison"
                                ? "en cours ou livrée"
                                : "annulée ou retournée"}.
                        </h4>
                    ) : (
                        <>
                            {commandesFiltrees.map((order) => (
                                <div key={order.id} className="row mb-3">
                                    <div
                                        className="accordion col-lg-10 col-12 pb-3"
                                        id={`faqAccordion${order.id}`}
                                    >
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id={`heading${order.id}`}>
                                                <button
                                                    className="accordion-button btn_aide"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${order.id}`}
                                                    aria-expanded="false"
                                                    aria-controls={`collapse${order.id}`}
                                                >
                                                    Commande #{order.id} — Total: {order.total} FCFA
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${order.id}`}
                                                className="accordion-collapse collapse show"
                                                aria-labelledby={`heading${order.id}`}
                                                data-bs-parent={`#faqAccordion${order.id}`}
                                            >
                                                <div className="accordion-body reponse">
                                                    <div className="row fw-bold border-bottom pb-2 mb-2">
                                                        <div className="col-3">Image</div>
                                                        <div className="col-4 col-md-3">Nom</div>
                                                        <div className="col-2 d-none d-md-block">Catégorie</div>
                                                        <div className="col-2 col-md-1">Qté</div>
                                                        <div className="col-3">Prix unitaire</div>
                                                    </div>

                                                    {order.produits?.map((produit, index) => (
                                                        <div
                                                            key={`${order.id}-${index}`}
                                                            className="row mb-2"
                                                        >
                                                            <div className="col-3">
                                                                <img
                                                                    src={produit.img}
                                                                    alt={produit.name}
                                                                    className="img-fluid rounded-3 shadow-sm"
                                                                />
                                                            </div>
                                                            <div className="col-4 col-md-3 d-flex align-items-center texte_brut">
                                                                {produit.name}
                                                            </div>
                                                            <div className="col-2 d-none d-md-flex align-items-center texte_brut">
                                                                {produit.category}
                                                            </div>
                                                            <div className="col-2 col-md-1 d-flex align-items-center texte_brut">
                                                                {produit.quantite}
                                                            </div>
                                                            <div className="col-3 d-flex align-items-center texte_brut">
                                                                {produit.price} FCFA
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Statut et bouton Avis */}
                                    <div className="col-lg">
                                        <h3
                                            className="texte_brut border border-1 rounded-5 text-white text-center py-1"
                                            style={{
                                                backgroundColor: statusColors[order.status] || "gray",
                                            }}
                                        >
                                            {order.status}
                                        </h3>
                                        <button
                                            className="bg-primary border-0 text-white w-100 rounded-5 text-center mt-2 py-1"
                                            onClick={() => openPopUp(order.id)}
                                        >
                                            Avis
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/*  Pagination propre */}
                            {totalPages > 1 && (
                                <div className="pagination-container">
                                    <nav>
                                        <ul className="pagination justify-content-center mb-0">
                                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                >
                                                    Précédent
                                                </button>
                                            </li>

                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <li
                                                    key={i}
                                                    className={`page-item ${currentPage === i + 1 ? "active" : ""
                                                        }`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(i + 1)}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                >
                                                    Suivant
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {showPopUp && <Rating closePopUp={closePopUp} commande={commandeId} />}
        </div>
    );
};

export default Commandes;
