import React, { useContext, useState } from "react";
import Entete from "./dataset/Entete";
import SellPeriod from "./dataset/SellPeriod";
import { ThemeContext } from "./ThemeContext";
import { DataSeller } from "./dataset/DataSeller";
import img_PL_dashboard from "../assets/Images/img_PL_dashboard.webp";
import img_electromenager_dashboard from "../assets/Images/img_electromenager_dashboard.webp";
import img_epicerie_dashboard from "../assets/Images/img_epicerie_dashboard.webp";
import img_boissons_dashboard from "../assets/Images/img_boissons_dashboard.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  best_product_PL,
  best_product_droguerie,
  best_product_epicerie,
  best_product_electromenager,
} from "../Product_Data";
import FooterDashboard from "./dataset/FooterDashboard";
import Rating from "@mui/material/Rating";

const BestProduct = () => {
  const [dropActive, setDropActive] = useState("Meilleures ventes");
  const { theme } = useContext(ThemeContext);

  return (
    <div className="container-fluid">
      {/* En-tête  */}

      <Entete title="Meilleurs produits" />

      {/* Premier content  */}

      <div className="row mt-2">
        <div className="col">
          <SellPeriod text="Période de ventes" />
        </div>

        <div className="offset-5 col mt-3">
          <h6 className="petit_titre">Produits vus : 5/10</h6>
          <div className="border border-1">
            <div className="dropdown" style={{ cursor: "pointer" }}>
              <span
                className="dropdown-toggle"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Trier par : {dropActive}
              </span>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li
                  className="dropdown-item"
                  onClick={() => setDropActive("Meilleurs ventes")}
                >
                  Meilleurs ventes
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => setDropActive("Nom")}
                >
                  Nom
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => setDropActive("Pires ventes")}
                >
                  Pires ventes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième content  */}
      <div className="container-fluid">
        <div className="row mt-4">
          <div
            className="col shadow-sm border border-1 p-2 me-1"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <h5 className="taux_moyen">Top ventes par catégories</h5>
            <div className="d-flex flex-column">
              <div className="row">
                <h4 className="petit_titre col-6">Boissons</h4>
                <h4 className="col-6 d-flex justify-content-end petit_titre">
                  1 000 000 FCFA
                </h4>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "90%",
                    backgroundColor: "orange",
                  }}
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  90%
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="row mt-2">
                <h4 className="petit_titre col-6">Produits frais</h4>
                <h4 className="petit_titre col-6 d-flex justify-content-end">
                  980 000 FCFA
                </h4>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "70%",
                    backgroundColor: "gray",
                  }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  70%
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="row mt-2">
                <h4 className="petit_titre col-6">Produits locaux</h4>
                <h4 className="petit_titre col-6 d-flex justify-content-end">
                  700 000 FCFA
                </h4>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "60%",
                    backgroundColor: "green",
                  }}
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  60%
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="row mt-2">
                <h4 className="petit_titre col-6">Droguerie</h4>
                <h4 className="petit_titre col-6 d-flex justify-content-end">
                  600 000 FCFA
                </h4>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: "60%",
                    backgroundColor: "blue",
                  }}
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  60%
                </div>
              </div>
            </div>
          </div>
          {DataSeller.slice(0, 4).map((seller) => (
            <div
              className="col-2 me-1 ms-1 d-flex flex-column shadow-sm border border-1"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={seller.logo}
                  alt=""
                  className="w-auto"
                  style={{ height: "150px" }}
                />
              </div>
              <div className="row">
                <div className="col-4">
                  <img src={img_PL_dashboard} alt=" " className="img-fluid" />
                </div>
                <div className="col-8">
                  <h5 className="petit_titre">Produits Locaux</h5>
                </div>
              </div>
              <p className="taux_moyen">{seller.revenu} FCFA</p>
            </div>
          ))}
        </div>
      </div>

      {/* Troisième content  */}

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-6">
            <div className="row mb-2">
              <img className="img-fluid col" src={img_PL_dashboard} alt=" " />
              <h4 className="taux_moyen col-10 d-flex align-items-center">
                Produits Locaux
              </h4>
            </div>
            <div className="row">
              {best_product_PL.slice(0, 3).map((best) => (
                <div
                  className="col me-2 border border-1 shadow-sm"
                  style={{
                    backgroundColor: theme === "dark" ? "black" : "white",
                  }}
                >
                  <div className="row">
                    <img
                      src={best.img}
                      alt=" "
                      className="img-fluid col ms-2 mt-2 bg-light"
                      style={{ height: "100px" }}
                    />
                    <div className="col-2 mt-2 d-flex justify-content-end">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>
                  <h4 className="taux_moyen fw-normal">{best.nom}</h4>
                  <Rating
                    name="size-small"
                    value={best.notation}
                    size="small"
                  />
                  <h6 className="petit_titre">{best.restant} restants</h6>
                  <h6 className="petit_titre">{best.vendu} vendus</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-2">
              <img
                className="img-fluid col"
                src={img_electromenager_dashboard}
                alt=" "
              />
              <h4 className="col-10 taux_moyen d-flex align-items-center">
                Electroménager
              </h4>
            </div>

            <div className="row">
              {best_product_electromenager.slice(0, 3).map((best) => (
                <div
                  className="col me-2 border border-1 shadow-sm"
                  style={{
                    backgroundColor: theme === "dark" ? "black" : "white",
                  }}
                >
                  <div className="row">
                    <img
                      src={best.img}
                      alt=" "
                      className="img-fluid col ms-2 mt-2 bg-light"
                      style={{ height: "100px" }}
                    />
                    <div className="col-2 mt-2 d-flex justify-content-end">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>
                  <h4 className="taux_moyen fw-normal">{best.nom}</h4>
                  <Rating
                    name="size-small"
                    value={best.notation}
                    size="small"
                  />
                  <h6 className="petit_titre">{best.restant} restants</h6>
                  <h6 className="petit_titre">{best.vendu} vendus</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-6">
            <div className="row mb-2">
              <img
                className="img-fluid col"
                src={img_epicerie_dashboard}
                alt=" "
              />
              <h4 className="taux_moyen col-10 d-flex align-items-center">
                Epicerie
              </h4>
            </div>
            <div className="row">
              {best_product_epicerie.slice(0, 3).map((best) => (
                <div
                  className="col me-2 border border-1 shadow-sm"
                  style={{
                    backgroundColor: theme === "dark" ? "black" : "white",
                  }}
                >
                  <div className="row">
                    <img
                      src={best.img}
                      alt=" "
                      className="img-fluid col ms-2 mt-2 bg-light"
                      style={{ height: "100px" }}
                    />
                    <div className="col-2 mt-2 d-flex justify-content-end">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>
                  <h4 className="taux_moyen fw-normal">{best.nom}</h4>
                  <Rating
                    name="size-small"
                    value={best.notation}
                    size="small"
                  />
                  <h6 className="petit_titre">{best.restant} restants</h6>
                  <h6 className="petit_titre">{best.vendu} vendus</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-2">
              <img
                className="img-fluid col"
                src={img_boissons_dashboard}
                alt=" "
              />
              <h4 className="taux_moyen col-10 d-flex align-items-center">
                Boissons
              </h4>
            </div>
            <div className="row">
              {best_product_droguerie.slice(0, 3).map((best) => (
                <div
                  className="col me-2 border border-1 shadow-sm"
                  style={{
                    backgroundColor: theme === "dark" ? "black" : "white",
                  }}
                >
                  <div className="row">
                    <img
                      src={best.img}
                      alt=" "
                      className="img-fluid col ms-2 mt-2 bg-light"
                      style={{ height: "100px" }}
                    />
                    <div className="col-2 mt-2 d-flex justify-content-end">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>
                  <h4 className="taux_moyen fw-normal">{best.nom}</h4>
                  <Rating
                    name="size-small"
                    value={best.notation}
                    size="small"
                  />
                  <h6 className="petit_titre">{best.restant} restants</h6>
                  <h6 className="petit_titre">{best.vendu} vendus</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterDashboard />
    </div>
  );
};

export default BestProduct;
