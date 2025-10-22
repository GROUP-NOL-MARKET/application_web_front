import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import API from "./Authentification/api";

const FedaPayButton = ({ amount, description, email, firstName, products }) => {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const response = await API.post("/payment/create", {
                amount,
                description,
                email,
                firstName: firstName,
                products
            });

            const { url } = response.data;

            // Ouvre le widget FedaPay
            if (window.FedaPay) {
                window.FedaPay.init({
                    public_key: "pk_sandbox_JauNhDDGOx2yjG0pH5VZtLQL",
                    transaction_url: url,
                }).open();
            } else {
                alert("FedaPay SDK non chargé !");
            }

        } catch (error) {
            console.error("Erreur paiement :", error.message);
            alert("Erreur lors de la création du paiement");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handlePay} className="btn btn-success w-100 rounded-5" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : `Payer ${amount} FCFA`}
        </button>
    );
};

export default FedaPayButton;
