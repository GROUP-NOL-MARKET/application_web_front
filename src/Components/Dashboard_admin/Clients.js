import React, { useContext } from "react";
import Entete from "./dataset/Entete";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCircle,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import avis_dashboard_1 from "../assets/Images/avis_dashboard_1.webp";
import avis_dashboard_2 from "../assets/Images/avis_dashboard_2.webp";
import avis_dashboard_3 from "../assets/Images/avis_dashboard_3.webp";
import PieAnimation from "./dataset/PieAnimation";

const Clients = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="container-fluid">
      {/* Entete  */}

      <Entete title="Clients" />

      {/* Premier content  */}

      <div className="container-fluid">
        <div className="row mt-4">
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img alt="" src={avis_dashboard_1} className="img-fluid w-50" />
            <h5 className="petit_titre fw-bold"> 32 500</h5>
            <h5 className="petit_titre">Tous les clients</h5>
          </div>
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img alt="" src={avis_dashboard_2} className="img-fluid w-50" />
            <h5 className="petit_titre fw-bold"> 21 000</h5>
            <h5 className="petit_titre">Nouveaux clients</h5>
          </div>
          <div
            className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <img className="img-fluid w-50" src={avis_dashboard_3} alt="" />
            <h className="petit_titre fw-bold">30 500</h>
            <h className="petit_titre">Clients réguliers</h>
          </div>
          <div className="col shadow-sm border border-1">
            <h5 className="taux_moyen">Taux de conversion</h5>
            <div className="row">
              <div className="col-8">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col" className="texte_brut">
                        Année
                      </th>
                      <th scope="col" className="texte_brut">
                        Clients
                      </th>
                      <th scope="col" className="texte_brut">
                        Pourcent
                      </th>
                      <th scope="col" className="texte_brut">
                        Revenu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" className="texte_brut">
                        2025
                      </th>
                      <td className="texte_brut">12 000</td>
                      <td className="texte_brut">25%</td>
                      <td className="texte_brut">124 000 FCFA</td>
                    </tr>
                    <tr>
                      <th scope="row" className="texte_brut">
                        2026
                      </th>
                      <td className="texte_brut">10 000</td>
                      <td className="texte_brut">10%</td>
                      <td className="texte_brut">32 000 FCFA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-6">
                    <p className="texte_brut fw-bold">32.500</p>
                    <p className="texte_brut">Réguliers</p>
                    <span style={{ color: "green" }} className="col-1">
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                    <span
                      style={{ color: "green" }}
                      className="col-2 texte_brut"
                    >
                      +65%
                    </span>
                  </div>
                  <div className="col-6">
                    <p className="texte_brut fw-bold">32.500</p>
                    <p className="texte_brut">Nouveaux</p>
                    <span style={{ color: "green" }} className="col-1">
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                    <span
                      style={{ color: "green" }}
                      className="col-2 texte_brut"
                    >
                      +65%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième content  */}

      <div className="container-fluid">
        <div className="row mt-4">
          <div
            className="col-8 me-2 shadow-sm border border-1 p-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row">
              <div className="col-6 me-2">
                <h5 className="petit_titre fw-bold">
                  Taux de fidélisation des clients
                </h5>
                <PieAnimation />
              </div>
              <div className="col d-flex flex-column">
                <h5 className="petit_titre fw-bold">
                  Clients total - 32 500 en 2025
                </h5>
                <p
                  className="texte_brut d-flex"
                  style={{ textAlign: "justify" }}
                >
                  Plus de [32 500] clients nous font déjà confiance pour leurs
                  achats en ligne. Qu’ils soient particuliers, commerçants ou
                  professionnels, ils choisissent notre plateforme pour la
                  qualité des produits, la simplicité d’utilisation et
                  l’engagement envers le local. Chaque nouveau client renforce
                  notre mission : rendre les produits accessibles, authentiques
                  et proches de ceux qui en ont besoin.
                </p>
                <div className="row">
                  <div className="col-1">
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{ color: "black" }}
                    />
                  </div>
                  <p className="col petit_titre fw-bold">
                    Nouveaux clients - 50%, soit 15 600 visiteurs
                  </p>
                </div>
                <div className="row">
                  <div className="col-1">
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{ color: "blue" }}
                    />
                  </div>
                  <p className="col petit_titre fw-bold">
                    Clients fréquents - 32%, soit 7 500 visiteurs
                  </p>
                </div>
                <div className="row">
                  <div className="col-1">
                    <FontAwesomeIcon icon={faCircle} style={{ color: "red" }} />
                  </div>
                  <p className="col petit_titre fw-bold">
                    Clients inactifs - 10%, soit 1 025 visiteurs
                  </p>
                </div>
                <div className="row">
                  <div className="col-1">
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{ color: "yellow" }}
                    />
                  </div>
                  <p className="col petit_titre fw-bold">
                    Panier abandonné - 2% soit 93 visiteurs
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col shadow-sm border border-1 p-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <h5 className="petit_titre fw-bold">Segmentation démographique</h5>
            <div className="d-flex flex-column mt-2">
              <div className="row">
                <h5 className="col-6 texte_brut"> Age 18 - 25</h5>
                <h5 className="col d-flex justify-content-end texte_brut">
                  6 200
                </h5>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  25%
                </div>
              </div>
            </div>
            <div className="d-flex flex-column mt-2">
              <div className="row">
                <h5 className="col-6 texte_brut"> Age 25 - 45</h5>
                <h5 className="col d-flex justify-content-end texte_brut">
                  6 200
                </h5>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  50%
                </div>
              </div>
            </div>
            <div className="d-flex flex-column mt-2">
              <div className="row">
                <h5 className="col-6 texte_brut"> Age 45 - 60</h5>
                <h5 className="col d-flex justify-content-end texte_brut">
                  6 200
                </h5>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  15%
                </div>
              </div>
            </div>
            <div className="d-flex flex-column mt-2">
              <div className="row">
                <h5 className="col-6 texte_brut"> Age 60 - 90</h5>
                <h5 className="col d-flex justify-content-end texte_brut">
                  6 200
                </h5>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  10%
                </div>
              </div>
            </div>
            <h5 className="petit_titre fw-bold mt-4">
              Segmentation par gendre
            </h5>
            <ul className="list-unstyled d-flex flex-row">
              <li className="d-flex flex-column col-4">
                <div className="bg-light">
                  <FontAwesomeIcon icon={faMars} />
                </div>
                <h5 className="petit_titre">60%</h5>
              </li>
              <li className="d-flex flex-column col-4">
                <div className="bg-light">
                  <FontAwesomeIcon icon={faVenus} />
                </div>
                <h5 className="petit_titre">40%</h5>
              </li>
              <li className="d-flex flex-column col-4">
                <div className="bg-light"></div>
                <h5 className="petit_titre">0%</h5>
              </li>
            </ul>
            <p
              className="texte_brut d-flex mt-4"
              style={{ textAlign: "justify" }}
            >
              Notre site accueille une population variée d’utilisateurs répartis
              sur plusieurs régions et profils. Des jeunes entrepreneurs aux
              familles locales, en passant par des professionnels du secteur,
              chaque visiteur contribue à la richesse de notre plateforme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
