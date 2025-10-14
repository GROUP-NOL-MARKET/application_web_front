// src/components/FedaPayButton.jsx
import React, { useEffect, useRef } from "react";
import { FedaCheckoutButton } from "fedapay-reactjs";

const FedaPayButton = ({ disabled, amount, description, onSuccess, onClose }) => {
    const PUBLIC_KEY = "pk_sandbox__fnJX6K9av-38nk7HSMWpB53";

    const fedapayInitialized = useRef(false);

    useEffect(() => {
        if (fedapayInitialized.current) return;
        fedapayInitialized.current = true;
    }, []);

    const checkoutButtonOptions = {
        public_key: PUBLIC_KEY,
        transaction: {
            amount: amount,
            description: description,
        },
        currency: { iso: "XOF" },
        button: {
            class: "btn btn-success w-100 rounded-5",
            text: `Payer ${amount} FCFA`,
            disabled,
        },
        onComplete(resp) {
            const FedaPay = window["FedaPay"];
            if (resp.reason === FedaPay.DIALOG_DISMISSED) {
                onClose && onClose();
            } else if (resp.reason === FedaPay.TRANSACTION_COMPLETED) {
                onSuccess && onSuccess(resp.transaction);
            }
        },
    };

    return <FedaCheckoutButton options={checkoutButtonOptions} />;
};

export default FedaPayButton;
