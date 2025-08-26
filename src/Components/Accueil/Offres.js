import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/Offres.css";

const Offres = () => {
  return (
    <div className="Offres mt-2">
      <div className="container">
        <div
          className="row mt-sm-4  d-flex align-items-center d-lg-none"
          style={{ borderColor: "#FA7F1B", height: "8rem" }}
        >
          <div className="col-md-3 col-sm-6 offset-sm-1 offset-md-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-3 col-sm-2 icon">
                <FontAwesomeIcon icon={faRocket} size="2x" />
              </div>
              <div className="col-8 m-sm-2 m-md-3">
                <h6 className="title_offre ">Livraison assurée</h6>
                <p className="text ">A partir de 100.000 FCFA</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-5">
            <div className="row d-flex align-items-center">
              <span
                className="border-start my-auto col-1"
                style={{ height: "4rem" }}
              ></span>
              <div className="col-2 icon">
                <FontAwesomeIcon icon={faWallet} size="2x" />
              </div>
              <div className="col-8 m-1">
                <h6 className="title_offre">Paiement</h6>
                <p className="text w-100">Système sécurisé</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 offset-sm-1 offset-md-0">
            <div className="row d-flex align-items-center">
              <span
                className="border-start my-auto col-1 d-none d-md-block"
                style={{ height: "4rem" }}
              ></span>
              <div className="col-2 icon">
                <FontAwesomeIcon icon={faHeadphones} size="2x" />
              </div>
              <div className="col-8 m-1">
                <h6 className="title_offre">Support assistance</h6>
                <p className="text">Disponible 24/7</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-5">
            <div className="row d-flex align-items-center">
              <span
                className="border-start my-auto col-1"
                style={{ height: "4rem" }}
              ></span>
              <div className="col-2 icon">
                <FontAwesomeIcon icon={faUmbrella} size="2x" />
              </div>
              <div className="col-8 m-1">
                <h6 className="title_offre">100% sûre</h6>
                <p className="text"> Achat sécurisé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pour les grands écrans  */}

        <div
          className="row border border-1 mt-sm-4 d-none d-lg-block  d-lg-flex align-items-center"
          style={{ borderColor: "#FA7F1B", height: "8rem" }}
        >
          <div className="col-md-3 col-sm-6 offset-sm-1 offset-md-0">
            <div className="row d-flex align-items-center">
              <div className="col-2 icon">
                <FontAwesomeIcon icon={faRocket} size="2x" />
              </div>
              <div className="col-8 m-2">
                <h6 className="title_offre ">Livraison assurée</h6>
                <p className="text ">A partir de 100.000 FCFA</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-5">
            <div className="row d-flex align-items-center">
              <span
                className="border-start my-auto col-1"
                style={{ height: "4rem" }}
              ></span>
              <div className="col-2 icon">
                <FontAwesomeIcon icon={faWallet} size="2x" />
              </div>
              <div className="col-8 m-1">
                <h6 className="title_offre">Paiement</h6>
                <p className="text">Système sécurisé</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 offset-sm-1 offset-md-0">
            <div className="row d-flex align-items-center">
              <span
                className="border-start my-auto col-1 d-none d-md-block"
                style={{ height: "4rem" }}
              ></span>
              <div className="col-2 icon">
                <FontAwesomeIcon icon={faHeadphones} size="2x" />
              </div>
              <div className="col-8 m-1">
                <h6 className="title_offre">Support assistance</h6>
                <p className="text">Disponible 24/7</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-5">
            <div className="row d-flex align-items-center">
              <span
                className="border-start my-auto col-1"
                style={{ height: "4rem" }}
              ></span>
              <div className="col-2 icon">
                <FontAwesomeIcon icon={faUmbrella} size="2x" />
              </div>
              <div className="col-8 m-1">
                <h6 className="title_offre">100% sûre</h6>
                <p className="text"> Achat sécurisé</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Offres;
