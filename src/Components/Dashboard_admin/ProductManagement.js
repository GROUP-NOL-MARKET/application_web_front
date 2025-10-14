import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { Navigate, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./dataset/Dropdown";
import Entete from "./dataset/Entete";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, deleted: 0, draft: 0 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const handleNavigate = () => {
    navigate("/admin/AddProduct")
  }

  // Charger les produits
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/admin/products?page=${page}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.data);
      setStats({
        total: response.data.total,
        published: response.data.published,
        deleted: response.data.deleted,
        draft: response.data.draft,
      });
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
  }, [page, search]);

  // 🔹 Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="container-fluid">
      <Entete title="Gestion des produits" />

      {/* HEADER ACTIONS */}
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-9">
            <div className="row">
              <Button
                className="col-3 me-2 bg-success rounded-5"
                style={{ color: "white" }}
                onClick={() => handleNavigate()}
              >
                Ajouter un produit{" "}
                <FontAwesomeIcon icon={faCirclePlus} className="ms-1" />
              </Button>
              <Button
                className="col-3 bg-primary rounded-5"
                style={{ color: "white" }}
                onClick={() => toast.info("Export CSV à implémenter")}
              >
                Exporter sous csv
              </Button>
            </div>
            <div className="mt-2">
              <p className="texte_brut">
                Produits: Tous ({stats?.total}) |
                <span style={{ color: "blue" }}> Publiés: </span>({stats?.published}) |
                <span style={{ color: "blue" }}> Supprimés: </span>({stats?.deleted}) |
                <span style={{ color: "blue" }}> Brouillons: </span>({stats?.draft})
              </p>
            </div>
          </div>

          {/* BARRE DE RECHERCHE */}
          <div className="col">
            <form onSubmit={handleSearch}>
              <div className="row overflow-hidden border border-1">
                <div className="col-10">
                  <InputBase
                    placeholder="Rechercher un produit"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    inputProps={{ "aria-label": "search" }}
                    className="w-100 px-3 h-100"
                  />
                </div>
                <div className="col-2" style={{ backgroundColor: "#0066BD" }}>
                  <IconButton
                    type="submit"
                    className="w-100 h-100"
                    sx={{
                      color: "white",
                      borderRadius: 0,
                      ":hover": { backgroundColor: "#0066BD" },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* TABLEAU PRODUITS */}
      <div className="container-fluid mt-3">
        {loading ? (
          <div className="text-center my-5">
            <CircularProgress />
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr className="petit_titre">
                <th><FontAwesomeIcon icon={faImage} /></th>
                <th>Référence</th>
                <th>Nom</th>
                <th>Famille</th>
                <th>Prix</th>
                <th>Catégorie</th>
                <th>Description</th>
                <th>Disponibilité</th>
                <th>Sous-catégorie</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td><img src={p.image_url} alt={p.name} width="50" /></td>
                    <td className="texte_brut">{p.reference}</td>
                    <td className="texte_brut">{p.name}</td>
                    <td className="texte_brut">{p.family}</td>
                    <td className="texte_brut">{p.price} FCFA</td>
                    <td className="texte_brut">{p.category}</td>
                    <td className="texte_brut">{p.description}</td>
                    <td className="texte_brut">{p.disponibility}</td>
                    <td className="texte_brut">{p.sous_category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">Aucun produit trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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

export default ProductManagement;
