
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import API from "./Authentification/api";

const FedaPayButton = ({ amount, description, email, firstName }) => {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const { data } = await API.post("/payment/create", {
                amount,
                description,
                email,
                firstName,
            });

            const { payment_url } = data;

            if (!payment_url) {
                alert("Erreur : lien de paiement introuvable.");
                return;
            }

            // Vérifie que le SDK FedaPay est chargé
            if (window.FedaPay) {
                window.FedaPay.init({
                    public_key: "pk_sandbox_JauNhDDGOx2yjG0pH5VZtLQL",
                    transaction_url: payment_url,
                }).open();
            } else {
                alert("Le SDK FedaPay n'est pas chargé !");
            }
        } catch (error) {
            console.error("Erreur paiement :", error.message);
            alert("Une erreur est survenue lors du paiement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePay}
            className="btn btn-success w-100 rounded-5"
            disabled={loading}
        >
            {loading ? <Spinner animation="border" size="sm" /> : `Payer ${amount} FCFA`}
        </button>
    );
};

export default FedaPayButton;
