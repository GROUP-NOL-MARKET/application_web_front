import React from "react";
import img_entreprise from "../../assets/Images/Logo_entreprise-removebg-preview.png";

const FooterDashboard = () => {
  return (
    <div className="container-fluid">
        <hr />
        <div className="row mt-0">
          <p className="col-10" style={{ fontSize: "10px" }}>
            Copyright © 2025 par Nol Market. Tous droits réservés
          </p>
          <div className="col-2 d-flex justify-content-end">
            <div className="row">
              <span className="col-8" style={{ fontSize: "10px" }}>
                Produit par:
              </span>
              <img
              src={img_entreprise}
              alt="logo de l'entreprise"
              className="img-fluid col-3"
            />
            </div>
          </div>
        </div>
      </div>

  );
};

export default FooterDashboard;
