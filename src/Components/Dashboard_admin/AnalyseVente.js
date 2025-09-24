import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import img_entreprise_dashboard from "../assets/Images/img_entreprise_dashboard.png";
import img_finance from "../assets/Images/img_finance.png";
import { BarChart } from "@mui/x-charts/BarChart";
import { dataset, valueFormatter } from "./dataset/weather";
import "../../Styles/AdminDashbord/appDashboard.css";
import revenu from "../assets/Images/icone/revenu.png";
import transaction from "../assets/Images/icone/transaction.png";
import traits from "../assets/Images/icone/traits.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faArrowDown,
  faHandshake,
  faCaretDown,
  faCaretUp,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import wallet from "../assets/Images/wallet.png";
import silverCoin from "../assets/Images/silver_coin.png";
import carteCredit from "../assets/Images/carte_credit.png";
import Entete from "./dataset/Entete";

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
      width: 60,
    },
  ],
  height: 300,
};

const AnalyseVente = () => {
  const { theme } = useContext(ThemeContext);


  return (
    <div>
      <div className="container-fluid">
        {/* En-tête  */}

        <Entete title="Analyse des ventes" />

        {/* Premier content  */}
        <div className="container-fluid">
          <div className="row mt-3">
            <div
              className="col-7 shadow-sm border border-1"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className="row">
                <div className="col-3 d-flex align-items-center bg-light">
                  <img
                    src={img_entreprise_dashboard}
                    alt="logo de l'entreprise"
                    className="img-fluid col"
                  />
                </div>
                <div className="col-9">
                  <h2 className="name_entreprise_dashboard my-2">
                    Nol Market - Détails
                  </h2>
                  <h3 className="taux_moyen">Taux moyen 2025</h3>
                  <ul className="row list-unstyled mt-3">
                    <li className="col-4 ">
                      <div className="d-flex flex-column">
                        <span
                          className="petit_titre"
                          style={{ color: "green" }}
                        >
                          <img
                            alt="logo pour les revenus"
                            src={revenu}
                            className="img-fluid col-2"
                          />
                          Revenus
                        </span>
                        <p className="petit_titre my-2">
                          888 FCFA
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="px-2"
                            style={{ color: "green" }}
                          />
                        </p>
                      </div>
                    </li>
                    <li className="col-4">
                      <div className="d-flex flex-column">
                        <span className="petit_titre" style={{ color: "red" }}>
                          <img
                            src={transaction}
                            alt="logo de transaction"
                            className="img-fluid col-2"
                          />
                          Pertes
                        </span>
                        <p className="petit_titre my-2">
                          888 FCFA
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            style={{ color: "red", paddingLeft: "4px" }}
                          />
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            style={{ color: "red" }}
                          />
                        </p>
                      </div>
                    </li>
                    <li className="col-4">
                      <div className="d-flex flex-column">
                        <span className="petit_titre" style={{ color: "blue" }}>
                          <img
                            src={traits}
                            alt="Logo de commandes"
                            className="img-fluid col-2"
                          />
                          Commandes
                        </span>
                        <p className="petit_titre my-2">
                          888
                          <FontAwesomeIcon
                            icon={faHandshake}
                            style={{ color: "blue" }}
                            className="px-2"
                          />
                        </p>
                        <div></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="mx-4 col w-100  shadow-sm border border-1"
              style={{
                backgroundColor: theme === "dark" ? "black" : "#f7feff",
              }}
            >
              <div className="row">
                <div className="col-6">
                  <img
                    src={img_finance}
                    alt="illustration par un logo de finance"
                    className="img-fluid"
                  />
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <div className="row">
                    <h5 className="taux_moyen">Revenu total</h5>
                    <h6 className="taux_moyen">800 000 FCFA</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deuxième content  */}
        <div className="container-fluid">
          <div className="row mt-3">
            <div
              className="col-7 shadow-sm border border-1"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div>
                <h2
                  className="taux_moyen"
                >
                  Statistiques Vente 2025
                </h2>
                <BarChart
                  dataset={dataset}
                  xAxis={[{ dataKey: "month" }]}
                  series={[
                    { dataKey: "london", label: "London", valueFormatter },
                    { dataKey: "paris", label: "Paris", valueFormatter },
                    { dataKey: "newYork", label: "New York", valueFormatter },
                    { dataKey: "seoul", label: "Seoul", valueFormatter },
                  ]}
                  {...chartSetting}
                />
              </div>
            </div>
            <div
              className="mx-4 col  shadow-sm border border-1"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <h5 className="taux_moyen">Liste de revenus</h5>
              <ul className="list-unstyled">
                <li className="petit_titre row">
                  <div className="d-flex align-items-center">
                    <div className="col-3">
                      <img
                        alt="des pièces d'argent"
                        src={silverCoin}
                        className="img-fluid"
                      />
                    </div>
                    <span className="col-3 d-flex justify-content-center">
                      Revenus
                    </span>
                    <span className="col-3 d-flex justify-content-center">
                      888 FCFA
                    </span>
                    <span
                      className="col-1 d-flex justify-content-center"
                      style={{ color: "green" }}
                    >
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                    <span
                      className="col-2 d-flex justify-content-center"
                      style={{ color: "green" }}
                    >
                      45%
                    </span>
                  </div>
                </li>
                <li className="petit_titre row">
                  <div className="d-flex align-items-center">
                    <div className="col-3 d-flex justify-content-center">
                      <img
                        alt="une carte de crédit"
                        src={carteCredit}
                        className="img-fluid"
                      />
                    </div>
                    <span className="col-3 d-flex justify-content-center">
                      Perte
                    </span>
                    <span className="col-3 d-flex justify-content-center">
                      888 FCFA
                    </span>
                    <span
                      className="col-1 d-flex justify-content-center"
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                    <span
                      className="col-2 d-flex justify-content-center"
                      style={{ color: "red" }}
                    >
                      10 %
                    </span>
                  </div>
                </li>
                <li className="petit_titre row">
                  <div className="d-flex align-items-center">
                    <div className="col-3 d-flex justify-content-center">
                      <img
                        alt="Portefeuille d'argent"
                        src={wallet}
                        className="img-fluid"
                      />
                    </div>
                    <span className="col-3 d-flex justify-content-center">
                      {" "}
                      Commandes
                    </span>
                    <span className="col-3 d-flex justify-content-center">
                      888
                    </span>
                    <span
                      className="col-1 d-flex justify-content-center"
                      style={{ color: "blue" }}
                    >
                      <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span
                      className="col-2 d-flex justify-content-center"
                      style={{ color: "blue" }}
                    >
                      25 %
                    </span>
                  </div>
                </li>
              </ul>
              <Button
                className="col d-flex align-items-center mb-2 w-100"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  borderRadius: "25px",
                }}
              >
                Voir plus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyseVente;
