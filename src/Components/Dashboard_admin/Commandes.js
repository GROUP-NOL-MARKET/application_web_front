import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Entete from "./dataset/Entete";
import SellPeriod from "./dataset/SellPeriod";
import Dropdown from "./dataset/Dropdown";
import { ThemeContext } from "./ThemeContext";
import orders_completed from "../assets/Images/orders_completed.png";
import orders_confirmed from "../assets/Images/orders_confirmed.png";
import orders_deleted from "../assets/Images/orders_deleted.png";
import orders_found from "../assets/Images/orders_found.png";

const Commandes = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="container-fluid">
      {/* En-tête  */}

      <Entete title="Commandes" />

      {/* Premier content  */}
      <div className="container-fluid">
        <div className="row mt-3">
          <SellPeriod className="col-6" />
          <div className="offset-3 col">
            <h5 className="texte_brut">Commandes vues : 5/100</h5>
            <div className="row">
              <div className="col-6 me-2">
                <Dropdown type="Catégories de produit" />
              </div>
              <div className="col">
                <Dropdown type="Trier par : Meilleurs ventes" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième content  */}

      <div className="container-fluid">
        <div className="row mt-3">
          <div
            className="col-4 me-2 shadow-sm border border-1 p-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <h5 className="taux_moyen">Taux moyen (en %)</h5>
            <p className="p-0 mb-1 m-0 petit_titre">Vues des produits</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "75%" }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                75%
              </div>
            </div>
            <p className="p-0 m-0 mb-1 petit_titre mt-2">
              Taux d'abandon du panier{" "}
            </p>
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
          <div
            className="shadow-sm border border-1 col-2 me-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row mt-2 ">
              <div className="col">
                <img
                  src={orders_completed}
                  alt=" "
                  className="w-auto"
                  style={{ height: "50px" }}
                />
              </div>
              <div className="col-3">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
            <div className="mt-2">
              <h5 className="petit_titre">Commandes effectuées</h5>
              <h5 className="taux_moyen"> 225</h5>
            </div>
          </div>
          <div
            className="shadow-sm border border-1 col-2 me-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row mt-2">
              <div className="col">
                <img
                  src={orders_confirmed}
                  alt=" "
                  className="w-auto"
                  style={{ height: "50px" }}
                />
              </div>
              <div className="col-3 ">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
            <div className="mt-2">
              <h5 className="petit_titre">Commandes effectuées</h5>
              <h5 className="taux_moyen"> 225</h5>
            </div>
          </div>
          <div
            className="shadow-sm border border-1 col-2 me-2"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row mt-2">
              <div className="col">
                <img
                  src={orders_deleted}
                  alt=" "
                  className="w-auto"
                  style={{ height: "50px" }}
                />
              </div>
              <div className="col-3">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
            <div className="mt-2">
              <h5 className="petit_titre">Commandes effectuées</h5>
              <h5 className="taux_moyen"> 225</h5>
            </div>
          </div>
          <div
            className="shadow-sm border border-1 col"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row mt-2">
              <div className="col">
                <img
                  src={orders_found}
                  alt=" "
                  className="w-auto"
                  style={{ height: "50px" }}
                />
              </div>
              <div className="col-3">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
            <div className="mt-2">
              <h5 className="petit_titre">Commandes effectuées</h5>
              <h5 className="taux_moyen"> 225</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Troisième content  */}

      <div className="mt-3">
        <div
          className="shadow-sm border border-1 col"
          style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
        >
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#id</th>
                <th scope="col">Produit</th>
                <th scope="col">Catégories</th>
                <th scope="col">Paiement</th>
                <th scope="col">Statut</th>
                <th scope="col">Paiement</th>
                <th scope="col">Notation</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>Otto</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Thornton</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Commandes;
