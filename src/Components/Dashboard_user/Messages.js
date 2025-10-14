import React, { useEffect, useState } from "react";
import corbeille from "../assets/Images/icone/trash.png";
import filtre from "../assets/Images/icone/filter.png";
import MessageContent from "./MessageContent";
import coupon from "../assets/Images/icone/chat.png"; // Image quand il n’y a aucun message
import { getMessages, deleteMessage } from "../Authentification/api";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [dropdownActive, setDropdownActive] = useState("Récent");
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    // NOUVEAU: État pour les IDs des messages sélectionnés
    const [selectedMessageIds, setSelectedMessageIds] = useState([]);

    const token = localStorage.getItem("token");

    // Charger les messages
    const fetchMessages = async (page = 1, sort = "récent") => {
        try {
            setLoading(true);
            // On réinitialise la sélection à chaque nouveau chargement
            setSelectedMessageIds([]);
            const data = await getMessages(token, page, sort);
            setMessages(data.data);
            setCurrentPage(data.meta.current_page);
            setLastPage(data.meta.last_page);
        } catch (error) {
            console.error("Erreur lors du chargement des messages :", error);
        } finally {
            setLoading(false);
        }
    };


    // Fonction de suppression unique (utilisée par les boutons "Supprimer" individuels)
    const handleDeleteOne = async (id) => {
        try {
            await deleteMessage(id, token);
            setMessages(messages.filter((msg) => msg.id !== id));
            // On retire l'ID des sélectionnés au cas où il y était
            setSelectedMessageIds(prev => prev.filter(messageId => messageId !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du message :", error);
        }
    };

    // NOUVEAU: Fonction pour gérer la suppression multiple
    const handleDeleteSelected = async () => {
        if (selectedMessageIds.length === 0) {
            alert("Veuillez sélectionner au moins un message à supprimer.");
            return;
        }

        try {
            // Pour chaque ID sélectionné, on appelle l'API de suppression
            await Promise.all(selectedMessageIds.map(id => deleteMessage(id, token)));

            // Met à jour la liste des messages en filtrant ceux qui ont été supprimés
            setMessages(messages.filter((msg) => !selectedMessageIds.includes(msg.id)));

            // Réinitialise la sélection
            setSelectedMessageIds([]);

        } catch (error) {
            console.error("Erreur lors de la suppression des messages sélectionnés :", error);
            // On peut aussi choisir de recharger la liste complète en cas d'erreur
            // fetchMessages(currentPage, dropdownActive.toLowerCase());
        }
    };

    // NOUVEAU: Fonction pour gérer le changement de la case à cocher
    const handleCheckboxChange = (id) => {
        setSelectedMessageIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                // Si l'ID est déjà là, on le retire (décocher)
                return prevSelectedIds.filter((messageId) => messageId !== id);
            } else {
                // Sinon, on l'ajoute (cocher)
                return [...prevSelectedIds, id];
            }
        });
    };

    // NOUVEAU: Fonction pour sélectionner/désélectionner tous les messages
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Sélectionne tous les IDs des messages actuels
            setSelectedMessageIds(messages.map(msg => msg.id));
        } else {
            // Désélectionne tout
            setSelectedMessageIds([]);
        }
    };

    useEffect(() => {
        fetchMessages(currentPage, dropdownActive.toLowerCase());
    }, [currentPage, dropdownActive]);


    const openPopUp = (message) => {
        setSelectedMessage(message);
        setShowPopUp(true);
    };

    const closePopUp = () => {
        setShowPopUp(false);
        setSelectedMessage(null);
    };

    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                {/* En-tête */}
                <div className="border-bottom border-2 border-black w-100 py-2">
                    <div className="row">
                        <div className="col-2 d-flex align-items-center">
                            <h2 className="taux_moyen m-0">Messages</h2>
                        </div>
                        <div className="offset-5 col d-flex align-items-center justify-content-end">
                            {/* NOUVEAU: Ajout de la case à cocher pour 'Tout sélectionner' */}
                            <div className="form-check me-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="selectAllCheckbox"
                                    checked={messages.length > 0 && selectedMessageIds.length === messages.length}
                                    onChange={handleSelectAll}
                                />
                                <label className="form-check-label texte_brut" htmlFor="selectAllCheckbox">
                                    Tout sélectionner
                                </label>
                            </div>

                            {/* MISE À JOUR: Lier l'image corbeille à la nouvelle fonction */}
                            <img
                                src={corbeille}
                                alt="delete"
                                style={{ width: 20, cursor: selectedMessageIds.length > 0 ? "pointer" : "not-allowed", opacity: selectedMessageIds.length > 0 ? 1 : 0.5 }}
                                onClick={handleDeleteSelected}
                                className="me-2"
                            />
                            <img src={filtre} alt="filter" style={{ width: 20 }} className="me-2" />
                            <span className="dropdown border border-2 p-1" style={{ cursor: "pointer" }}>
                                <span
                                    className="dropdown-toggle texte_brut"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Trier par : {dropdownActive}
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li className="dropdown-item" onClick={() => setDropdownActive("Récent")}>
                                        Récent
                                    </li>
                                    <li className="dropdown-item" onClick={() => setDropdownActive("Anciens")}>
                                        Anciens
                                    </li>
                                </ul>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contenu */}
                {loading ? (
                    <Lottie animationData={Animation} loop={true} style={{ width: 80, height: 80, margin: "auto" }} />
                ) : messages.length === 0 ? (
                    <div className="d-flex flex-column align-items-center justify-content-center my-3">
                        <img src={coupon} alt="" style={{ height: "50px", width: "auto" }} />
                        <p className="p-1 m-0 texte_brut">Votre boîte de réception est vide</p>
                        <p className="p-0 m-0 texte_brut text-center">
                            Tous les messages que nous vous enverrons s'afficheront ici.
                        </p>
                    </div>
                ) : (
                    <div className="container-fluid mt-2">
                        {messages.map((message) => (
                            <div key={message.id} className="border-bottom py-2">
                                <div className="row align-items-center">
                                    <div className="col-1 d-flex justify-content-center">
                                        {/* MISE À JOUR: Lier la checkbox à l'état selectedMessageIds */}
                                        <input
                                            type="checkbox"
                                            checked={selectedMessageIds.includes(message.id)}
                                            onChange={() => handleCheckboxChange(message.id)}
                                        />
                                    </div>
                                    {/* Encapsuler les détails du message dans un div cliquable pour le pop-up */}
                                    <div
                                        className="col-11 row align-items-center"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => openPopUp(message)}
                                    >
                                        <h3 className="petit_titre fw-bold col-3">{message.sender || "Group Nol Market"}</h3>
                                        <h4 className="text-truncate col-4 petit_titre fw-normal">{message.title}</h4>
                                        <p className="texte_brut col-2 me-1">{new Date(message.created_at).toLocaleDateString()}</p>
                                        <p className="texte_brut col">{new Date(message.created_at).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeleteOne(message.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && messages.length > 0 && (
                    <div className="d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-sm btn-outline-dark me-2"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Précédent
                        </button>
                        <span className="texte_brut d-flex align-items-center">
                            Page {currentPage} / {lastPage}
                        </span>
                        <button
                            className="btn btn-sm btn-outline-dark ms-2"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                            disabled={currentPage === lastPage}
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>

            {/* Pop-up Message */}
            {showPopUp && <MessageContent closePopUp={closePopUp} message={selectedMessage} />}
        </div>
    );
};

export default Messages;