import React, { useContext, useState, useMemo, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../../assets/Images/Logo_entreprise-removebg-preview.webp";
import Panier from "../../assets/Images/icone/panier.png";
import utilisateur from "../../assets/Images/icone/utilisateur.png";
import question from "../../assets/Images/icone/question.png";

import { AuthContext } from "../../AuthContext";
import { PanierContext } from "../../../Store/Panier_context";
import API from "../../Authentification/api";
import "../../../Styles/Navbar.css";
import { Form } from "react-bootstrap";

const Navbar2 = React.memo(() => {
  const categories = [
    "droguerie",
    "animalerie",
    "épicerie",
    "produits Locaux",
    "produits frais",
    "divers",
    "boissons",
    "electroménager",
  ];

  const sousCategories = [
    "Petit déjeuner",
    "Céréales-Corn Flakes-pain grillé",
    "Biscuits gâteaux",
    "Amuse gueules",
    "Pains et viennoiseries",
    "Bonbons-chocolat",
    "Conserves-plats cuisinés",
    "Pâtes alimentaires-riz-purée",
    "Assaisonnement-condiments",
    "Huile-vinaigre",
    "Sardine",
    "Produits du monde",
    " Monde de Bébé",
    "Prêt à porter",
    "Fournitures scolaires",
    "Hygiène dentaire",
    "Rasage",
    "Produits ménagers",
    "Soins de beauté",
    "Mouchoirs",
    "Désodorisant-insecticide",
    "Hygiène féminine",
    "Produits locaux",
    "Fromages-Fruits frais-Légumes",
    "yaourt",
    "Produits congélés",
    "Surgélés-Crêmerie fraîche",
    "Glâces et crêmes glacées",
    "Charcuterie volaille poisson",
    "Produits Locaux frais",
    "Vins",
    "Spiriteux",
    "Chewing Gum",
    "Piles-rasoirs",
    "Papeterie",
    "Ampoule",
    "Jus de fruits",
    "Eaux minérales",
    "Sirop",
    "Soft Drink",
    "Cidre",
    "Champagnes",
    "Bière et panaché",
    "Nourriture pour chiens et chats",
    "Matériels Nasco",
  ];

  const { products } = useContext(PanierContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Catégories");

  /**  Mémoriser les calculs dépendants du panier **/
  const totalPrice = useMemo(
    () =>
      products.reduce(
        (acc, product) => acc + (product.price || 0) * (product.quantity || 0),
        0
      ),
    [products]
  );

  /**  Handlers optimisés **/
  const handleNavigation = useCallback(
    (category) =>
      navigate(`/products?category=${encodeURIComponent(category)}`),
    [navigate]
  );

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      const term = searchTerm.trim().toLowerCase();
      if (!term) {
        toast.info("Veuillez saisir un terme de recherche.");
        return;
      }

      // Recherche exacte dans les catégories
      const exactCategory = categories.find(
        (cat) => cat.toLowerCase() === term
      );
      if (exactCategory) {
        navigate(`/products?category=${encodeURIComponent(exactCategory)}`);
        return;
      }

      // Recherche approximative (catégorie qui contient le mot)
      const similarCategory = categories.find((cat) =>
        cat.toLowerCase().includes(term)
      );
      if (similarCategory) {
        navigate(`/products?category=${encodeURIComponent(similarCategory)}`);
        return;
      }

      // Recherche exacte dans les sous-catégories
      const exactSousCat = sousCategories.find(
        (sub) => sub.toLowerCase() === term
      );
      if (exactSousCat) {
        navigate(`/products?sous_category=${encodeURIComponent(exactSousCat)}`);
        return;
      }

      // Recherche approximative dans les sous-catégories
      const similarSousCat = sousCategories.find((sub) =>
        sub.toLowerCase().includes(term)
      );
      if (similarSousCat) {
        navigate(
          `/products?sous_category=${encodeURIComponent(similarSousCat)}`
        );
        return;
      }

      // Recherche dans les produits (via ton backend)
      try {
        const response = await API.get("/products/search", {
          params: { q: term },
        });

        const results = response.data?.data ?? [];

        if (results.length > 0) {
          localStorage.setItem("searchResults", JSON.stringify(results));
          navigate(`/searchProduct?query=${encodeURIComponent(term)}`);
        } else {
          toast.info("Aucun produit trouvé pour votre recherche.");
        }
      } catch (error) {
        console.error("Erreur de recherche :", error);
        toast.error(
          error.response?.data?.message || "Erreur lors de la recherche."
        );
      }
    },
    [searchTerm, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await API.post("/logout");
      localStorage.removeItem("token");
      toast.success("Déconnexion réussie");
      navigate("/login");
    } catch {
      toast.error("Erreur lors de la déconnexion");
    }
  }, [navigate]);

  return (
    <div
      className="navbar2 navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#CFCFCF", zIndex: 10 }}
    >
      <div className="container align-items-center d-flex justify-content-between">
        {/*  Logo avec lazy loading */}
        <Link to="/" className="d-none d-lg-block">
          <img
            alt="logo"
            src={Logo}
            className="logo"
            style={{ cursor: "pointer", height: "55px" }}
            loading="lazy"
          />
        </Link>

        {/*  Barre de recherche */}
        <div className="col col-lg-5 d-flex align-items-center mx-2">
          <div className="row g-0 rounded-5 border border-dark overflow-hidden w-100">
            <div className="col-5">
              <select
                className="form-select h-100 rounded-0 border-end select_1"
                value={selectedCategory}
                onChange={(e) => {
                  const category = e.target.value;
                  setSelectedCategory(category);

                  if (category !== "Catégories") {
                    handleNavigation(category);
                  }
                }}
              >
                <option value="Catégories">Catégories</option>
                {[
                  "Droguerie",
                  "Animalerie",
                  "Épicerie",
                  "Produits Locaux",
                  "Produits frais",
                  "Divers",
                  "Boissons",
                  "Electroménager",
                ].map((cat) => (
                  <option key={cat} onClick={() => handleNavigation(cat)}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <Form onSubmit={handleSearch} className="col">
              <div className="row">
                <div className="col-9">
                  <InputBase
                    placeholder="Tapez ici..."
                    inputProps={{ "aria-label": "search" }}
                    className="w-100 px-3 h-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="col-3">
                  <IconButton
                    type="submit"
                    className="w-100 h-100"
                    sx={{
                      backgroundColor: "#0066BD",
                      color: "white",
                      borderRadius: 0,
                      ":hover": { backgroundColor: "#004d94" },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
            </Form>
          </div>
        </div>

        {/* Section utilisateur, panier et aide */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          {/* Utilisateur */}
          <div className="d-flex align-items-center gap-2 dropdown">
            <img
              src={utilisateur}
              alt="user"
              className="icon_user"
              style={{ width: "35px", cursor: "pointer" }}
              loading="lazy"
            />

            <div className="dropdowns register w-100">
              {!isLoggedIn ? (
                <>
                  <div
                    className="dropdown-toggle"
                    role="button"
                    id="registerDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Connexion
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="registerDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Inscription
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Connexion
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        Mode admin{" "}
                        <FontAwesomeIcon icon={faLock}  />
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <div
                    className="dropdown-toggle"
                    role="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Mon compte
                  </div>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/user">
                        Mon compte
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Panier */}
          <div className="d-flex align-items-center gap-2 position-relative">
            <Link to="/Cart" className="position-relative">
              <img
                src={Panier}
                alt="panier"
                style={{ width: "35px", cursor: "pointer" }}
                loading="lazy"
              />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "12px" }}
              >
                {products.length}
              </span>
            </Link>
            <div className="ps-2">
              <p className="mb-0 fw-bold">Panier</p>
              <small>{totalPrice.toLocaleString()} FCFA</small>
            </div>
          </div>

          {/* Aide */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/aide&Faq">
              <img
                src={question}
                alt="aide"
                style={{ width: "30px", cursor: "pointer" }}
                loading="lazy"
              />
            </Link>
            <p className="mb-0">Aide</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Navbar2;
