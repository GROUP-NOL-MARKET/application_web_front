
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentResult() {
    const navigate = useNavigate();

    useEffect(() => {
        // just show success message then redirect home
        alert("Paiement effectué avec succès !");
        navigate("/");
    }, []);

    return <p>Validation du paiement...</p>;
}
