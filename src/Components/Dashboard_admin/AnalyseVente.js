import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "./ThemeContext";
import API from "../Authentification/apiAdmin";
import { toast } from "react-toastify";
import img_entreprise_dashboard from "../assets/Images/img_entreprise_dashboard.webp";
import img_finance from "../assets/Images/img_finance.webp";
import { BarChart } from "@mui/x-charts/BarChart";
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
import { Button, CircularProgress } from "@mui/material";
import wallet from "../assets/Images/wallet.webp";
import silverCoin from "../assets/Images/silver_coin.webp";
import carteCredit from "../assets/Images/carte_credit.webp";
import Entete from "./dataset/Entete";

const AnalyseVente = () => {
  const { theme } = useContext(ThemeContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDark = theme === "dark";

  // AbortController — annule proprement la requête si le composant démonte
  const abortRef = useRef(null);

  useEffect(() => {
    abortRef.current = new AbortController();

    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats", {
          signal: abortRef.current.signal, // lier la requête au controller
        });
        setStats(res.data);
      } catch (error) {
        // Ignore l'erreur si c'est juste un abort (démontage du composant)
        if (error.code === "ECONNABORTED" || error.name === "CanceledError" || error.name === "AbortError") {
          return;
        }
        console.error(error);
        toast.error("Erreur lors du chargement des statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Nettoyage — annuler la requête si le composant démonte
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // chartData protégé — utiliser la variable, pas .map() inline dans le JSX
  const chartData =
    Array.isArray(stats?.ventes_mensuelles) && stats.ventes_mensuelles.length > 0
      ? stats.ventes_mensuelles.map((v) => ({
        month: `Mois ${v.mois}`,
        total: Number(v.total) || 0,
      }))
      : [{ month: "-", total: 0 }];

  return (
    <div>
      <Entete title="Analyse des ventes" />

      {loading ? (
        <div className="text-center my-5">
          <CircularProgress />
        </div>
      ) : (
        <div>
          {/* ── Premier bloc ── */}
          <div className="row mt-3">
            <div
              className="col-7 shadow-sm border border-1"
              style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black" }}
            >
              <div className="row">
                <div className="col-3 d-flex align-items-center bg-light">
                  <img src={img_entreprise_dashboard} alt="logo entreprise" className="img-fluid" />
                </div>
                <div className="col-9">
                  <h2 className="name_entreprise_dashboard my-2">Nol Market - Détails</h2>
                  <h3 className="taux_moyen">Taux moyen 2025</h3>
                  <ul className="row list-unstyled mt-3">
                    <li className="col-4">
                      <div className="d-flex flex-column">
                        <span className="petit_titre" style={{ color: "green" }}>
                          <img src={revenu} alt="revenus" className="img-fluid col-2" />
                          Revenus
                        </span>
                        <p className="petit_titre my-2">
                          {stats?.revenus ?? 0} FCFA
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="px-2" style={{ color: "green" }} />
                        </p>
                      </div>
                    </li>
                    <li className="col-4">
                      <div className="d-flex flex-column">
                        <span className="petit_titre" style={{ color: "red" }}>
                          <img src={transaction} alt="transaction" className="img-fluid col-2" />
                          Remboursés
                        </span>
                        <p className="petit_titre my-2">
                          {stats?.pertes ?? 0} FCFA
                          <FontAwesomeIcon icon={faArrowDown} style={{ color: "red", paddingLeft: "4px" }} />
                          <FontAwesomeIcon icon={faArrowDown} style={{ color: "red" }} />
                        </p>
                      </div>
                    </li>
                    <li className="col-4">
                      <div className="d-flex flex-column">
                        <span className="petit_titre" style={{ color: "blue" }}>
                          <img src={traits} alt="commandes" className="img-fluid col-2" />
                          Commandes
                        </span>
                        <p className="petit_titre my-2">
                          {stats?.commandes ?? 0}
                          <FontAwesomeIcon icon={faHandshake} style={{ color: "blue" }} className="px-2" />
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="mx-4 col shadow-sm border border-1"
              style={{ backgroundColor: isDark ? "black" : "#f7feff", color: isDark ? "white" : "black" }}
            >
              <div className="row">
                <div className="col-6">
                  <img src={img_finance} alt="finance" className="img-fluid" />
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <div>
                    <h5 className="taux_moyen">Revenu total</h5>
                    <h6 className="taux_moyen">{stats?.revenus ?? 0} FCFA</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Deuxième bloc ── */}
          <div className="row mt-3">
            <div
              className="col-7 shadow-sm border border-1"
              style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black" }}
            >
              <h2 className="taux_moyen">Statistiques Vente 2025</h2>

              {/* Utiliser chartData — jamais de .map() directement dans le JSX */}
              <BarChart
                dataset={chartData}
                xAxis={[{ dataKey: "month", scaleType: "band" }]}
                series={[{ dataKey: "total", label: "Ventes (FCFA)" }]}
                height={300}
              />
            </div>

            <div
              className="mx-4 col shadow-sm border border-1"
              style={{ backgroundColor: isDark ? "black" : "white" }}
            >
              <h5 className="taux_moyen">Liste de revenus</h5>
              <ul className="list-unstyled">
                <li className="petit_titre row">
                  <div className="d-flex align-items-center">
                    <div className="col-3">
                      <img src={silverCoin} alt="pièces" className="img-fluid" />
                    </div>
                    <span className="col-3 d-flex justify-content-center">Revenus</span>
                    <span className="col-3 d-flex justify-content-center">{stats?.revenus ?? 0} FCFA</span>
                    <span className="col-1 d-flex justify-content-center" style={{ color: "green" }}>
                      <FontAwesomeIcon icon={faCaretUp} />
                    </span>
                    <span className="col-2 d-flex justify-content-center" style={{ color: "green" }}>45%</span>
                  </div>
                </li>
                <li className="petit_titre row">
                  <div className="d-flex align-items-center">
                    <div className="col-3 d-flex justify-content-center">
                      <img src={carteCredit} alt="carte crédit" className="img-fluid" />
                    </div>
                    <span className="col-3 d-flex justify-content-center">Perte</span>
                    <span className="col-3 d-flex justify-content-center">{stats?.pertes ?? 0} FCFA</span>
                    <span className="col-1 d-flex justify-content-center" style={{ color: "red" }}>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                    <span className="col-2 d-flex justify-content-center" style={{ color: "red" }}>10%</span>
                  </div>
                </li>
                <li className="petit_titre row">
                  <div className="d-flex align-items-center">
                    <div className="col-3 d-flex justify-content-center">
                      <img src={wallet} alt="portefeuille" className="img-fluid" />
                    </div>
                    <span className="col-3 d-flex justify-content-center">Commandes</span>
                    <span className="col-3 d-flex justify-content-center">{stats?.commandes ?? 0}</span>
                    <span className="col-1 d-flex justify-content-center" style={{ color: "blue" }}>
                      <FontAwesomeIcon icon={faCaretRight} />
                    </span>
                    <span className="col-2 d-flex justify-content-center" style={{ color: "blue" }}>25%</span>
                  </div>
                </li>
              </ul>
              <Button
                className="mb-2 w-100"
                style={{ backgroundColor: "blue", color: "white", borderRadius: "25px" }}
              >
                Voir plus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyseVente;