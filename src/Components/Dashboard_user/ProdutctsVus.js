import React, { useEffect, useState, useContext } from 'react'
import eye from "../assets/Images/icone/hidden.png";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";
import { PanierContext } from '../../Store/Panier_context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProdutctsVus = () => {

    const [recentView, setRecentView] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addProductToCart } = useContext(PanierContext);

    useEffect(() => {
        const fetchRecentView = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/recent-views", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                setRecentView(data.data);

            } catch (error) {
                console.error("Erreur lors du chargement des produits vus :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentView();
    }, []);

    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Vus récemment</h2>
                </div>

                <div className="container-fluid">
                    {loading ? (
                        <Lottie
                            animationData={Animation}
                            loop={true}
                            style={{ width: 80, height: 80, margin: "auto" }}
                        />
                    ) : recentView.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center my-3">
                            <img src={eye} alt="" style={{ height: "50px", width: "auto" }} />
                            <p className="p-1 m-0 texte_brut">
                                Vous n'avez vu aucun produit pour l'instant
                            </p>
                            <p className="p-0 m-0 texte_brut text-center">
                                Visitez notre large gamme de produits sur la page d'accueil, vous adorerez vraiment...😊
                            </p>
                        </div>
                    ) : (
                        <div className="row">
                            {recentView.map((view) => (
                                <div key={view.id} className="col-4 col-lg-3 mt-2">
                                    <div className="border border-1 shadow-sm d-flex flex-column p-2" style={{ height: "250px" }}>
                                        <div className="col bg-light">
                                            <img
                                                src={view.product?.img}
                                                alt={view.product?.name}
                                                className="img-fluid"
                                            />
                                        </div>
                                        <h3 className="petit_titre fw-bold">
                                            {view.product?.name}
                                        </h3>
                                        <h4 className="petit_titre">
                                            {view.product?.category}
                                        </h4>
                                        <h5 className="petit_titre">
                                            {view.product?.price} FCFA
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                onClick={() => addProductToCart(view.product)}
                                                style={{ cursor: "pointer", color: "#fa7f1b" }}
                                                className="ms-2"
                                            />
                                        </h5>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProdutctsVus