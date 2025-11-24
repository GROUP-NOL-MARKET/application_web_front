import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import API from "./Authentification/api";
import { toast } from "react-toastify";

const FedapayButton = ({ amount, products, address }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!amount || amount <= 0) {
      toast.error("Montant invalide");
      return;
    }

    if (!products || products.length === 0) {
      toast.error("Panier vide");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Veuillez vous connecter");
        window.location.href = "/login";
        return;
      }

      const body = {
        amount,
        products,
        address: address || ""
      };

      const resp = await API.post("/payments/fedapay", body, { headers: { Authorization: `Bearer ${token}` } });

      if (resp.status === 201 && resp.data.checkout_url) {
        // redirect to checkout
        window.location.href = resp.data.checkout_url;
      } else {
        toast.error("Impossible de démarrer le paiement");
        console.error("Fedapay init response", resp.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'initialisation du paiement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className="w-100 rounded-5" onClick={handleClick} disabled={loading}>
      {loading ? <Spinner size="sm" animation="border" /> : "Payer avec FedaPay"}
    </Button>
  );
};

export default FedapayButton;

