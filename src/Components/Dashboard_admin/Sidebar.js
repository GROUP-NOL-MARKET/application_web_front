import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import commande from "../assets/Images/icone/livraison-de-la-commande.png";
import Avatar from "@mui/material/Avatar";
import parametre from "../assets/Images/icone/parametres-cog.png";
import transaction from "../assets/Images/icone/transaction.png";
import client from "../assets/Images/icone/client.png";
import avis from "../assets/Images/icone/etoiles-de-notation.png";
import statistique from "../assets/Images/icone/statistique.png";
import revenu from "../assets/Images/icone/revenu.png";
import profil from "../assets/Images/icone/vendeur.png";
import analyse from "../assets/Images/icone/analytique.png";
import accueil from "../assets/Images/icone/accueil.png";
import img_profil from "../assets/Images/img_profil.webp";
import add_product from "../assets/Images/icone/ajouter-un-produit.png";
import meilleur_produit from "../assets/Images/icone/meilleur.png";
import product_management from "../assets/Images/icone/traits.png";
import produits from "../assets/Images/icone/produit.png";
import produit from "../assets/Images/icone/livraison-de-la-commande.png";
import "../../Styles/AdminDashbord/sidebar.css";
import { ThemeContext } from "./ThemeContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <aside
      className={`${theme === "dark" ? "sidebar-dark" : "sidebar-light"
        } d-flex flex-column p-3 shadow-sm border border-1 border-right`}
      style={{ minWidth: "275px", maxWidth: "275px", minHeight: "100vh" }}
    >
      <a
        href="/admin"
        className="d-flex align-items-center justify-content-center mb-3 mb-md-0  text-decoration-none"
      >
        <span className="fs-4">
          <Avatar
            src={img_profil}
            alt=""
            style={{
              width: "100px",
              height: "100px",
              border: "2px solid #FA7F1B",
            }}
          />
        </span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-3">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <div
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <span>
                    <img
                      src={accueil}
                      alt="icône d'accueil"
                      className="col-1 me-2 img"
                    />
                    Tableau de bord
                  </span>
                </div>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <NavLink
                    to="/admin/analyticSell"
                    end
                    className={({ isActive }) =>
                      "nav-link text-truncate " +
                      (isActive ? "active" : "text-dark")
                    }
                  >
                    <span>
                      <img
                        src={analyse}
                        alt="icône d'analyse des ventes'"
                        className="col-1 me-2 img"
                      />
                      Analyse des ventes
                    </span>
                  </NavLink>
                  <NavLink
                    to="/admin/profilSeller"
                    end
                    className={({ isActive }) =>
                      "nav-link text-truncate " +
                      (isActive ? "active" : "text-dark")
                    }
                  >
                    <span>
                      <img
                        src={profil}
                        alt="icône de profil vendeur"
                        className="col-1 me-2 img"
                      />
                      Profil vendeurs
                    </span>
                  </NavLink>
                  <NavLink
                    to="/admin/revenue"
                    end
                    className={({ isActive }) =>
                      "nav-link text-truncate " +
                      (isActive ? "active" : "text-dark")
                    }
                  >
                    <span>
                      <img
                        src={revenu}
                        alt="icône des revenus par période"
                        className="col-1 me-2 img"
                      />
                      Revenus par période
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <div
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  <span>
                    <img
                      src={produit}
                      alt="icône de produit"
                      className="col-1 me-2 img"
                    />
                    Produits
                  </span>
                </div>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <NavLink
                    to="/admin/bestProduct"
                    end
                    className={({ isActive }) =>
                      "nav-link text-truncate " +
                      (isActive ? "active" : "text-dark")
                    }
                  >
                    <span>
                      <img
                        src={meilleur_produit}
                        alt="icône de meilleur produit"
                        className="col-1 me-2 img"
                      />
                      Meilleurs produits
                    </span>
                  </NavLink>
                  <NavLink
                    to="/admin/productGrid"
                    end
                    className={({ isActive }) =>
                      "nav-link text-truncate " +
                      (isActive ? "active" : "text-dark")
                    }
                  >
                    <span>
                      <img
                        src={produits}
                        alt="icône des produits"
                        className="col-1 me-2 img"
                      />
                      Grille de produits
                    </span>
                  </NavLink>
                  <NavLink
                    to="/admin/productManagement"
                    end
                    className={({ isActive }) =>
                      "nav-link text-truncate " +
                      (isActive ? "active" : "text-dark")
                    }
                  >
                    <span>
                      <img
                        src={product_management}
                        alt="icône de gestion des produits"
                        className="col-1 me-2 img"
                      />
                      Gestion des produits
                    </span>
                  </NavLink>
                  <NavLink
                    to="/admin/addProduct"
                    end
                    className={({ isActive }) =>
                      "nav-link text-truncate " +
                      (isActive ? "active" : "text-dark")
                    }
                  >
                    <span>
                      <img
                        src={add_product}
                        alt="icône d'ajout de produit"
                        className="col-1 me-2 img"
                      />
                      Nouveau produit
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <NavLink
            to="/admin/commandes"
            className={({ isActive }) =>
              "nav-link text-truncate " + (isActive ? "active" : "text-dark")
            }
          >
            <span>
              <img
                src={commande}
                alt="icône de commande"
                className="col-1 me-2 img"
              />
              Commandes
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/statistiques"
            className={({ isActive }) =>
              "nav-link text-truncate " + (isActive ? "active" : "text-dark")
            }
          >
            <span>
              <img
                src={statistique}
                alt="icône des statistiques"
                className="col-1 me-2 img"
              />
              Statistiques
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/avis"
            className={({ isActive }) =>
              "nav-link text-truncate " + (isActive ? "active" : "text-dark")
            }
          >
            <span>
              <img src={avis} alt="icône des avis" className="col-1 me-2 img" />
              Avis
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) =>
              "nav-link text-truncate " + (isActive ? "active" : "text-dark")
            }
          >
            <span>
              <img
                src={client}
                alt="icône de clients"
                className="col-1 me-2 img"
              />
              Clients
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/transactions"
            className={({ isActive }) =>
              "nav-link text-truncate " + (isActive ? "active" : "text-dark")
            }
          >
            <span>
              <img
                src={transaction}
                alt="icône de transaction"
                className="col-1 me-2 img"
              />
              Transactions
            </span>
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to="/admin/paramètres"
            className={({ isActive }) =>
              "nav-link text-truncate " + (isActive ? "active" : "text-dark")
            }
          >
            <span>
              <img
                src={parametre}
                alt="icône des paramètres"
                className="col-1 me-2 img"
              />
              Paramètres
            </span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
