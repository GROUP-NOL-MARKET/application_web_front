import React, { useContext } from "react";
import Entete from "./dataset/Entete";
import SellPeriod from "./dataset/SellPeriod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./dataset/Dropdown";
import { ThemeContext } from "./ThemeContext";
import { transactions } from "../Product_Data";
import FooterDashboard from "./dataset/FooterDashboard";

const Transactions = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="container-fluid">
      {/* En-tête  */}

      <Entete title="Transactions" />

      {/* Premier content  */}

      <div className="row mt-3">
        <div className="col-4">
          <SellPeriod text="Intervalle date de transaction" />
        </div>

        <div className="offset-5 col d-flex flex-column justify-content-end">
          <h5 className="texte_brut fw-bold text-end">
            Transactions vues : 6/100
          </h5>
          <Dropdown type="Trier par: " dropdown_item_1="Meilleurs ventes" />
        </div>
      </div>

      {/* Deuxième content  */}

      <div
        className="border border-1 shadow-sm pt-2 mt-4"
        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col" className="col-2 text-center petit_titre fw-bold">
                Date & Heure
              </th>
              <th scope="col" className="col-2 text-center petit_titre fw-bold">
                Profil
              </th>
              <th scope="col" className="col-2 text-center petit_titre fw-bold">
                Méthode
              </th>
              <th scope="col" className="col-2 text-center petit_titre fw-bold">
                Statut
              </th>
              <th scope="col" className="col-1 text-center petit_titre fw-bold">
                Montant
              </th>
              <th scope="col" className="col-1 text-center petit_titre fw-bold">
                Devise
              </th>
               <th scope="col" className="col-1 text-center petit_titre fw-bold">
                Taxe
              </th>
              <th scope="col" className="col-1 text-center petit_titre fw-bold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span className="texte_brut" style={{ color: "blue" }}>
                      <FontAwesomeIcon icon={faClock} /> {transaction.date}
                    </span>
                    <p className="texte_brut ">à {transaction.heure}</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="row">
                      <img
                        alt=""
                        src={transaction.img}
                        className="img-fluid col-4"
                      />
                      <h5 className="col texte_brut">{transaction.name}</h5>
                    </div>
                  </div>
                </td>
                <td className="text-center texte_brut">
                  <div>{transaction.method} </div>
                </td>
                <td className="text-center texte_brut ">
                  <div
                    className="border border-1 rounded-5"
                    style={{
                      backgroundColor:
                        transaction.status === "approuvé"
                          ? "green"
                          : transaction.status === "en attente"
                          ? "orange"
                          : transaction.status === "annulé"
                          ? "black"
                          : "red",
                      color: "white",
                    }}
                  >
                    {transaction.status}{" "}
                  </div>
                </td>
                <td className="text-center texte_brut">
                  <div>{transaction.montant} </div>
                </td>
                <td className="text-center texte_brut">
                  <div>{transaction.devise} </div>
                </td>
                <td className="text-center texte_brut">
                  <div>{transaction.Taxe} </div>
                </td>
                <td className="text-center texte_brut">
                  <div>{transaction.Total} </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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


      {/* Footer  */}

      <FooterDashboard/>
    </div>
  );
};

export default Transactions;
