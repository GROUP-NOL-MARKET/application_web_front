import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import API from "../Authentification/api";

const ValiderSuppression = ({ orderId, closePopUp1, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleCancelOrder = async () => {
        setLoading(true);

        try {
            await API.post(`/orders/${orderId}/cancel`);

            toast.success("Commande annulée avec succès");

            closePopUp1();
            onSuccess(); 

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Impossible d’annuler la commande"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup rounded-3 p-3">
                <button
                    onClick={closePopUp1}
                    className="bouton-close"
                    style={{ color: "red", fontSize: "20px", border: "none", background: "none" }}
                >
                    ✕
                </button>

                <h5 className="petit_titre">
                    Êtes-vous sûr de vouloir annuler cette commande ?
                </h5>

                <div className="row mt-3">
                    <Button
                        className="rounded-5 offset-4 col-3 me-2 border-0"
                        style={{ backgroundColor: "green" }}
                        onClick={handleCancelOrder}
                        disabled={loading}
                    >
                        {loading ? <Spinner size="sm" /> : "Oui"}
                    </Button>

                    <Button
                        className="rounded-5 col-3 border-0"
                        style={{ backgroundColor: "red" }}
                        onClick={closePopUp1}
                        disabled={loading}
                    >
                        Non
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ValiderSuppression;

