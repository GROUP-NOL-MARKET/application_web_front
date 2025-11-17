import React from "react";
import entreprise from "../assets/Images/Logo_entreprise-removebg-preview.webp";

const MessageContent = ({ closePopUp, message }) => {
    if (!message) return null;

    return (
        <div className="popup-overlay">
            <div className="popup rounded-3 p-3">
                <button
                    onClick={closePopUp}
                    className="bouton-close text-xxl"
                    style={{ color: "red", fontSize: "20px", border: "none", background: "none" }}
                >
                    ✕
                </button>
                <div className="d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                        <img src={entreprise} alt="" style={{ width: 70 }} />
                    </div>
                    <hr />
                    <h2 className="petit_titre fw-bold">{message.title}</h2>
                    <p className="texte_brut mt-2">{message.content}</p>
                    <p className="texte_brut text-end">
                        <i>Envoyé par : {message.sender || "Group Nol Market"}</i>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageContent;
