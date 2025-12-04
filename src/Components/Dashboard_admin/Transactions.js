// Code React complet mis à jour : pagination backend + tri asc + filtre par date connecté à SellPeriod

import React, { useContext, useEffect, useState } from "react";
import Entete from "./dataset/Entete";
import SellPeriod from "./dataset/SellPeriod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./dataset/Dropdown";
import { ThemeContext } from "./ThemeContext";
import FooterDashboard from "./dataset/FooterDashboard";
import API from "../Authentification/apiAdmin";

const Transactions = () => {
  const { theme } = useContext(ThemeContext);

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const [dateRange, setDateRange] = useState([null, null]);

  const fetchPayments = async () => {
    try {
      const response = await API.get("/admin/payments", {
        params: {
          page,
          sort,
          start_date: dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : null,
          end_date: dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : null,
        },
      });

      setTransactions(response.data.data);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Erreur chargement paiements", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page, sort, dateRange]);

  return (
    <div className="container-fluid">
      <Entete title="Transactions" />

      <div className="row mt-3">
        <div className="col-4">
          <SellPeriod text="Intervalle date de transaction" setDateRange={setDateRange} />
        </div>

        <div className="offset-5 col d-flex flex-column justify-content-end">
          <h5 className="texte_brut fw-bold text-end">
            Transactions vues : {transactions.length}/100
          </h5>
          <Dropdown
            type="Trier par: "
            dropdown_item_1="Croissant"
            onClick={() => setSort("asc")}
          />
        </div>
      </div>

      <div
        className="border border-1 shadow-sm pt-2 mt-4"
        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th className="col-2 text-center petit_titre fw-bold">Date & Heure</th>
              <th className="col-3 text-center petit_titre fw-bold">Numéro de téléphone</th>
              <th className="col-1 text-center petit_titre fw-bold">Méthode</th>
              <th className="col-2 text-center petit_titre fw-bold">Statut</th>
              <th className="col-2 text-center petit_titre fw-bold">Montant</th>
              <th className="col-1 text-center petit_titre fw-bold">Devise</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((p, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <span className="texte_brut" style={{ color: "blue" }}>
                      <FontAwesomeIcon icon={faClock} /> {p.created_at.substring(0, 10)}
                    </span>
                    <p className="texte_brut">à {p.created_at.substring(11, 16)}</p>
                  </div>
                </td>
                <td className="text-center texte_brut">{p.phone}</td>
                <td className="text-center texte_brut">{p.method}</td>
                <td className="text-center texte_brut">
                  <div
                    className="border border-1 rounded-5 px-2"
                    style={{
                      backgroundColor:
                        p.status === "validee"
                          ? "green"
                          : p.status === "en cours"
                            ? "orange"
                            : p.status === "livree"
                              ? "green"
                              : p.status === "annulé"
                                ? "black"
                                : "red",
                      color: "white",
                    }}
                  >
                    {p.status}
                  </div>
                </td>
                <td className="text-center texte_brut">{p.amount}</td>
                <td className="text-center texte_brut">FCFA</td>
                <td className="text-center texte_brut">{p.tax}</td>
                <td className="text-center texte_brut">{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Pagination" className="mt-2">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>&laquo;</button>
          </li>

          {[...Array(lastPage)].map((_, i) => (
            <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === lastPage ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>&raquo;</button>
          </li>
        </ul>
      </nav>

      <FooterDashboard />
    </div>
  );
};

export default Transactions;
