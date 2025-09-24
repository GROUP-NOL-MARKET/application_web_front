import React, { useContext, useState } from "react";
import Entete from "./dataset/Entete";
import img_electromenager_dashboard from "../assets/Images/img_electromenager_dashboard.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "./ThemeContext";
import { DUMMY_PRODUCTS } from "../Product_Data";
import { Button } from "@mui/material";

const ProductGrid = () => {
  const { theme } = useContext(ThemeContext);
  const [dropActive, setDropActive] = useState("Nom");
  return (
    <div className="container-fluid">
      {/* En-tête  */}

      <Entete title="Grille des produits" />

      {/* Premier content  */}
      <div className="container-fluid">
        <div className="row mt-3">
          <div
            className="col-3 shadow-sm border border-1 p-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row">
              <img
                src={img_electromenager_dashboard}
                alt=" "
                className="col img-fluid"
              />
              <p className="col-9 d-flex align-items-center">Electroménager</p>
            </div>
          </div>
          <div className="offset-4 col mt-3">
            <div className="row">
              <div
                className="shadow-sm border border-1 me-2 col-6 d-flex align-items-center"
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                }}
              >
                <div className="dropdown" style={{ cursor: "pointer" }}>
                  <span
                    className="dropdown-toggle"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Catégories de produits
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li className="dropdown-item">Electroménager</li>
                    <li
                      className="dropdown-item"
                      onClick={() => setDropActive("Nom")}
                    >
                      Produits Locaux
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setDropActive("Pires ventes")}
                    >
                      Produits Frais
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setDropActive("Pires ventes")}
                    >
                      Epicerie
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setDropActive("Pires ventes")}
                    >
                      Droguerie
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setDropActive("Pires ventes")}
                    >
                      Divers
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setDropActive("Pires ventes")}
                    >
                      Boissons
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="shadow-sm border border-1 col p-1 d-flex align-items-center"
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                }}
              >
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
        </div>
      </div>

      {/* Deuxième content  */}
      <div className="container-fluid">
        <div className="row mt-4">
          {DUMMY_PRODUCTS.map((product) => (
            <div
              className="col-2 me-2 shadow-sm border border-1 pb-2"
              style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
            >
              <div className="row">
                <div className="col-10">
                  <img
                    src={product.image}
                    alt=" "
                    className="img-fluid"
                    style={{ height: "120px" }}
                  />
                </div>
                <div className="col-1 mt-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
              <h5 className="taux_moyen fw-normal mt-2">{product.name} </h5>
              <p className="texte_brut p-0 m-0 mt-1">
                Prix fixe : {product.price} F
              </p>
              <p className="texte_brut p-0 m-0 mt-1">
                Prix de vente : {product.sell_price} F
              </p>
              <p className="texte_brut p-0 m-0 mt-1" style={{ color: "green" }}>
                Disponible :{product.disponibilité}{" "}
              </p>
              <p className="texte_brut p-0 m-0 mt-1" style={{ color: "blue" }}>
                Vendu: {product.selled}{" "}
              </p>
              <div className="row mt-2">
                <button
                  className="col me-2 texte_brut"
                  style={{
                    borderRadius: "15px",
                    borderColor: "blue",
                    color: "blue",
                  }}
                >
                  Modifier
                </button>
                <button
                  className="col-6 texte_brut"
                  style={{
                    borderRadius: "15px",
                    borderColor: "red",
                    color: "red",
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default ProductGrid;
