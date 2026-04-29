import React, { useContext, useState, useMemo, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Logo from "../../assets/Images/Logo_entreprise-removebg-preview.webp";
import utilisateur from "../../assets/Images/icone/utilisateur.png";
import question from "../../assets/Images/icone/question.png";
import { AuthContext } from "../../AuthContext";
import { PanierContext } from "../../../Store/Panier_context";
import API from "../../Authentification/api";
import "../../../Styles/Navbar.css";
import { Form } from "react-bootstrap";
import { FavoriteContext } from "../../../Store/Favoris_context";

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
  const { favorites, isLoading } = useContext(FavoriteContext)
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
      <div className="container-fluid align-items-center d-flex justify-content-between">
        {/*  Logo avec lazy loading */}
        <Link to="/" className="d-none d-lg-block">
          <img
            alt="logo"
            src={Logo}
            className="logo"
            style={{ cursor: "pointer", height: "50px" }}
            loading="lazy"
          />
        </Link>

        <div className="d-md-flex flex-column ms-2 d-none">
          <span style={{ fontSize: "13px" }} className="texte_brut fw-bold"><FontAwesomeIcon icon={faLocationDot} size="1x" />localisation</span>
          <span style={{ fontSize: "11px" }} className="texte_brut fw-normal">Cotonou, Fidjrossè (houenoussou)</span>
        </div>


        {/*  Barre de recherche */}


        <div className="col-10 col-md-9 col-lg-4 d-flex align-items-center mx-1">
          <div className="row g-0 rounded-5 border border-dark overflow-hidden w-100 search-bar">
            <div className="col-4 d-none d-md-block">
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

            {/* Mobile  */}

            <div className="col-4 d-md-none">

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
            <Form onSubmit={handleSearch} className="col" >
              <div className="row">
                <div className="col-md-9 col-8 d-flex align-items-center">
                  <InputBase
                    placeholder="Tapez ici..."
                    inputProps={{ "aria-label": "search" }}
                    className="w-100 px-2"
                    sx={{
                      fontSize: { xs: "12px", md: "12px" },
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                </div>

                <div className="col-md-3 col-4">
                  <IconButton
                    type="submit"
                    className="w-100 h-100"
                    sx={{
                      backgroundColor: "#0066BD",
                      color: "white",
                      borderRadius: 0,
                      padding: { xs: "4px", md: "14px" },
                      ":hover": { backgroundColor: "#004d94" },
                    }}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>

                </div>
              </div>
            </Form>
          </div>
        </div>

        {/* Section utilisateur, panier et aide */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          {/* Utilisateur */}
          <div className="d-none d-lg-flex align-items-center">
            <div className="dropdown user-dropdown">
              <button
                className="btn d-flex align-items-center gap-2 user-trigger"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={utilisateur}
                  alt="user"
                  className="rounded-circle"
                  width="36"
                  height="36"
                  loading="lazy"
                />
                <span className="fw-semibold text-dark small">
                  {isLoggedIn ? "Mon compte" : "Connexion"}
                </span>
                <i className="fa-solid fa-chevron-down small"></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2">
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/login">
                        <LoginOutlinedIcon />
                        Connexion
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/register">
                        <PersonAddAltOutlinedIcon />
                        Inscription
                      </Link>
                    </li>

                    <li><hr className="dropdown-divider" /></li>

                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2 text-warning" to="/admin">
                        <i className="fa-solid fa-lock"></i>
                        Mode admin
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/user">
                        <PersonOutlineOutlinedIcon />
                        Mon profil
                      </Link>
                    </li>

                    <li><hr className="dropdown-divider" /></li>

                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center gap-2 text-danger"
                        onClick={logout}
                      >
                        <LogoutOutlinedIcon />
                        Déconnexion
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>


          {/* Panier */}
          <div className="d-flex align-items-center gap-2 position-relative">
            <Link to="/Cart" className="position-relative" style={{ color: "black" }}>
              <AddShoppingCartIcon style={{ fontSize: "35px" }} />
              <span className='notif-badge-navbar-cart position-absolute'>{products.length}</span>
            </Link>
            <div className="ps-2">
              <p className="mb-0 fw-bold price">Panier</p>
              <small>{totalPrice.toLocaleString()} FCFA</small>
            </div>
          </div>

          {/* Favoris  */}

          <div className="d-flex align-items-center gap-2">
            <Link
              to={isLoggedIn ? "/user/favoris" : "/login"}
              className="text-decoration-none position-relative"
              style={{ color: "black" }}
            >
              <FavoriteBorderIcon style={{ fontSize: "35px" }} />
              <span className="notif-badge-navbar-favorite">
                {isLoggedIn && !isLoading ? favorites.length : "0"}
              </span>
            </Link>

            <span className="price">Favoris</span>
          </div>


          {/* Aide */}

          <div className="d-flex align-items-center gap-2">
            <Link to="/aide&Faq" >
              <img
                src={question}
                alt="aide"
                style={{ width: "25px", cursor: "pointer" }}
                loading="lazy"
              />
            </Link>
            <p className="mb-0 price">Aide</p>
          </div>
        </div>
        <div className=" row col-md-3 col-2 d-lg-none ">
          <Link
            to="/Cart"
            style={{ color: "black" }}
            className=" d-flex justify-content-center col-md-4"
          >
            <div className="d-flex position-relative">
              <AddShoppingCartIcon style={{ fontSize: "35px" }} />
              <span className='notif-badge-navbar-cart position-absolute'>{products.length}</span>

            </div>
          </Link>
          <div className="col-8 d-none d-md-block">
            <p className="mb-0 pb-0 price">Panier</p>
            <small className="mt-0 pt-0">{totalPrice.toLocaleString()} FCFA</small>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Navbar2;
