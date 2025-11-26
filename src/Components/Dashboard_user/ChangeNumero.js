import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Spinner } from "react-bootstrap";
import "../../Styles/UserDashboard/Gestion.css";
import CountryDropdown from "./CountryDropdown";
import { toast } from "react-toastify";
import API from "../Authentification/api";

const ChangeNumero = ({ closePopUp2 }) => {
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await API.get("/user");

        let userPhone = response.data.phone || "";

        // 1️⃣ Retirer +229 ou 229 au début
        userPhone = userPhone.replace(/^(\+?229)/, "");

        // 2️⃣ Retirer tous les espaces restants
        userPhone = userPhone.replace(/\s+/g, "");

        // 3️⃣ Reformater le numéro en XX XX XX XX XX
        const formattedPhone = userPhone.replace(/(\d{2})(?=\d)/g, "$1 ");

        setPhone(formattedPhone.trim());
      } catch (error) {
        console.error("Erreur de récupération du profil :", error);
      }
    };

    fetchUserData();
  }, []);

  // Formate et limite la saisie
  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Retire tout sauf les chiffres
    value = value.slice(0, 10); // Limite à 10 chiffres
    value = value.replace(/(\d{2})(?=\d)/g, "$1 "); // Ajoute un espace après chaque 2 chiffres
    setPhone(value);
    setErrors({}); // Réinitialise les erreurs à chaque modification
  };

  // Validation côté front
  const validate = () => {
    const newErrors = {};
    const cleanPhone = phone.replace(/\s/g, "");

    // Vérifie si vide
    if (!cleanPhone.trim()) {
      newErrors.phone = "Entrez un numéro de téléphone.";
    } else if (!/^01\d{8}$/.test(cleanPhone)) {
      newErrors.phone =
        "Le numéro doit commencer par 01 et contenir 10 chiffres au total.";
    } else {
      // Vérifie que les deux chiffres après '01' sont entre 20 et 29
      const secondPair = parseInt(cleanPhone.substring(2, 4), 10);
      if (secondPair < 50 || secondPair > 99) {
        newErrors.phone =
          "Les deux chiffres après '01' doivent être compris entre 20 et 29.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Envoi des données
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Stoppe si le numéro est invalide

    const cleanPhone = phone.replace(/\s/g, ""); // Enlève les espaces avant l’envoi
    const form = { phone: cleanPhone };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        window.location.href = "/login";
        return;
      }

      const response = await API.put("/user/update-phone", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(
        response.data.message || "Numéro de téléphone mis à jour avec succès !"
      );
      closePopUp2();
    } catch (error) {
      console.error("Erreur :", error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.warning("Votre session a expiré, veuillez vous reconnecter.");
        window.location.href = "/login";
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup rounded-3 p-3">
        <button
          onClick={closePopUp2}
          className="bouton-close text-xxl"
          style={{ color: "red" }}
        >
          ✕
        </button>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="m-2 text-center">
            <Form.Label className="label_register">
              Numéro de téléphone
            </Form.Label>
            <p className="texte_brut">
              Il s'agit du numéro actuellement associé à votre profil. Vous
              pouvez le modifier ci-dessous.
            </p>

            <div className="row">
              <div className="col-md-2 col-4" style={{ height: "45px" }}>
                <CountryDropdown />
              </div>
              <div className="col-lg-10 col">
                <Form.Control
                  type="text"
                  className="input_register"
                  value={phone}
                  onChange={handleChange}
                  placeholder="01 XX XX XX XX"
                  maxLength={14} // 10 chiffres + 4 espaces
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </div>
            </div>
          </FormGroup>

          <Button
            className="w-100 rounded-5 mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Modifier le numéro de téléphone"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChangeNumero;
