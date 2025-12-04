import React, { useState } from "react";
import moov from "./assets/Images/moovmoney.png";
import { Button, Form, FormControl, FormLabel, Spinner } from "react-bootstrap";
import ReactCountryDropdown from "react-country-dropdown";
import { toast } from "react-toastify";
import API from "./Authentification/api";

const MoovPay = ({ closePopUp1 }) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Retire tout sauf les chiffres
    value = value.slice(0, 10); // Limite à 10 chiffres
    value = value.replace(/(\d{2})(?=\d)/g, "$1 "); // Ajoute un espace après chaque 2 chiffres
    setPhone(value);
    setErrors({}); // Réinitialise les erreurs à chaque modification
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    const newErrors = {};

    const cleanPhone = phone.replace(/\s/g, "");

    if (cleanPhone) {
      if (!/^01\d{8}$/.test(cleanPhone)) {
        newErrors.phone =
          "Le numéro doit commencer par 01 et contenir 10 chiffres au total.";
      } else {
        // Vérifie que les deux chiffres après '01' sont entre 20 et 29
        const secondPair = parseInt(cleanPhone.substring(2, 4), 10);
        if (secondPair < 50 || secondPair > 99) {
          newErrors.phone =
            "Les deux chiffres après '01' doivent être compris entre 50 et 99.";
        }
      }
    }


    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expirée");
      return;
    }

    try {
      const response = await API.post(
        "/moov/pay",
        {
          phone: cleanPhone,
          amount: 1000, // montant dynamique : panier, commande...
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message);
      closePopUp1();

    } catch (error) {
      console.log(error);
      toast.error("Erreur Moov Money");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="popup-overlay">
      <div className="popup rounded-3">
        <button
          onClick={closePopUp1}
          className="bouton-close text-xxl"
          style={{ color: "red" }}
        >
          ✕
        </button>
        <div className="d-flex flex-column paiement_background_moov g-0">
          <div className="d-flex align-items-center justify-content-center">
            <img src={moov} alt="" style={{ width: "300px" }} />
          </div>
          {/*  style={{backgroundColor:"#CCA204"}} */}
          <div className="w-100 p-3 py-4 ">
            <Form onSubmit={handleSubmit} method="post">
              <FormLabel style={{ color: "white" }} className="label_register">
                Entrer votre numéro moov de paiement
              </FormLabel>
              <div className="row">
                <div
                  className="col-4 col-sm-3 col-md-4 col-lg-2 me-2"
                  style={{ pointerEvents: "none" }}
                >
                  <ReactCountryDropdown defaultCountry="BJ" />
                </div>
                <div className="col">
                  <FormControl
                    type="tel"
                    placeholder="01 XX XX XX XX"
                    value={phone}
                    onChange={handleChange}
                    isInvalid={errors?.phone ? true : false}
                  />
                  <FormControl.Feedback type="invalid"></FormControl.Feedback>
                </div>
              </div>
              <Button
                className="mt-3 w-100 rounded-5 border-0 label_register"
                style={{ backgroundColor: "green", fontSize: "20px" }}
              >
                {loading ? <Spinner animation="border" /> : "Payer"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoovPay;
