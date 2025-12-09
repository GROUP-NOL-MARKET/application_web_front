import { useState, useContext, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../AuthContext";
import Panier from "../../assets/Images/icone/panier.png";
import API from "../../Authentification/api";
import Button from "react-bootstrap/Button";
import { PanierContext } from "../../../Store/Panier_context";
import utilisateur from "../../assets/Images/icone/utilisateur.png";
import "../../../Styles/Navbar.css";
import telephone from "../../assets/Images/icone/appel-telephonique.png";
import Logo from "../../assets/Images/Logo_entreprise-removebg-preview.webp";
import question from "../../assets/Images/icone/question.png";

const Navbar1 = () => {
  const [active, setActive] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const { products } = useContext(PanierContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const totalPrice = useMemo(
    () =>
      products.reduce(
        (acc, product) => acc + (product.price || 0) * (product.quantity || 0),
        0
      ),
    [products]
  );

  // const handleNavLinkClick = () => {
  //   const navbar = document.getElementById("navbarCollapse");
  //   navbar?.classList.remove("show");
  // };

  // useEffect(() => {
  //   const closeOnClickOutside = (e) => {
  //     if (!e.target.closest(".mobile-menu") && !e.target.closest(".navbar-toggler")) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("click", closeOnClickOutside);
  //   return () => document.removeEventListener("click", closeOnClickOutside);
  // }, []);


  const logout = async () => {
    try {
      await API.post("/logout");
      localStorage.removeItem("token");
      toast.success("Déconnexion réussie");
      navigate("/login");
    } catch (err) {
      console.error("Erreur logout", err.response?.data);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <div className="bg-light shadow-sm d-flex align-items-center navbar navbar-expand-lg w-100">
      {/* Premier navbar quand l'utilisateur n'est pas connecté */}
      <div className="container-fluid">
        <div className="tel col-12 col-lg-5 mx-sm-3 d-sm-block navbar-brand">
          <div className="row">
            {/* Bloc téléphone */}
            <div className="col-6 d-none d-lg-block">
              <div className="row p-0 d-flex align-items-center">
                <div className="col-2 m-0">
                  <img src={telephone} alt="Appel" className="img-fluid" />
                </div>
                <h6 className="col-8 px-0 fw-semibold flex-lg-wrap">
                  Appelez-nous au : (+229) 01 65 00 29 29
                </h6>
              </div>
            </div>

            {/* La partie pour les petits écrans  */}

            {/* Bouton hamburger responsive */}
            <div className="d-flex align-items-center">
              <div className="col-4 col-md-2  d-lg-none navbar-brand logo_div">
                <Link to="/">
                  <img
                    alt="logo"
                    src={Logo}
                    className="logo img-fluid"
                    style={{ cursor: "pointer" }}
                  />
                </Link>
              </div>
              {!isLoggedIn ? (
                <div className="offset-2 offset-md-4 col-md-2 connexion d-lg-none col-2">
                  <div className="w-100 row">
                    <div className="connexion-text col-12 p-0">
                      <div className="dropdown mt-1 register">
                        <div
                          className="dropdown-toggle lien_mon_compte d-md-none"
                          role="button"
                          id="registerDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src={utilisateur}
                            alt="user"
                            className="icon_user"
                            style={{ width: "35px", cursor: "pointer" }}
                          />
                        </div>
                        <div className="row">
                          <img
                            src={utilisateur}
                            alt="user"
                            className="icon_user col-5 d-none d-md-block"
                            style={{ cursor: "pointer" }}
                          />
                          <div
                            className="dropdown-toggle fw-normal d-none d-md-flex align-items-center col-6"
                            role="button"
                            id="registerDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ fontSize: "15px" }}
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
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="connexion offset-2 offset-md-4 col-2 col-md-2 d-flex align-items-center d-lg-none">
                  <div className="w-100 row">
                    <div className="connexion-text col-12 p-0">
                      <div className="dropdown mt-1 register">
                        <div
                          className="dropdown-toggle lien_mon_compte d-md-none"
                          role="button"
                          id="userDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img
                            src={utilisateur}
                            alt="user"
                            className="icon_user ms-auto"
                            style={{ width: "35px", cursor: "pointer" }}
                          />
                        </div>
                        <span className="row">
                          <img
                            src={utilisateur}
                            alt="user"
                            className="icon_user d-none d-md-block col-5"
                            style={{ cursor: "pointer" }}
                          />
                          <div
                            className="dropdown-toggle d-none d-md-flex align-items-center col-6 fw-normal"
                            role="button"
                            id="registerDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ fontSize: "15px" }}
                          >
                            Connexion
                          </div>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="userDropdown"
                          >
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
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="offset-md-1 col-1 d-lg-none">
                <div className="d-flex align-items-center gap-2">
                  <Link to="/aide&Faq">
                    <img
                      src={question}
                      alt="aide"
                      style={{ width: "30px", cursor: "pointer" }}
                      loading="lazy"
                    />
                  </Link>
                  <p className="mb-0 fw-normal d-none d-md-block" style={{ fontSize: "15px" }}>Aide</p>
                </div>
              </div>
              <div className="col-2 d-flex d-lg-none justify-content-center">
                <button
                  className="navbar-toggler border-0"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="navbar-toggler-icon offset-2" />
                </button>
              </div>
              {/* Menu mobile */}
              <div className={`mobile-menu d-lg-none ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  ✖
                </button>
                <ul className="navbar-nav ms-2">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      Accueil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/About"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      A propos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to=""
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/Contact"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/cart"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      Achat
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/products"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      Produits
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/aide&Faq"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      Faq & aide
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isOpen && (
            <div
              className="menu-overlay"
              onClick={() => setIsOpen(false)}
            ></div>
          )}

        </div>

        {/* Liens desktop à droite */}
        <div className="offset-3 col d-flex align-items-center">
          <h6 className="fw-semibold nav-item d-none d-lg-block me-4">
            <Link
              to="/Contact"
              className="fw-bold text-decoration-none petit_titre"
              style={{ color: active === "Contact" ? "orange" : "black" }}
              onClick={() => setActive("Contact")}
            >
              Contactez-nous
            </Link>
          </h6>
          <h6 className="fw-semibold nav-item d-none d-lg-block me-2">
            <Link
              to="/About"
              className="fw-bold text-decoration-none petit_titre"
              style={{ color: active === "About" ? "orange" : "black" }}
              onClick={() => setActive("About")}
            >
              A propos
            </Link>
          </h6>
          <div className="m-0 p-1 fw-semibold nav-item d-none d-lg-block">
            <Button
              as={Link}
              to="/all_products"
              type="button"
              style={{
                fontFamily: "Roboto, sans-serif",
                backgroundColor: "#0066BD",
              }}
            >
              Acheter maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
