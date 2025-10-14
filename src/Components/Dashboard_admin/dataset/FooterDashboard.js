import React from "react";
import img_entreprise from "../../assets/Images/Logo_entreprise-removebg-preview.webp";

const FooterDashboard = () => {
  return (
    <div className="container-fluid">
      <hr />
      <div className="row mt-0">
        <p className="col-10" style={{ fontSize: "10px" }}>
          Copyright © 2025 par Nol Market. Tous droits réservés
        </p>
        <div className="col-1 d-flex align-items-center justify-content-end">
          <span style={{ fontSize: "10px" }}>
            Produit par:
          </span>
        </div>
        <div className="col-1">
          <img
            src={img_entreprise}
            alt="logo de l'entreprise"
            className="img-fluid"
          />
        </div>

      </div>
    </div>

  );
};

export default FooterDashboard;
