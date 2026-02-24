import React, { useContext, useState } from "react";
import Entete from "./dataset/Entete";
import { ThemeContext } from "./ThemeContext";
import img_statistiques_ville from "../assets/Images/img_statistiques_ville.webp";
import img_revenu_period_4 from "../assets/Images/img_revenu_period_4.webp";
import FooterDashboard from "./dataset/FooterDashboard";

const Statistiques = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="">
      {/* En-tête  */}

      <Entete title="Statistiques" />

      {/* content  */}

      <div
        className="shadow-sm border border-1 p-4 mt-3"
        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
      >
        <div className="row">
          <div className="col-5 me-2">
            <h5 className="taux_moyen">Statistiques de revenu général</h5>
            <table className="table mt-2">
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
              <div className="col-2 me-2">
                <img className="img-fluid" src={img_revenu_period_4} alt=" " />
              </div>
              <div className="col">
                <h5 className="taux_moyen m-0 ^p-0">250 000 FCFA</h5>
                <h className="petit_titre m-0 p-0 mt-1">Revenu total</h>
              </div>
              <div className="mt-3">
                <h5 className="taux_moyen">Niveau de revenu par ville</h5>

                <div>
                  <div className="row mt-2">
                    <h5 className="col-3 petit_titre my-0 py-0">Cotonou</h5>
                    <h5 className="col petit_titre d-flex justify-content-end my-0 py-0">
                      250 000 FCFA
                    </h5>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: "100%",
                        backgroundColor: "blue",
                      }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      100%
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col">
            <img src={img_statistiques_ville} alt=" " className="img-fluid" />
          </div>
        </div>
      </div>

      {/* Footer  */}

      <FooterDashboard />


    </div>
  );
};

export default Statistiques;
