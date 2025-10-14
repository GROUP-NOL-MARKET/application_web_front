import React, { useState, useEffect } from "react";
import "../../Styles/UserDashboard/Commandes.css";
import Lottie from "lottie-react";
import Animation from "../animation/loading_gray.json";
import API from "../Authentification/api";

const Commandes = () => {
  const [activeTab, setActiveTab] = useState("livraison");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const statusColors = {
    livrée: "green",
    en_cours: "orange",
    "en attente": "gray",
    annulée: "red",
    retournée: "purple",
  };

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        setLoading(true);
        const response = await API.get(
          `/orders?limit=3&page=${currentPage}`
        );
        const data = response.data;

        setOrders(data.data); // Laravel => data contient les commandes
        setTotalPages(data.last_page);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, [currentPage]);

  // Filtrage des commandes
  const commandesFiltrees = orders.filter((cmd) =>
    activeTab === "livraison"
      ? ["livrée", "en_cours", "en attente", "pending"].includes(cmd.status)
      : ["annulée", "retournée", "cancelled"].includes(cmd.status)

  );

  return (
    <div>
      <div className="shadow-sm border border-1 p-2">
        <div className="border-bottom border-2 border-black w-100 py-2 d-flex align-items-center">
          <h2 className="taux_moyen">Commandes</h2>
        </div>

        {/* Onglets */}
        <div className="row">
          <div className="col-3 py-2">
            <button
              className={`nav-link text-truncate ${activeTab === "livraison" ? "active-tab" : "text-dark"
                }`}
              onClick={() => {
                setActiveTab("livraison");
                setCurrentPage(1);
              }}
            >
              En cours / Livrées
            </button>
          </div>
          <div className="col-3 py-2">
            <button
              className={`nav-link text-truncate ${activeTab === "annule" ? "active-tab" : "text-dark"
                }`}
              onClick={() => {
                setActiveTab("annule");
                setCurrentPage(1);
              }}
            >
              Annulées / Retournées
            </button>
          </div>
        </div>

        {/* Contenu dynamique */}
        <div className="mt-3">
          {loading ? (
            <Lottie
              animationData={Animation}
              loop={true}
              style={{ width: 80, height: 80, margin: "2rem auto", display: "block" }}
            />
          ) : commandesFiltrees.length === 0 ? (
            <h4 className="petit_titre text-center">
              Vous n’avez aucune commande{" "}
              {activeTab === "livraison"
                ? "en cours ou livrée"
                : "annulée ou retournée"}.
            </h4>
          ) : (
            <>
              {commandesFiltrees.map((order) => (
                <div key={order.id} className="row mb-3">
                  <div className="accordion col-10 pb-3" id={`faqAccordion${order.id}`}>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={`heading${order.id}`}>
                        <button
                          className="accordion-button btn_aide"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${order.id}`}
                          aria-expanded="false"
                          aria-controls={`collapse${order.id}`}
                        >
                          Commande #{order.id} — Total: {order.total} FCFA
                        </button>
                      </h2>
                      <div
                        id={`collapse${order.id}`}
                        className="accordion-collapse collapse show"
                        aria-labelledby={`heading${order.id}`}
                        data-bs-parent={`#faqAccordion${order.id}`}
                      >
                        <div className="accordion-body reponse">
                          <div className="row fw-bold border-bottom pb-2 mb-2">
                            <div className="col-3">Image</div>
                            <div className="col-3">Nom</div>
                            <div className="col-2">Catégorie</div>
                            <div className="col-1">Qté</div>
                            <div className="col-3">Prix unitaire</div>
                          </div>

                          {order.items?.map((item) => (
                            <div key={`${order.id}-${item.product_id}`} className="row mb-2">
                              <div className="col-3">
                                <img
                                  src={item.product?.img}
                                  alt={item.product?.name}
                                  className="img-fluid"
                                />
                              </div>
                              <div className="col-3 d-flex align-items-center texte_brut">
                                {item.product?.name}
                              </div>
                              <div className="col-2 d-flex align-items-center texte_brut">
                                {item.product?.category}
                              </div>

                              <div className="col-1 d-flex align-items-center texte_brut">
                                {item.quantity}
                              </div>
                              <div className="col-3 d-flex align-items-center texte_brut">
                                {item.product?.price} FCFA
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <h3
                      className="texte_brut border border-1 rounded-5 text-white text-center"
                      style={{ backgroundColor: statusColors[order.status] || "gray" }}
                    >
                      {order.status}
                    </h3>
                    <button className="bg-primary border-0 text-white w-100 rounded-5 text-center mt-2">
                      Avis
                    </button>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary mx-1"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Précédent
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`btn btn-sm mx-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}


                  <button
                    className="btn btn-sm btn-outline-primary mx-1"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commandes;
