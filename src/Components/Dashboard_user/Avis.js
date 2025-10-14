import React, { useEffect, useState } from "react";
import email from "../assets/Images/icone/email.png";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";
import { Rating } from "@mui/material";

const Avis = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://127.0.0.1:8000/api/reviews?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setReviews(data.data);
                setTotalPages(data.last_page);
            } catch (error) {
                console.error("Erreur lors du chargement des avis :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [page]);


    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Avis</h2>
                </div>

                <div className="mt-2">
                    {loading ? (
                        <Lottie
                            animationData={Animation}
                            loop={true}
                            style={{ width: 80, height: 80, margin: "auto" }}
                        />
                    ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div className="border border-1 rounded-3 my-2 p-2" key={review.id}>
                                <h5 className="taux_moyen">Commande #{review.order.id}</h5>
                                <h6 className="texte_brut">{review.content}</h6>
                                <p className="taux_moyen">Note : <Rating name="size-medium" defaultValue={review.rating} /></p>
                                <p className="texte_brut">{new Date(review.created_at).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center my-3">
                            <img src={email} alt="" style={{ height: "50px", width: "auto" }} />
                            <p className="p-1 m-0 texte_brut">Aucune évaluation de commande actuelle</p>
                            <p className="p-0 m-0 texte_brut text-center">
                                Après la livraison de vos produits, vous pourrez les évaluer. Vos commentaires seront publiés sur la
                                page produit pour aider tous les utilisateurs à bénéficier de la meilleure expérience d'achat.
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
                            onClick={() => setPage(page - 1)}
                        >
                            ← Précédent
                        </button>
                        <button
                            className="btn btn-sm btn-primary"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
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
