import { useState, useContext } from "react";
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

const Navbar1 = () => {
  const [active, setActive] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const { products } = useContext(PanierContext);
  const navigate = useNavigate();

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
            <div className="col-6 d-none d-sm-block">
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
              <div className="col-5 d-lg-none navbar-brand logo_div">
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
                <div className="offest-1 connexion d-lg-none col-1 d-flex align-items-center">
                  <div className="w-100 row">
                    <div className="connexion-text col-12 p-0">
                      <div className="dropdown register">
                        <div
                          className="dropdown-toggle lien_mon_compte"
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
              ) : (
                <div className="connexion offset-1 col-1 d-flex align-items-center d-lg-none">
                  <div className="w-100 row">
                    <div className="connexion-text col-12 col-8 p-0">
                      <div className="dropdown mt-1 register">
                        <div
                          className="dropdown-toggle lien_mon_compte"
                          role="button"
                          id="userDropdown"
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
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className=" panier col-2 d-lg-none ">
                <Link to="/Cart" style={{ color: "black" }} className="w-100 d-flex align-items-right">
                  <div className="d-flex position-relative offset-4">
                    <img className="img-fluid" src={Panier} alt="" style={{ width: "35px" }} />

                    <span
                      className="position-absolute translate-middle badge top-0 start-100 rounded-pill bg-danger panier_length"
                    >
                      {products.length}
                    </span>
                  </div>
                </Link>
              </div>
              <button
                className="navbar-toggler d-lg-none col-2 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon offset-2" style={{ color: "orange" }} />
              </button>

              {/* Menu mobile */}
              <div className="collapse navbar-collapse d-lg-none" id="navbarCollapse">
                <button
                  type="button"
                  className="close-btn"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                >
                  ✖
                </button>
                <ul className="navbar-nav me-auto">
                  <li className="nav-item"><Link to="/" className="nav-link">Accueil</Link></li>
                  <li className="nav-item"><Link to="/About" className="nav-link">A propos</Link></li>
                  <li className="nav-item"><span className="nav-link">Services</span></li>
                  <li className="nav-item"><Link to="/Contact" className="nav-link">Contact</Link></li>
                  <li className="nav-item"><span className="nav-link">Achat</span></li>
                  <li className="nav-item"><Link to="/products" className="nav-link">Produits</Link></li>
                  <li className="nav-item"><Link to="/aide&Faq" className="nav-link">Faq & aide</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Liens desktop à droite */}
        <div className="offset-3 col d-flex align-items-center">
          <h6 className="fw-semibold nav-item d-none d-lg-block me-4">
            <Link
              to="/Contact"
              className="nav-link"
              style={{ color: active === "Contact" ? "orange" : "black" }}
              onClick={() => setActive("Contact")}
            >
              Contactez-nous
            </Link>
          </h6>
          <h6 className="fw-semibold nav-item d-none d-lg-block me-2">
            <Link
              to="/About"
              className="nav-link"
              style={{ color: active === "About" ? "orange" : "black" }}
              onClick={() => setActive("About")}
            >
              A propos
            </Link>
          </h6>
          <div className="m-0 p-1 fw-semibold nav-item d-none d-lg-block">
            <Button
              as={Link}
              to="/products"
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
