import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Entete from "./dataset/Entete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "./ThemeContext";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import img_electromenager_dashboard from "../assets/Images/img_electromenager_dashboard.webp";

const ProductGrid = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [dropActive, setDropActive] = useState("Nom");
  const [category, setCategory] = useState("Electroménager");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("adminToken");

  // Charger les produits depuis l’API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/products?page=${page}&sort=${dropActive}&category=${category}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(response.data.data);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, dropActive, category]);

  // 🔹 Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Produit supprimé avec succès");
      fetchProducts();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="container-fluid">
      {/* En-tête */}
      <Entete title="Grille des produits" />

      {/* FILTRES */}
      <div className="container-fluid">
        <div className="row mt-3">
          {/* Catégories */}
          <div className="shadow-sm border border-1 me-2 col-3 p-2 d-flex align-items-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="row">
              <img src={img_electromenager_dashboard} alt=" " className="col img-fluid" />
              <div className="col-9 d-flex align-items-center justify-content-center">
                <p className="petit_titre fw-bold">{category}</p>
              </div>

            </div>
          </div>
          <div className="shadow-sm border border-1 me-2 col-4 p-2 d-flex align-items-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="dropdown w-100" style={{ cursor: "pointer" }}>
              <span
                className="dropdown-toggle petit_titre fw-bold"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Catégories de produits {category && `: ${category}`}
              </span>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li className="dropdown-item" onClick={() => setCategory("Electroménager")}>Electroménager</li>
                <li className="dropdown-item" onClick={() => setCategory("Produits Locaux")}>Produits Locaux</li>
                <li className="dropdown-item" onClick={() => setCategory("Produits Frais")}>Produits Frais</li>
                <li className="dropdown-item" onClick={() => setCategory("Epicerie")}>Epicerie</li>
                <li className="dropdown-item" onClick={() => setCategory("Droguerie")}>Droguerie</li>
                <li className="dropdown-item" onClick={() => setCategory("Divers")}>Divers</li>
                <li className="dropdown-item" onClick={() => setCategory("Boissons")}>Boissons</li>
              </ul>
            </div>
          </div>

          {/* Tri */}
          <div className="shadow-sm border border-1 col-3 p-2 d-flex align-items-center"
            style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
          >
            <div className="dropdown w-100" style={{ cursor: "pointer" }}>
              <span
                className="dropdown-toggle petit_titre fw-bold"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Trier par : {dropActive}
              </span>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li className="dropdown-item" onClick={() => setDropActive("Nom")}>Nom</li>
                <li className="dropdown-item" onClick={() => setDropActive("Meilleurs ventes")}>Meilleurs ventes</li>
                <li className="dropdown-item" onClick={() => setDropActive("Pires ventes")}>Pires ventes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* GRID PRODUITS */}
      <div className="container-fluid">
        <div className="row mt-4">
          {loading ? (
            <div className="text-center my-5">
              <CircularProgress />
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="col-2 me-2 shadow-sm border border-1 pb-2 my-1"
                style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
              >
                <div className="row">
                  <div className="col-10">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="img_product"
                    />
                  </div>
                  <div className="col-1 mt-2">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </div>
                </div>
                <h5 className="taux_moyen fw-normal mt-2">{product.name}</h5>
                <p className="texte_brut m-0">Prix fixe : {product.price} FCFA</p>
                <p className="texte_brut m-0">Prix de vente : {product.price} FCFA</p>
                <p className="texte_brut m-0" style={{ color: "green" }}>
                  Disponible : {product.disponibility}
                </p>
                <p className="texte_brut m-0" style={{ color: "blue" }}>
                  Vendu: {product.selled}
                </p>
                <div className="row mt-2">
                  <Button
                    className="col me-2"
                    style={{ borderRadius: "15px", borderColor: "blue", color: "blue" }}
                    onClick={() => navigate(`/admin/addProduct/${product.id}`)}
                  >
                    Modifier
                  </Button>
                  <Button
                    className="col-6"
                    style={{ borderRadius: "15px", borderColor: "red", color: "red" }}
                    onClick={() => handleDelete(product.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center petit_titre">Aucun produit trouvé</div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <nav aria-label="Pagination" className="mt-3">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${page === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProductGrid;
