import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";
import React, { useEffect, useState, useContext } from "react";
import favoris from "../assets/Images/icone/favourite.png";
import { getFavorites } from "../Authentification/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { PanierContext } from "../../Store/Panier_context";

const Favoris = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addProductToCart } = useContext(PanierContext);


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await getFavorites(token);
                setFavorites(data);
            } catch (error) {
                console.error("Erreur lors du chargement des favoris :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);


    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
                    <h2 className="taux_moyen">Favoris</h2>
                </div>

                <div className="container-fluid">
                    {loading ? (
                        <Lottie
                            animationData={Animation}
                            loop={true}
                            style={{ width: 80, height: 80, margin: "auto" }}
                        />
                    ) : favorites.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center my-3">
                            <img src={favoris} alt="" style={{ height: "50px", width: "auto" }} />
                            <p className="p-1 m-0 texte_brut">
                                Vous n'avez aucun favoris pour l'instant
                            </p>
                            <p className="p-0 m-0 texte_brut text-center">
                                Vous avez trouvé quelque chose que vous aimez ? Tapez sur l'icône en forme de cœur à côté de l'article pour l'ajouter à votre liste d'envies!
                            </p>
                        </div>
                    ) : (
                        <div className="row">
                            {favorites.map((favori) => (
                                <div key={favori.id} className="col-4 col-lg-3 mt-2">
                                    <div className="border border-1 shadow-sm d-flex flex-column p-2" style={{ height: "250px" }}>
                                        <div className="col bg-light">
                                            <img
                                                src={favori.product?.img}
                                                alt={favori.product?.name}
                                                className="img-fluid"
                                            />
                                        </div>
                                        <h3 className="petit_titre fw-bold">
                                            {favori.product?.name}
                                        </h3>
                                        <h4 className="petit_titre">

                                            {favori.product?.category}
                                        </h4>
                                        <h5 className="petit_titre">
                                            {favori.product?.price} FCFA
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                onClick={() => addProductToCart(favori.product)}
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
    );
};

export default Favoris;
