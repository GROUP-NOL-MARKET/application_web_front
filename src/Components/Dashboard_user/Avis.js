import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../Store/ReviewsSlice";
import email from "../assets/Images/icone/email.png";
import { Rating } from "@mui/material";
import Animation from "../animation/loading_gray.json";
import { lazy, Suspense } from "react";

const Lottie = lazy(() => import("lottie-react"));


const Avis = () => {
    const dispatch = useDispatch();
    const { reviews, loading, page, totalPages, cache } = useSelector(
        (state) => state.reviews
    );

    // Charger uniquement si non déjà dans le cache Redux
    useEffect(() => {
        if (!cache[page]) dispatch(fetchReviews(page));
    }, [page, dispatch, cache]);

    // Navigation entre pages, évite re-render inutile
    const handlePageChange = useCallback(
        (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
                dispatch(fetchReviews(newPage));
            }
        },
        [dispatch, totalPages]
    );

    // useMemo pour formater les avis
    const formattedReviews = useMemo(() => {
        return reviews.map((review) => ({
            ...review,
            dateFormatted: new Date(review.created_at).toLocaleString(),
        }));
    }, [reviews]);

    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Avis</h2>
                </div>

                <div className="mt-2">
                    {loading ? (
                        <Suspense fallback={<div>Chargement...</div>}>
                            <Lottie
                                animationData={Animation}
                                loop
                                style={{ width: 50, height: 50, margin: "auto" }}
                            />
                        </Suspense>
                    ) : formattedReviews.length > 0 ? (
                        formattedReviews.map((review) => (
                            <div
                                className="border border-1 rounded-3 my-2 p-2"
                                key={review.id}
                            >
                                <h5 className="taux_moyen">
                                    Commande #{review.order?.id ?? "?"}
                                </h5>
                                <h6 className="texte_brut">{review.content}</h6>
                                <p className="taux_moyen">
                                    Note :{" "}
                                    <Rating name="size-medium" defaultValue={review.rating} readOnly />
                                </p>
                                <p className="texte_brut">{review.dateFormatted}</p>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center my-3">
                            <img src={email} alt="vide" style={{ height: "50px" }} />
                            <p className="p-1 m-0 texte_brut">
                                Aucune évaluation de commande actuelle
                            </p>
                            <p className="p-0 m-0 texte_brut text-center">
                                Après la livraison de vos produits, vous pourrez les évaluer.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-sm btn-secondary me-2"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >
                            ← Précédent
                        </button>
                        <button
                            className="btn btn-sm btn-primary"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Suivant →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Avis;
