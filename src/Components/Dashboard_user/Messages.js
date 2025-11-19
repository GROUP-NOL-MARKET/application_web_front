import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import corbeille from "../assets/Images/icone/trash.png";
import filtre from "../assets/Images/icone/filter.png";
import coupon from "../assets/Images/icone/chat.png";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";
import MessageContent from "./MessageContent";
import { fetchMessages, removeMessage } from "../../Store/MessagesSlice";

const Messages = () => {
    const dispatch = useDispatch();
    const { data, cache, loading, currentPage, lastPage, sort } = useSelector(
        (state) => state.messages
    );

    const [dropdownActive, setDropdownActive] = useState(sort === "recent" ? "Récent" : "Anciens");
    const [selectedMessageIds, setSelectedMessageIds] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const token = localStorage.getItem("token");

    // Charger les messages au premier rendu ou changement de tri
    useEffect(() => {
        if (!cache[currentPage] || cache[currentPage].sort !== sort) {
            dispatch(fetchMessages({ token, page: currentPage, sort }));
        }
    }, [dispatch, token, currentPage, sort, cache]);

    // Supprimer un message
    const handleDeleteOne = useCallback(
        async (id) => {
            await dispatch(removeMessage({ id, token }));
            setSelectedMessageIds((prev) => prev.filter((messageId) => messageId !== id));
        },
        [dispatch, token]
    );

    // Supprimer plusieurs messages
    const handleDeleteSelected = useCallback(async () => {
        if (selectedMessageIds.length === 0) {
            alert("Veuillez sélectionner au moins un message à supprimer.");
            return;
        }
        await Promise.all(selectedMessageIds.map((id) => dispatch(removeMessage({ id, token }))));
        setSelectedMessageIds([]);
    }, [dispatch, token, selectedMessageIds]);

    // Gestion checkbox
    const handleCheckboxChange = useCallback((id) => {
        setSelectedMessageIds((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    }, []);

    const handleSelectAll = useCallback(
        (e) => {
            if (e.target.checked) setSelectedMessageIds(data.map((msg) => msg.id));
            else setSelectedMessageIds([]);
        },
        [data]
    );

    const openPopUp = useCallback((msg) => {
        setSelectedMessage(msg);
        setShowPopUp(true);
    }, []);

    const closePopUp = useCallback(() => {
        setShowPopUp(false);
        setSelectedMessage(null);
    }, []);

    // Pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            dispatch(fetchMessages({ token, page: newPage, sort }));
        }
    };

    // Rendu des messages
    const renderedMessages = useMemo(
        () =>
            data.map((message) => (
                <div key={message.id} className="border-bottom py-2">
                    <div className="row align-items-center">
                        <div className="col-1 d-flex justify-content-center">
                            <input
                                type="checkbox"
                                checked={selectedMessageIds.includes(message.id)}
                                onChange={() => handleCheckboxChange(message.id)}
                            />
                        </div>
                        <div
                            className="col-11 row align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => openPopUp(message)}
                        >
                            <h3 className="petit_titre fw-bold col-lg-3 col-6">
                                {message.sender || "Group Nol Market"}
                            </h3>
                            <h4 className="text-truncate col-lg-4 col-6 petit_titre fw-normal">
                                {message.title}
                            </h4>
                            <p className="texte_brut col-lg-2 col-4 offset-lg-0 offset-4 me-1">
                                {new Date(message.created_at).toLocaleDateString()}
                            </p>
                            <p className="texte_brut col">
                                {new Date(message.created_at).toLocaleTimeString()}
                            </p>
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
            )),
        [data, selectedMessageIds, handleCheckboxChange, openPopUp, handleDeleteOne]
    );

    return (
        <div>
            <div className="shadow-sm border border-1 p-2">
                <div className="border-bottom border-2 border-black w-100 py-2">
                    <div className="row">
                        <div className="col-2 d-flex align-items-center">
                            <h2 className="taux_moyen m-0">Messages</h2>
                        </div>
                        <div className="offset-lg-5 col d-flex align-items-center justify-content-end">
                            <div className="form-check me-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="selectAllCheckbox"
                                    checked={data.length > 0 && selectedMessageIds.length === data.length}
                                    onChange={handleSelectAll}
                                />
                                <label
                                    className="form-check-label texte_brut d-none d-md-block"
                                    htmlFor="selectAllCheckbox"
                                >
                                    Tout sélectionner
                                </label>
                            </div>

                            <img
                                src={corbeille}
                                alt="delete"
                                style={{
                                    width: 20,
                                    cursor: selectedMessageIds.length > 0 ? "pointer" : "not-allowed",
                                    opacity: selectedMessageIds.length > 0 ? 1 : 0.5,
                                }}
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
                                    <li
                                        className="dropdown-item"
                                        onClick={() => {
                                            setDropdownActive("Récent");
                                            dispatch(fetchMessages({ token, page: 1, sort: "recent" }));
                                        }}
                                    >
                                        Récent
                                    </li>
                                    <li
                                        className="dropdown-item"
                                        onClick={() => {
                                            setDropdownActive("Anciens");
                                            dispatch(fetchMessages({ token, page: 1, sort: "anciens" }));
                                        }}
                                    >
                                        Anciens
                                    </li>
                                </ul>
                            </span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <Lottie animationData={Animation} loop style={{ width: 50, margin: "auto" }} />
                ) : data.length === 0 ? (
                    <div className="d-flex flex-column align-items-center justify-content-center my-3">
                        <img src={coupon} alt="" style={{ height: "50px", width: "auto" }} />
                        <p className="p-1 m-0 texte_brut">Votre boîte de réception est vide</p>
                        <p className="p-0 m-0 texte_brut text-center">
                            Tous les messages que nous vous enverrons s'afficheront ici.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="container-fluid mt-2">{renderedMessages}</div>

                        {/* Pagination centrée */}
                        {lastPage > 1 && (
                            <div className="d-flex justify-content-center mt-3">
                                <button
                                    className="btn btn-sm btn-outline-dark mx-1"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Précédent
                                </button>

                                {Array.from({ length: lastPage }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`btn btn-sm mx-1 ${currentPage === i + 1 ? "btn-dark text-white" : "btn-outline-dark"
                                            }`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    className="btn btn-sm btn-outline-dark mx-1"
                                    disabled={currentPage === lastPage}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Suivant
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {showPopUp && <MessageContent closePopUp={closePopUp} message={selectedMessage} />}
        </div>
    );
};

export default Messages;
