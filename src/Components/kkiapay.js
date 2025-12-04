import React, { useEffect } from "react";
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from "kkiapay";
import kiapay from "./assets/Images/kkiapay.png";

const KkiaPay = ({ amount, email, phone, name, onSuccess, disabled }) => {
    useEffect(() => {
        const handleSuccess = (data) => {
            onSuccess(data);
        };
        addKkiapayListener("success", handleSuccess);
        return () => removeKkiapayListener("success", handleSuccess);
    }, [onSuccess]);

    const handleClick = () => {
        openKkiapayWidget({
            amount,
            api_key: "461a5930ce9b11f09f4a631e834d10ba",
            sandbox: true,          // ou false en prod
            phone,
            email,
            name,
        });
    };

    return (
        <div onClick={disabled ? null : handleClick} >
            <img src={kiapay} alt="icone de paiement" style={{ width: 70 }} />
        </div>
    );
};

export default KkiaPay;
