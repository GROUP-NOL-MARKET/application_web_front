import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Entete from "./dataset/Entete";
import "../../Styles/AdminDashbord/appDashboard.css";

import SimpleLineChart from "./dataset/SimpleLineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import PieColor from "./dataset/PieColor";
import wallet from "../assets/Images/wallet.png";
import silverCoin from "../assets/Images/silver_coin.png";
import carteCredit from "../assets/Images/carte_credit.png";
import img_revenu_period_1 from "../assets/Images/img_revenu_period_1.png";
import img_revenu_period_2 from "../assets/Images/img_revenu_period_2.png";
import img_revenu_period_3 from "../assets/Images/img_revenu_period_3.png";
import img_revenu_period_4 from "../assets/Images/img_revenu_period_4.png";
import SellPeriod from "./dataset/SellPeriod";

const Revenue = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div className="container-fluid">
        <Entete title="Revenus par période" />

        {/* Premier content  */}

        <div className="row mt-2">
          <div className="col">
            <SellPeriod text="Période de vente"/>
          </div>

          <div className="offset-2 col-6 d-flex flex-column d-flex justify-content-end">
            <h3 className="taux_moyen " style={{ marginRight: "2%" }}>
              Thème populaire
            </h3>
            <ul className="list-unstyled row mt-2">
              <button
                className="border border-1 col-2 mx-1 d-flex align-items-center justify-content-center"
                style={{ borderRadius: "25px", fontSize: "10px" }}
              >
                Mieux notés
              </button>
              <button
                className="border border-1 col-2 mx-1 d-flex align-items-center justify-content-center"
                style={{ borderRadius: "25px", fontSize: "10px" }}
              >
                Nouveau
              </button>
              <button
                className="border border-1 col-2 mx-1 d-flex align-items-center justify-content-center"
                style={{ borderRadius: "25px", fontSize: "10px" }}
              >
                Meilleurs ventes
              </button>
              <button
                className="border border-1 col-2 mx-1 bg-primary d-flex align-items-center justify-content-center"
                style={{ borderRadius: "25px", fontSize: "10px" }}
              >
                A-Z
              </button>
              <button
                className="border border-1 col-2 mx-1 d-flex align-items-center justify-content-center"
                style={{ borderRadius: "25px", fontSize: "10px" }}
              >
                Avis
              </button>
            </ul>
          </div>
        </div>

        {/* Deuxième content  */}
        <div className="container-fluid">
          <div className="row mt-3">
            <div
              className="col-4 border border-1 shadow-sm"
              style={{
                backgroundColor: theme === "light" ? "white" : "black",
                marginLeft: "2px",
              }}
            >
              <h3 className="taux_moyen mb-3">Volume de ventes</h3>
              <SimpleLineChart />
            </div>
            <div className="col-5">
              <div className="row">
                <div
                  className="col shadow-sm border border-1 mx-2"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                  }}
                >
                  <div className="row">
                    <img
                      alt=""
                      src={img_revenu_period_1}
                      className="img-fluid col-7"
                    />
                    <div className="col d-flex justify-content-end mt-2">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>

                  <div className="row mt-1">
                    <p
                      className="col-7 petit_titre"
                      style={{ fontSize: "14px" }}
                    >
                      Revenu 2025
                    </p>
                    <span style={{ color: "green" }} className="col-1">
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                    <span
                      style={{ color: "green" }}
                      className="col-2 petit_titre"
                    >
                      +45%
                    </span>
                  </div>

                  <div className="taux_moyen">45 000 FCFA</div>
                </div>
                <div
                  className="mx-2 col shadow-sm border border-1"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                  }}
                >
                  <div className="row mt-2">
                    <img
                      alt=""
                      src={img_revenu_period_2}
                      className="col-6 img-fluid"
                    />
                    <div className="col d-flex justify-content-end">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <p
                      className="col-7 petit_titre"
                      style={{ fontSize: "14px" }}
                    >
                      Profit 2025
                    </p>
                    <span style={{ color: "green" }} className="col-1">
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                    <span
                      style={{ color: "green" }}
                      className="col-2 petit_titre"
                    >
                      78%
                    </span>
                  </div>
                  <div className="taux_moyen">45 000 FCFA</div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col shadow-sm border border-1 m-2"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                  }}
                >
                  <div className="row mt-2">
                    <img
                      alt=""
                      src={img_revenu_period_3}
                      className="col-6 img-fluid"
                    />
                    <div className="col d-flex justify-content-end">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <p
                      className="col-7 petit_titre"
                      style={{ fontSize: "14px" }}
                    >
                      Revenu 2026
                    </p>
                    <span style={{ color: "red" }} className="col-1">
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                    <span
                      style={{ color: "red" }}
                      className="col-2 petit_titre"
                    >
                      -12%
                    </span>
                  </div>
                  <div className="taux_moyen">45 000 FCFA</div>
                </div>
                <div
                  className="m-2 col shadow-sm border border-1"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                  }}
                >
                  <div className="row mt-2">
                    <img
                      alt=""
                      src={img_revenu_period_4}
                      className="img-fluid col-6"
                    />
                    <div className="col d-flex justify-content-end">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <p
                      className="col-7 petit_titre"
                      style={{ fontSize: "14px" }}
                    >
                      Profit 2026
                    </p>
                    <span style={{ color: "green" }} className="col-1">
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                    <span
                      style={{ color: "green" }}
                      className="col-2 petit_titre"
                    >
                      65%
                    </span>
                  </div>

                  <div className="taux_moyen">45 000 FCFA</div>
                </div>
              </div>
            </div>
            <div
              className="mx-1 col shadow-sm border border-1"
              style={{ backgroundColor: theme === "light" ? "white" : "black" }}
            >
              <h3 className="taux_moyen mb-3">Performance bénéficiaire</h3>
              <PieColor className="mt-3" />
              <div className="mt-4">
                {" "}
                <span className="px-3 taux_moyen" style={{ color: "blue" }}>
                  2025
                </span>
                <span className="taux_moyen" style={{ color: "orange" }}>
                  2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Troisième content  */}

        <div className="container-fluid">
          <div className="row mt-3">
            {/* Premier card  */}

            <div
              className="col-4 border border-1 shadow-sm"
              style={{ backgroundColor: theme === "light" ? "white" : "black" }}
            >
              <h3 className="taux_moyen">Taux de conversion</h3>

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
                    <td className="texte_brut">12000</td>
                    <td className="texte_brut">25%</td>
                    <td className="texte_brut">124 000 FCFA</td>
                  </tr>
                  <tr>
                    <th scope="row" className="texte_brut">
                      2026
                    </th>
                    <td className="texte_brut">10000</td>
                    <td className="texte_brut">10%</td>
                    <td className="texte_brut">32 000 FCFA</td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <div className="col-6">
                  <p className="taux_moyen">32.500</p>
                  <p className="petit_titre">Clients réguliers</p>
                  <span style={{ color: "green" }} className="col-1">
                    <FontAwesomeIcon icon={faCaretUp} />
                  </span>
                  <span
                    style={{ color: "green" }}
                    className="col-2 petit_titre"
                  >
                    +65%
                  </span>
                </div>
                <div className="col-6">
                  <p className="taux_moyen">32.500</p>
                  <p className="petit_titre">Nouveaux clients</p>
                  <span style={{ color: "green" }} className="col-1">
                    <FontAwesomeIcon icon={faCaretUp} />
                  </span>
                  <span
                    style={{ color: "green" }}
                    className="col-2 petit_titre"
                  >
                    +65%
                  </span>
                </div>
              </div>
            </div>

            {/* Deuxième card  */}

            <div
              className="col border border-1 shadow-sm"
              style={{
                backgroundColor: theme === "light" ? "white" : "black",
                marginLeft: "1%",
                marginRight: "1%",
              }}
            >
              <div className="taux_moyen">Taux de parrainage moyen</div>
              <div className="petit_titre mt-3">
                Budget du programme de parrainage
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
              <div className="petit_titre mt-3">
                Taux de parrainage par 100 achats
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "50%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  50%
                </div>
              </div>
              <div className="petit_titre mt-3">
                Taux de parrainage par campagne
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "70%" }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  70%
                </div>
              </div>
            </div>

            {/* Troisième card  */}

            <div className="col-3">
              <ul className="list-unstyled">
                <li
                  className="border border-1 shadow-sm col"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                  }}
                >
                  <div className="row">
                    <div className="d-flex align-items-center">
                      <div className="col-4">
                        <img
                          alt="des pièces d'argent"
                          src={silverCoin}
                          className="img-fluid"
                        />
                      </div>
                      <span className="col-4 d-flex justify-content-center texte-brut">
                        Revenus
                      </span>
                      <span className="col-4 d-flex justify-content-center texte-brut">
                        175 FCFA
                      </span>
                    </div>
                  </div>
                </li>
                <li
                  className="border border-1 shadow-sm col mt-2"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                  }}
                >
                  <div className="row">
                    <div className="d-flex align-items-center">
                      <div className="col-4 d-flex justify-content-center">
                        <img
                          alt="une carte de crédit"
                          src={carteCredit}
                          className="img-fluid"
                        />
                      </div>
                      <span className="col-4 d-flex justify-content-center texte-brut">
                        Perte
                      </span>
                      <span className="col-4 d-flex justify-content-center texte-brut">
                        888 FCFA
                      </span>
                    </div>
                  </div>
                </li>
                <li
                  className="border border-1 shadow-sm col mt-2"
                  style={{
                    backgroundColor: theme === "light" ? "white" : "black",
                  }}
                >
                  <div className="row">
                    <div className="d-flex align-items-center">
                      <div className="col-4 d-flex justify-content-center">
                        <img
                          alt="Portefeuille d'argent"
                          src={wallet}
                          className="img-fluid"
                        />
                      </div>
                      <span className="col-5 d-flex justify-content-center texte-brut">
                        Commandes
                      </span>
                      <span className="col-3 d-flex justify-content-center texte-brut">
                        888
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
