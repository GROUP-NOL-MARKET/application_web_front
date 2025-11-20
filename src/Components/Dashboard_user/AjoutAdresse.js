import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, Spinner } from "react-bootstrap";
import "../../Styles/UserDashboard/Gestion.css";
import { toast } from "react-toastify";
import API from "../Authentification/api";

const AjoutAdresse = ({ closePopUp, token }) => {
    const [adresse, setAdresse] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    //  Regex : permet lettres, chiffres, espaces, tirets et quelques ponctuations
    const adresseRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,'-]{5,200}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(false)

        // Validation frontend
        if (!adresse.trim()) {
            setError("Veuillez entrer une adresse avant d’enregistrer.");
            return;
        }

        if (!adresseRegex.test(adresse)) {
            setError(
                "Adresse invalide. Utilisez uniquement des lettres, chiffres et ponctuations simples (ex: Rue du Soleil 45, Cotonou)."
            );
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Session expirée. Veuillez vous reconnecter.");
                window.location.href = "/login";
                return;
            }

            const response = await API.put(
                "/user/update-address",
                { addresse: adresse },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setSuccess("Adresse enregistrée avec succès !");
                setAdresse("");
                toast.success("Adresse ajoutée avec succès");
                closePopUp();
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Votre session a expiré. Veuillez vous reconnecter.");
                localStorage.removeItem("token");
                window.location.href = "/login";
            } else {
                setError("Une erreur est survenue lors de l’enregistrement.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup shadow-sm p-3 rounded-3">
                <button
                    onClick={closePopUp}
                    className="bouton-close text-xxl"
                    style={{ color: "red" }}
                >
                    ✕
                </button>

                <Form onSubmit={handleSubmit} method="post">
                    <FormGroup>
                        <FormLabel className="fw-bold petit_titre">Adresse</FormLabel>
                        <p className="texte_brut">
                            Enregistrez votre adresse complète ici.
                        </p>

                        <FormControl
                            as="textarea"
                            rows={4}
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            placeholder="Exemple : Rue du Soleil 45, Cotonou, Bénin"
                            className={error ? "is-invalid" : ""}
                        />

                        {error && (
                            <small className="text-danger fw-bold d-block mt-2">{error}</small>
                        )}
                        {success && (
                            <small className="text-success fw-bold d-block mt-2">
                                {success}
                            </small>
                        )}
                    </FormGroup>

                    <Button
                        type="submit"
                        className="w-100 mt-3 rounded-5 fw-bold"
                        variant="primary"
                    >
                        {loading ? (<Spinner size="sm" animation="border" />) : ("Enregistrer")}

                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AjoutAdresse;
