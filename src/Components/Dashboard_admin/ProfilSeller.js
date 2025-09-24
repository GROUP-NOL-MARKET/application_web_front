import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import "../../Styles/AdminDashbord/appDashboard.css";
import { DataSeller } from "./dataset/DataSeller";
import FooterDashboard from "./dataset/FooterDashboard";
import statistic_seller_img_1 from "../assets/Images/statistic_seller_img-1.png";
import statistic_seller_img_2 from "../assets/Images/statistic_seller_img-2.png";
import Dropdown from "./dataset/Dropdown";

import Entete from "./dataset/Entete";
import { Button, Rating } from "@mui/material";
import SellPeriod from "./dataset/SellPeriod";

const ProfilSeller = () => {
  const { theme } = useContext(ThemeContext);


  return (
    <div>
      <div className="containter-fluid">
        <Entete title="Profil vendeurs" />

        {/* Premier content  */}

        <div className="row mt-2">
          <div className="col-4">
            <SellPeriod />
          </div>

          <div className="offset-5 col mt-2">
            <Dropdown type="Trier par: " dropdown_item_1="Meilleurs ventes" />
          </div>
        </div>

        {/* Deuxième content  */}

        {DataSeller.map((seller) => (
          <div
            className="col border border-1 shadow-sm mt-3 p-2 d-flex align-items-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row">
              <div className="col-2 d-flex flex-column">
                <img src={seller.logo} alt="logo de l'entreprise" />
                <Button
                  className="bg-primary text-white"
                  style={{ borderRadius: "15px" }}
                >
                  Profil
                </Button>
              </div>
              <div className="col-2 d-flex flex-column">
                <h3 className="taux_moyen">{seller.nom}</h3>
                <a className="m-0 p-0 texte_brut" href={seller.site}>
                  {seller.site}
                </a>
                <p
                  className="m-0 p-0 mt-2 texte_brut"
                  style={{ fontSize: "15px" }}
                >
                  {seller.adresse}
                </p>
                <p
                  className="m-0 p-0 mt-2 texte_brut"
                  style={{ fontSize: "15px" }}
                >
                  {seller.telephone}
                </p>
                <p
                  className="m-0 p-0 mt-2 texte_brut"
                  style={{ fontSize: "15px" }}
                >
                  {seller.email}
                </p>
              </div>
              <div className="col-2">
                <iframe
                  src={seller.localisation}
                  className="img-fluid"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title=" "
                ></iframe>
              </div>
              <div className="col-2 d-flex flex-column">
                <h4 className="taux_moyen">Statistiques :</h4>
                <div className="row">
                  <div className="col-4">
                    {" "}
                    <img
                      src={statistic_seller_img_1}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-8">
                    <p className="m-0 p-0 petit_titre fw-bold">
                      {seller.nombre_commande}
                    </p>
                    <p className="m-0 p-0 texte_brut">Commandes</p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-4">
                    {" "}
                    <img
                      src={statistic_seller_img_2}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-8">
                    <p className="m-0 p-0 petit_titre fw-bold">
                      {seller.revenu} FCFA
                    </p>
                    <p className="m-0 p-0 texte_brut">Revenus</p>
                  </div>
                </div>
                <div className="d-flex flex-column mt-2">
                  <h6 className="petit_titre">Revue de notation</h6>
                  <Rating name="size-medium" value={seller.notation} readOnly />
                </div>
              </div>
              <div className="col">
                <h5 className="taux_moyen">Profit de vente par catégories</h5>
                <div className="petit_titre">Produits locaux</div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: seller.produits_locaux + "%",
                      backgroundColor: "green",
                    }}
                    aria-valuenow={seller.produits_locaux}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {seller.produits_locaux}%
                  </div>
                </div>
                <div className="petit_titre">Boissons</div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: seller.boissons + "%",
                      backgroundColor: "red",
                    }}
                    aria-valuenow={seller.boissons}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {seller.boissons}%
                  </div>
                </div>
                <div className="petit_titre">Electronique</div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: seller.electronic + "%",
                      backgroundColor: "black",
                    }}
                    aria-valuenow={seller.electronic}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {seller.electronic}%
                  </div>
                </div>
                <div className="petit_titre">Epicerie</div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: seller.epicerie + "%",
                      backgroundColor: "blue",
                    }}
                    aria-valuenow={seller.epicerie}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {seller.epicerie}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination  */}

        <nav aria-label="Page navigation example" className="mt-2">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href=" " aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href=" ">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href=" ">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href=" ">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href=" " aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer  */}

        <FooterDashboard />
      </div>
    </div>
  );
};

export default ProfilSeller;
