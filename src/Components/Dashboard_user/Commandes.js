import React, { useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import "../../Styles/UserDashboard/Commandes.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommandes } from "../../Store/CommandesSlice";
import Animation from "../animation/loading_gray.json";

const Lottie = lazy(() => import("lottie-react"));


const Commandes = () => {
    const dispatch = useDispatch();
    const { orders, loading, totalPages, currentPage, cache } = useSelector((state) => state.commandes);

    const [activeTab, setActiveTab] = React.useState("livraison");

    const statusColors = useMemo(
        () => ({
            livrée: "green",
            en_cours: "orange",
            "en attente": "gray",
            annulée: "red",
            retournée: "purple",
        }),
        []
    );

    // 🔹 Charger uniquement si la page n’est pas déjà en cache Redux
    useEffect(() => {
        if (!cache[currentPage]) dispatch(fetchCommandes(currentPage));
    }, [dispatch, cache, currentPage]);

    // 🔹 Gestion pagination
    const handlePageChange = useCallback(
        (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
                dispatch(fetchCommandes(newPage));
            }
        },
        [dispatch, totalPages]
    );

    // 🔹 Filtrage optimisé
    const commandesFiltrees = useMemo(() => {
        return orders.filter((cmd) =>
            activeTab === "livraison"
                ? ["livrée", "en_cours", "en attente", "pending"].includes(cmd.status)
                : ["annulée", "retournée", "cancelled"].includes(cmd.status)
        );
    }, [orders, activeTab]);

    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Commandes</h2>
                </div>

                {/* Onglets */}
                <div className="row">
                    <div className="col-6 col-md-3 py-2">
                        <button
                            className={`nav-link text-truncate ${activeTab === "livraison" ? "active-tab" : "text-dark"}`}
                            onClick={() => {
                                setActiveTab("livraison");
                                handlePageChange(1);
                            }}
                        >
                            En cours / Livrées
                        </button>
                    </div>
                    <div className="col-6 col-md-3 py-2">
                        <button
                            className={`nav-link text-truncate ${activeTab === "annule" ? "active-tab" : "text-dark"}`}
                            onClick={() => {
                                setActiveTab("annule");
                                handlePageChange(1);
                            }}
                        >
                            Annulées / Retournées
                        </button>
                    </div>
                </div>

                {/* Contenu dynamique */}
                <div className="mt-3">
                    {loading ? (
                        <Suspense fallback={<div>Chargement...</div>}>
                            <Lottie
                                animationData={Animation}
                                loop
                                style={{ width: 50, height: 50, margin: "2rem auto", display: "block" }}
                            />
                        </Suspense>
                    ) : commandesFiltrees.length === 0 ? (
                        <h4 className="petit_titre text-center">
                            Vous n’avez aucune commande{" "}
                            {activeTab === "livraison" ? "en cours ou livrée" : "annulée ou retournée"}.
                        </h4>
                    ) : (
                        <>
                            {commandesFiltrees.map((order) => (
                                <div key={order.id} className="row mb-3">
                                    <div className="accordion col-10 pb-3" id={`faqAccordion${order.id}`}>
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
                                                        <div className="col-3">Nom</div>
                                                        <div className="col-2">Catégorie</div>
                                                        <div className="col-1">Qté</div>
                                                        <div className="col-3">Prix unitaire</div>
                                                    </div>

                                                    {order.produits?.map((produit, index) => (
                                                        <div key={`${order.id}-${index}`} className="row mb-2">
                                                            <div className="col-3">
                                                                <img
                                                                    src={produit.img}
                                                                    alt={produit.name}
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <div className="col-3 d-flex align-items-center texte_brut">
                                                                {produit.name}
                                                            </div>
                                                            <div className="col-2 d-flex align-items-center texte_brut">
                                                                {produit.category}
                                                            </div>
                                                            <div className="col-1 d-flex align-items-center texte_brut">
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
                                    <div className="col">
                                        <h3
                                            className="texte_brut border border-1 rounded-5 text-white text-center"
                                            style={{ backgroundColor: statusColors[order.status] || "gray" }}
                                        >
                                            {order.status}
                                        </h3>
                                        <button className="bg-primary border-0 text-white w-100 rounded-5 text-center mt-2">
                                            Avis
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center mt-3">
                                    <button
                                        className="btn btn-sm btn-outline-primary mx-1"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Précédent
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            className={`btn btn-sm mx-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                                                }`}
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="btn btn-sm btn-outline-primary mx-1"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Suivant
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Commandes;
