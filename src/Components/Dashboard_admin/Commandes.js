import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Entete from "./dataset/Entete";
import SellPeriod from "./dataset/SellPeriod";
import Dropdown from "./dataset/Dropdown";
import { ThemeContext } from "./ThemeContext";
import orders_completed from "../assets/Images/orders_completed.webp";
import orders_confirmed from "../assets/Images/orders_confirmed.webp";
import orders_deleted from "../assets/Images/orders_deleted.webp";
import orders_found from "../assets/Images/orders_found.webp";
import API from "../Authentification/apiAdmin";
import ValidationCommande from "./ValidationCommande";

const Commandes = () => {
    const { theme } = useContext(ThemeContext);
    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("");

    const [showPopUp, setShowPopUp] = useState(false);
    const closePopUp = () => setShowPopUp(false);
    const openPopUp = (order) => {
        setSelectedOrder(order);
        setShowPopUp(true);
    };


    useEffect(() => {
        API.get("/admin/orders")
            .then((res) => {
                setStats(res.data.stats);
                setOrders(res.data.orders);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container-fluid">
            <Entete title="Commandes" />

            {/* Premier content */}
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-4">
                        <SellPeriod />
                    </div>

                    <div className="offset-3 col">
                        <h5 className="texte_brut">
                            Commandes vues : {orders.length}/100
                        </h5>
                        <div className="row">
                            <div className="col-5 me-2">
                                <Dropdown type="Catégories de produit" />
                            </div>
                            <div className="col">
                                <Dropdown type="Trier par : Meilleurs ventes" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deuxième content */}
            <div className="container-fluid">
                <div className="row mt-3">
                    <div
                        className="col-4 me-2 shadow-sm border border-1 p-2"
                        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
                    >
                        <h5 className="taux_moyen">Taux moyen (en %)</h5>
                        <p className="p-0 mb-1 m-0 petit_titre">Vues des produits</p>
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${stats.product_views_rate || 0}%` }}
                            >
                                {stats.product_views_rate || 0}%
                            </div>
                        </div>
                        <p className="p-0 m-0 mb-1 petit_titre mt-2">
                            Taux d'abandon du panier
                        </p>
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${stats.cart_abandon_rate || 0}%` }}
                            >
                                {stats.cart_abandon_rate || 0}%
                            </div>
                        </div>
                    </div>

                    {/* Cartes statistiques */}
                    {[
                        { img: orders_completed, label: "Commandes effectuées", value: stats.completed },
                        { img: orders_confirmed, label: "Commandes confirmées", value: stats.confirmed },
                        { img: orders_deleted, label: "Commandes supprimées", value: stats.deleted },
                        { img: orders_found, label: "Total commandes", value: stats.found },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="shadow-sm border border-1 col me-2"
                            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
                        >
                            <div className="row mt-2">
                                <div className="col">
                                    <img src={item.img} alt=" " className="w-auto" style={{ height: "50px" }} />
                                </div>
                                <div className="col-3">
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h5 className="petit_titre">{item.label}</h5>
                                <h5 className="taux_moyen">{item.value || 0}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Troisième content */}
            <div className="mt-3">
                <div
                    className="shadow-sm border border-1 col"
                    style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
                >
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#id</th>
                                <th>Utilisateur</th>
                                <th className="col-5">Produits commandés</th>
                                <th>Total</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <th>{order.id}</th>
                                    <td>{order.user?.name}</td>
                                    <td>
                                        {(() => {
                                            try {
                                                const produits = Array.isArray(order.produits)
                                                    ? order.produits
                                                    : JSON.parse(order.produits || "[]");

                                                return produits
                                                    .map(p => `${p.name ?? p.nom ?? "Produit inconnu"} (x${p.quantite ?? 1})`)
                                                    .join(", ");
                                            } catch (e) {
                                                console.error("Erreur parsing produits:", e);
                                                return "Aucun produit";
                                            }
                                        })()}

                                    </td>
                                    <td>{order.total} FCFA</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${order.status === "livree" || order.status === "livree"
                                                ? "btn-secondary"
                                                : "btn-outline-primary"
                                                }`}
                                            onClick={() => openPopUp(order)}
                                            disabled={order.status === "livree" || order.status === "livree"}
                                        >
                                            Voir
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showPopUp && <ValidationCommande closePopUp={closePopUp} order={selectedOrder} />}
        </div>
    );
};

export default Commandes;
