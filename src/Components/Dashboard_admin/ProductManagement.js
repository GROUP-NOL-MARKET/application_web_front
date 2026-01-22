import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faImage } from "@fortawesome/free-solid-svg-icons";
import Entete from "./dataset/Entete";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import API from "../Authentification/apiAdmin";
import * as XLSX from "xlsx";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    deleted: 0,
    draft: 0,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const handleNavigate = () => {
    navigate("/admin/AddProduct");
  };

  // Charger les produits
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await API.get(
        `/admin/products?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleExportExcel = () => {
    if (products.length === 0) {
      toast.warning("Aucun produit à exporter");
      return;
    }

    // Structure identique à MySQL
    const data = products.map((p) => ({
      id: p.id,
      reference: p.reference,
      name: p.name,
      family: p.family,
      price: p.price,
      category: p.category,
      description: p.description,
      disponibility: p.disponibility,
      quantity: p.quantity,
      selled: p.selled,      
      sous_category: p.sous_category,
      reste: p.reste,
    }));

    // Création feuille Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "products");

    // Export fichier
    XLSX.writeFile(workbook, "products.xlsx");

    toast.success("Export Excel réussi");
  };

  return (
    <div className="container">
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
                onClick={() => handleExportExcel()}
              >
                Exporter sous excel
              </Button>
            </div>
            <div className="mt-2">
              <p className="texte_brut">
                Produits: Tous ({stats?.total}) |
                <span style={{ color: "blue" }}> Publiés: </span>(
                {stats?.published}) |
                <span style={{ color: "blue" }}> Supprimés: </span>(
                {stats?.deleted}) |
                <span style={{ color: "blue" }}> Brouillons: </span>(
                {stats?.draft})
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
              <tr className="petit_titre row">
                <th className="col-1">
                  <FontAwesomeIcon icon={faImage} />
                </th>
                <th className="col-1">Référence</th>
                <th className="col-2">Nom</th>
                <th className="col-1">Famille</th>
                <th className="col-1">Prix</th>
                <th className="col-1">Catégorie</th>
                <th className="col-2">Description</th>
                <th className="col-1">Disponibilité</th>
                <th className="col-2">Sous-catégorie</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id} className="row">
                    <td className="col-1">
                      <img src={p.image} alt={p.name} width="50" />
                    </td>
                    <td className="texte_brut col-1">{p.reference}</td>
                    <td className="texte_brut col-2">{p.name}</td>
                    <td className="texte_brut col-1">{p.family}</td>
                    <td className="texte_brut col-1">{p.price} FCFA</td>
                    <td className="texte_brut col-1">{p.category}</td>
                    <td className="texte_brut col-2">{p.description}</td>
                    <td className="texte_brut col-1">{p.disponibility}</td>
                    <td className="texte_brut col-2">{p.sous_category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    Aucun produit trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="d-flex justify-content-center mt-3"
        >
          <ul className="pagination mb-0">
            {/* Bouton Précédent */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>
                Précédent
              </button>
            </li>

            {/* Indicateur Page X / Y */}
            <li className="page-item disabled">
              <span className="page-link">
                {page} / {totalPages}
              </span>
            </li>

            {/* Bouton Suivant */}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductManagement;
