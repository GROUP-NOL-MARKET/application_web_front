import React, { useContext, useEffect, useState } from "react";
import Entete from "./dataset/Entete";
import SellPeriod from "./dataset/SellPeriod";
import FooterDashboard from "./dataset/FooterDashboard";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Rating from "@mui/material/Rating";
import API from "../Authentification/apiAdmin";
import { CircularProgress } from "@mui/material";

const BestProduct = () => {
  const { theme } = useContext(ThemeContext);
  const [bestProducts, setBestProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [dropActive, setDropActive] = useState("Meilleures ventes");

  // 🔌 Récupération des meilleurs produits
  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const res = await API.get('/admin/best-products?limit=4');
        setBestProducts(res.data.data);
      } catch (error) {
        console.error("Erreur chargement produits :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestProducts();
  }, []);

  return (
    <div className="">
      {/* En-tête */}
      <Entete title="Meilleurs produits" />

      {/* Filtres */}
      <div className="row mt-2">
        <div className="col">
          <SellPeriod text="Période de ventes" />
        </div>

        <div className="offset-5 col mt-3">
          <h6 className="petit_titre">Produits vus : 5/10</h6>

          <div className="dropdown border border-1 p-2">
            <span
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            >
              Trier par : {dropActive}
            </span>

            <ul className="dropdown-menu">
              {["Meilleures ventes", "Nom", "Pires ventes"].map((item) => (
                <li
                  key={item}
                  className="dropdown-item"
                  onClick={() => setDropActive(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contenu */}
      {loading ? (
        <CircularProgress />
      ) : (
        <div className=" mt-4">
          {Object.entries(bestProducts).map(([category, products]) => (
            <div className="row mb-4" key={category}>
              <h4 className="taux_moyen mb-3">{category}</h4>

              <div className="row">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="col me-2 border border-1 shadow-sm"
                    style={{
                      backgroundColor:
                        theme === "dark" ? "#000" : "#fff",
                    }}
                  >
                    <div className="row">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid col ms-2 mt-2 bg-light"
                        style={{ height: "100px", objectFit: "contain" }}
                      />

                      <div className="col-2 mt-2 d-flex justify-content-end">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </div>
                    </div>

                    <h5 className="taux_moyen fw-normal mt-2">
                      {product.name}
                    </h5>

                    <Rating
                      value={product.rating ?? 4}
                      size="small"
                      readOnly
                    />

                    <h6 className="petit_titre">
                      {product.reste} restants
                    </h6>
                    <h6 className="petit_titre">
                      {product.selled} vendus
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <FooterDashboard />
    </div>
  );
};

export default BestProduct;
