import React, { useContext, useState } from "react";
import Entete from "./dataset/Entete";
import SellPeriod from "./dataset/SellPeriod";
import { ThemeContext } from "./ThemeContext";
import img_PL_dashboard from "../assets/Images/img_PL_dashboard.webp";
import img_electromenager_dashboard from "../assets/Images/img_electromenager_dashboard.webp";
import img_epicerie_dashboard from "../assets/Images/img_epicerie_dashboard.webp";
import img_boissons_dashboard from "../assets/Images/img_boissons_dashboard.webp";
import produits_locaux from "../assets/Images/produits_locaux.avif";
import epicerie from "../assets/Images/epicerie.avif";
import animalerie from "../assets/Images/img_animalerie.webp";
import divers from "../assets/Images/divers.avif";
import produits_frais from "../assets/Images/produits_frais.avif";
import electromenager from "../assets/Images/electromenager.avif";
import droguerie from "../assets/Images/droguerie.avif";
import boisson from "../assets/Images/boisson.avif";
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

  const Categpory = [

    {
      "nom": "Produit Locaux",
      "revenu": 5000,
      "image": produits_locaux,
    },
    {
      "nom": "Droguerie",
      "revenu": 5000,
      "image": droguerie,
    },

    {
      "nom": "Epicerie",
      "revenu": 5000,
      'image': epicerie,
    },

    {
      "nom": "Boissons",
      "revenu": 5000,
      "image": boisson,
    },

    {
      "nom": "Produit Frais",
      "revenu": 5000,
      "image": produits_frais,
    },

    {
      "nom": "Divers",
      "revenu": 5000,
      "image": divers,
    },
    {
      "nom ": "Electroménager",
      "revenu": 5000,
      "image": electromenager,
    },
  ]

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
          {Categpory.slice(0, 6).map((category) => (
            <div
              className="col me-2 d-flex flex-column shadow-sm border border-1"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className=" ">
                <img
                  src={category.image}
                  alt=""
                  className="img-fluid mt-2"
                // style={{ height: "150px" }}
                />
              </div>

              <h5 className="petit_titre" style={{ hyphens: "auto" }}>{category.nom}</h5>
              <h5 className="petit_titre">Revenu :</h5>

              <p className="taux_moyen">{category.revenu} FCFA</p>
            </div>
          ))}
        </div>
      </div>

      {/* Troisième content  */}

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-6">
            <div className="row mb-2">
              <img className="img-fluid col-2" src={img_PL_dashboard} alt=" " />
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
                    readOnly
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
                className="img-fluid col-2"
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
                    readOnly
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
                className="img-fluid col-2"
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
                    readOnly
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
                className="img-fluid col-2"
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
                    readOnly
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
                className="img-fluid col-2"
                src={img_boissons_dashboard}
                alt=" "
              />
              <h4 className="taux_moyen col-10 d-flex align-items-center">
                Droguerie
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
                    readOnly
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
                className="img-fluid col-2"
                src={img_boissons_dashboard}
                alt=" "
              />
              <h4 className="taux_moyen col-10 d-flex align-items-center">
                Produits Frais
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
                    readOnly
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
