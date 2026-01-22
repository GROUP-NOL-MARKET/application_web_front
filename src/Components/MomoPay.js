import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import mtn from "./assets/Images/momo_img.png";
import { Button, Form, FormControl, FormLabel, Spinner } from "react-bootstrap";
import ReactCountryDropdown from "react-country-dropdown";
import { toast } from "react-toastify";
import { PanierContext } from "../Store/Panier_context";
import API from "./Authentification/api";

const MomoPay = ({ closePopUp, product, amount }) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const intervalRef = useRef(null);
  const { clearCart } = useContext(PanierContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 11);
    value = value.replace(/(\d{2})(?=\d)/g, "$1 ");
    setPhone(value);
    setErrors({});
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const hasHandledSuccess = useRef(false);

  const handleSuccess = async () => {
    if (hasHandledSuccess.current) return;
    hasHandledSuccess.current = true;

    stopPolling();
    setLoading(false);

    toast.success("Paiement confirmé avec succès");

    localStorage.removeItem("cart");
    closePopUp();

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleFailure = () => {
    stopPolling();
    setLoading(false);
    toast.error("Paiement annulé ou échoué");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanPhone = phone.replace(/\s/g, "");

    try {
      const response = await API.post("/momo/pay", {
        phone: cleanPhone,
        products: product,
        amount: amount,
      });

      const reference = response.data.reference;

      intervalRef.current = setInterval(async () => {
        try {
          const statusRes = await API.get(`/momo/status/${reference}`);
          const status = statusRes.data.status;

          if (status === "validee" || status === "successful") {
            handleSuccess();
          }

          if (status === "annulee" || status === "failed") {
            handleFailure();
          }
        } catch (err) {
          // Optionnel : ignorer erreurs réseau temporaires
        }
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error("Erreur lors de l’initiation du paiement");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup rounded-3">
        <button
          onClick={() => {
            stopPolling();
            closePopUp();
          }}
          className="bouton-close text-xxl"
          style={{ color: "red" }}
        >
          ✕
        </button>

        <div className="d-flex flex-column paiement_background">
          <div className="d-flex align-items-center justify-content-center">
            <img src={mtn} alt="" style={{ width: "300px" }} />
          </div>

          <div className="w-100 p-3 py-4">
            <Form onSubmit={handleSubmit}>
              <FormLabel
                style={{ color: "#013A57" }}
                className="d-flex flex-column"
              >
                <h2 className="taux_moyen">
                  Entrer votre numéro MTN de paiement
                </h2>
                <p className="texte_brut">
                  Un message sera envoyé sur ce numéro pour que vous confirmez
                  le paiement.
                </p>
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
                    disabled={loading}
                    isInvalid={!!errors.phone}
                  />
                </div>
              </div>

              <Button
                className="mt-3 w-100 rounded-5 border-0"
                style={{ backgroundColor: "green", fontSize: "20px" }}
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
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

export default MomoPay;
