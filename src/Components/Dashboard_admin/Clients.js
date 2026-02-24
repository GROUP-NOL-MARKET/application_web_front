import React, { useContext, useEffect, useState } from "react";
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
import { CircularProgress } from "@mui/material";
import API from "../Authentification/apiAdmin";

const Clients = () => {
  const { theme } = useContext(ThemeContext);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchStats = async () => {
      try {
        const response = await API.get("/admin/clients/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // équivalent axios de credentials: "include"
        });

        console.log("Données reçues :", response.data);
        setStats(response.data);
      } catch (err) {
        console.error(
          "Erreur de chargement :",
          err.response?.data?.message || err.message
        );
      }
    };

    if (token) fetchStats();
  }, []);

  return (
    <div className="">
      {/* Entete */}
      <Entete title="Clients" />

      {!stats ? (
        <div className="text-center my-5">
          <CircularProgress />
        </div>
      ) : (
        <div>
          {/* Premier content */}

          <div className="">
            x
            <div className="row mt-4">
              {/* Tous les clients */}
              <div
                className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                }}
              >
                <img alt="" src={avis_dashboard_1} className="img-fluid w-50" />
                <h5 className="petit_titre fw-bold">{stats.total_clients}</h5>
                <h5 className="petit_titre">Tous les clients</h5>
              </div>

              {/* Nouveaux clients */}
              <div
                className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                }}
              >
                <img alt="" src={avis_dashboard_2} className="img-fluid w-50" />
                <h5 className="petit_titre fw-bold">{stats.new_clients}</h5>
                <h5 className="petit_titre">Nouveaux clients</h5>
              </div>

              {/* Clients réguliers */}
              <div
                className="col-2 me-2 shadow-sm border border-1 d-flex flex-column align-items-center justify-content-center"
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                }}
              >
                <img className="img-fluid w-50" src={avis_dashboard_3} alt="" />
                <h5 className="petit_titre fw-bold">{stats.regular_clients}</h5>
                <h5 className="petit_titre">Clients réguliers</h5>
              </div>

              {/* Taux de conversion */}
              <div className="col shadow-sm border border-1">
                <h5 className="taux_moyen">Taux de conversion</h5>
                <div className="row">
                  <div className="col-8">
                    <table className="table">
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
                        {stats.conversion_rate.map((item, index) => (
                          <tr key={index}>
                            <th scope="row" className="texte_brut">
                              {item.year}
                            </th>
                            <td className="texte_brut">{item.clients}</td>
                            <td className="texte_brut">{item.percent}%</td>
                            <td className="texte_brut">{item.revenue} FCFA</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-6">
                        <p className="texte_brut fw-bold">
                          {stats.regular_clients}
                        </p>
                        <p className="texte_brut">Réguliers</p>
                        <span style={{ color: "green" }}>
                          <FontAwesomeIcon icon={faCaretUp} /> +
                          {stats.loyalty_rate.frequent}%
                        </span>
                      </div>
                      <div className="col-6">
                        <p className="texte_brut fw-bold">
                          {stats.new_clients}
                        </p>
                        <p className="texte_brut">Nouveaux</p>
                        <span style={{ color: "green" }}>
                          <FontAwesomeIcon icon={faCaretUp} /> +
                          {stats.loyalty_rate.new}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deuxième content */}
          <div className="">
            <div className="row mt-4">
              {/* Graphique fidélisation */}
              <div
                className="col-8 me-2 shadow-sm border border-1 p-2"
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                }}
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
                      Clients total - {stats.total_clients}
                    </h5>
                    <p className="texte_brut" style={{ textAlign: "justify" }}>
                      Plus de {stats.total_clients} clients nous font déjà
                      confiance...
                    </p>

                    <div className="row">
                      <div className="col-1">
                        <FontAwesomeIcon
                          icon={faCircle}
                          style={{ color: "black" }}
                        />
                      </div>
                      <p className="col petit_titre fw-bold">
                        Nouveaux clients - {stats.loyalty_rate.new}%
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
                        Clients fréquents - {stats.loyalty_rate.frequent}%
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-1">
                        <FontAwesomeIcon
                          icon={faCircle}
                          style={{ color: "red" }}
                        />
                      </div>
                      <p className="col petit_titre fw-bold">
                        Clients inactifs - {stats.loyalty_rate.inactive}%
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
                        Panier abandonné - {stats.loyalty_rate.abandoned}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segmentation démographique */}
              <div
                className="col shadow-sm border border-1 p-2"
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                }}
              >
                <h5 className="petit_titre fw-bold">
                  Segmentation démographique
                </h5>
                {stats.age_segments.map((seg, index) => (
                  <div key={index} className="d-flex flex-column mt-2">
                    <div className="row">
                      <h5 className="col-6 texte_brut">Âge {seg.range}</h5>
                      <h5 className="col d-flex justify-content-end texte_brut">
                        {seg.count}
                      </h5>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${seg.percent}%` }}
                        aria-valuenow={seg.percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {seg.percent}%
                      </div>
                    </div>
                  </div>
                ))}

                <h5 className="petit_titre fw-bold mt-4">
                  Segmentation par genre
                </h5>
                <ul className="list-unstyled d-flex flex-row">
                  <li className="d-flex flex-column col-4">
                    <div className="bg-light">
                      <FontAwesomeIcon icon={faMars} />
                    </div>
                    <h5 className="petit_titre">{stats.gender.male}%</h5>
                  </li>
                  <li className="d-flex flex-column col-4">
                    <div className="bg-light">
                      <FontAwesomeIcon icon={faVenus} />
                    </div>
                    <h5 className="petit_titre">{stats.gender.female}%</h5>
                  </li>
                  <li className="d-flex flex-column col-4">
                    <div className="bg-light">
                      <FontAwesomeIcon icon={faCircle} />
                    </div>
                    <h5 className="petit_titre">{stats.gender.other}%</h5>
                  </li>
                </ul>

                <p
                  className="texte_brut d-flex mt-4"
                  style={{ textAlign: "justify" }}
                >
                  Notre site accueille une population variée d’utilisateurs
                  répartis sur plusieurs régions et profils...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
