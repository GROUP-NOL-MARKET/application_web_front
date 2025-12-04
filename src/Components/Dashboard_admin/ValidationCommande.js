import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import APIAdmin from '../Authentification/apiAdmin';
import { toast } from "react-toastify";

const ValidationCommande = ({ closePopUp, order, refresh }) => {
    const [loading, setLoading] = useState(false);
    const [annuleLoading, setAnnuleLoading] = useState(false);

    const updateStatus = async (newStatus) => {
        setLoading(true);
        try {
            await APIAdmin.post(`/admin/commandes/${order.id}/status`, {
                status: newStatus,
            });

            toast.success(`Commande ${newStatus === "livree" ? "livrée" : "annulée"} avec succès !`);

            closePopUp();             // On ferme le popup
            if (refresh) refresh();   // On recharge la liste si on t’a passé refresh()
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du statut.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const updateAnnuleStatus = async (newStatus) => {
        setAnnuleLoading(true);
        try {
            await APIAdmin.post(`/admin/commandes/${order.id}/status`, {
                status: newStatus,
            });

            toast.success(`Commande annulée avec succès !`);

            closePopUp();             // On ferme le popup
            if (refresh) refresh();   // On recharge la liste si on t’a passé refresh()
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du statut.");
            console.error(error);
        } finally {
            setAnnuleLoading(false);
        }
    };

    const produits = (() => {
        try {
            const pr = Array.isArray(order.produits)
                ? order.produits
                : JSON.parse(order.produits || "[]");

            return (
                <ol>
                    {pr.map((p, index) => (
                        <li key={index}>
                            {p.name ?? p.nom ?? "Produit inconnu"} (x{p.quantite ?? 1})
                        </li>
                    ))}
                </ol>
            );
        } catch (e) {
            console.error("Erreur parsing produits:", e);
            return "Aucun produit";
        }
    })();

    return (
        <div className="popup-overlay">
            <div className="popup shadow-sm p-3 rounded-3">
                <button
                    onClick={closePopUp}
                    className="bouton-close text-xxl"
                    style={{ color: "red" }}
                >
                    ✕
                </button>

                <div>
                    <h4 className='taux_moyen'>Commande # {order.id}</h4>

                    <div>
                        <h5 className="taux_moyen">Produits commandés</h5>
                        {produits}
                    </div>

                    <div className="row mt-3">
                        <Button
                            className="rounded-5 border-0 offset-2 col-4 me-2"
                            style={{ backgroundColor: "green" }}
                            onClick={() => updateStatus("livree")}
                        >
                            {loading ? <Spinner animation="border" size='sm' /> : "Valider la commande"}
                        </Button>

                        <Button
                            className="rounded-5 border-0 col-4 me-2"
                            style={{ backgroundColor: "red" }}
                            onClick={() => updateAnnuleStatus("annulee")}
                        >
                            {annuleLoading ? <Spinner animation="border" size="sm" /> : "Annuler la commande"}
                        </Button>
                        <Button
                            className="rounded-5 border-0 col"
                            style={{ backgroundColor: "red" }}
                            onClick={closePopUp}
                        >
                            {annuleLoading ? <Spinner animation="border" size="sm" /> : "Fermer"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ValidationCommande;
