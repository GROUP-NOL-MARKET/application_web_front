import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faWallet,
  faHeadphones,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";
import "../../Styles/Offres.css";

const Offres = () => {
  return (
    <div className="Offres mt-4">
      <div className="container-fluid">
        {/* Wrapper avec bordure (PAS de row ici) */}
        <div
          className="border border-1 rounded py-3"
          style={{ borderColor: "#FA7F1B" }}
        >
          <div className="row align-items-center text-center text-md-start">
            {/* Livraison */}
            <div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex align-items-center justify-content-start gap-3">
                <FontAwesomeIcon icon={faRocket} size="2x" className="icon" />
                <div>
                  <h6 className="title_offre mb-1">Livraison assurée</h6>
                  <p className="text mb-0">À partir de 100.000 FCFA</p>
                </div>
              </div>
            </div>

            {/* Séparateur desktop */}
            <div className="d-none d-lg-block col-lg-1 text-center">
              <span className="border-start d-inline-block" style={{ height: "3rem" }} />
            </div>

            {/* Paiement */}
            <div className="col-12 col-md-6 col-lg-2 mb-3 mb-lg-0">
              <div className="d-flex align-items-center justify-content-start gap-3">
                <FontAwesomeIcon icon={faWallet} size="2x" className="icon" />
                <div>
                  <h6 className="title_offre mb-1">Paiement</h6>
                  <p className="text mb-0">Système sécurisé</p>
                </div>
              </div>
            </div>

            {/* Séparateur desktop */}
            <div className="d-none d-lg-block col-lg-1 text-center">
              <span className="border-start d-inline-block" style={{ height: "3rem" }} />
            </div>

            {/* Support */}
            <div className="col-12 col-md-6 col-lg-2 mb-3 mb-lg-0">
              <div className="d-flex align-items-center justify-content-start gap-3">
                <FontAwesomeIcon icon={faHeadphones} size="2x" className="icon" />
                <div>
                  <h6 className="title_offre mb-1">Support assistance</h6>
                  <p className="text mb-0">Disponible 24/7</p>
                </div>
              </div>
            </div>

            {/* Séparateur desktop */}
            <div className="d-none d-lg-block col-lg-1 text-center">
              <span className="border-start d-inline-block" style={{ height: "3rem" }} />
            </div>

            {/* Sécurité */}
            <div className="col-12 col-md-6 col-lg-2">
              <div className="d-flex align-items-center justify-content-md-start gap-3">
                <FontAwesomeIcon icon={faUmbrella} size="2x" className="icon" />
                <div>
                  <h6 className="title_offre mb-1">100% sûre</h6>
                  <p className="text mb-0">Achat sécurisé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fin wrapper */}
      </div>
    </div>
  );
};

export default Offres;
