import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "../../Authentification/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Panier from "../../assets/Images/icone/panier.png";
import utilisateur from "../../assets/Images/icone/utilisateur.png";
import question from "../../assets/Images/icone/question.png";
import {
  faCartShopping,
  faCircleUser,
  faCircleQuestion,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import "../../../Styles/Navbar.css";
import Logo from "../../assets/Images/Logo_entreprise-removebg-preview.png";
import { AuthContext, AuthProvider } from "../../AuthContext";
import { Link } from "react-router-dom";
import { PanierContext } from "../../../Store/Panier_context";

const Navbar2 = () => {
  const { products } = useContext(PanierContext);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await API.post("/logout");
      localStorage.removeItem("token");
      toast.success("Déconnexion réussie");
      navigate("/application_web_front/login");
    } catch (err) {
      console.error("Erreur logout", err.response?.data);
    }
  };

  return (
    <AuthProvider>
      <div
        className="navbar navbar-expand-lg shadow-md navbar2"
        style={{
          backgroundColor: "#CFCFCF",
          backgroundColorOpacity: "0.4",
        }}
      >
        <div className="container">
          <div className=" col-12 col-sm-2 navbar-brand logo_div">
            <a href="/application_web_front">
              <img
                alt="logo"
                src={Logo}
                className="logo m-sm-2 offset-3 offset-sm-0"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>

          <div className="col-12 col-md-4 d-flex align-items-center">
            <div className="row g-0 rounded-5 border border-black overflow-hidden w-100">
              {/* Menu déroulant */}
              <div className="col-5">
                <select className="form-select h-100 rounded-0 border-end select_1">
                  <option>Catégories</option>
                  <option>Droguerie</option>
                  <option>Animalerie</option>
                  <option>Epicerie</option>
                </select>
              </div>

              {/* Champ de recherche */}
              <div className="col-5">
                <InputBase
                  placeholder="Tapez ici..."
                  inputProps={{ "aria-label": "search" }}
                  className="w-100 px-3 h-100"
                  sx={{ height: "100%" }}
                />
              </div>

              {/* Bouton de recherche */}
              <div className="col-2">
                <IconButton
                  type="button"
                  className="w-100 h-100"
                  sx={{
                    backgroundColor: "#0066BD",
                    color: "white",
                    borderRadius: 0,
                    ":hover": {
                      backgroundColor: "#0066BD",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
          </div>

          {!isLoggedIn ? (
            // Quand l'utilsateur n'est pas connecté : la partie mon compte

            <div className="connexion col-md-2 col-lg-2 col-10 mt-sm-2 mt-4 d-flex align-items-center justify-content-center d-sm-none d-lg-block">
              <div className="w-100 row">
                <div className="user-icon col-4 d-flex align-items-center">
                  <img className="img-fluid icon_user" alt="" src={utilisateur} />
                </div>
                <div className="connexion-text col-7 p-0 d-sm-none d-lg-block">
                  <p className="mb-sm-1 mb-1 text-black-50 mon_compte w-100">
                    Mon compte
                  </p>

                  <div className="dropdown mt-1 register w-100">
                    <div
                      className="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Connexion
                    </div>
                    <ul
                      className="dropdown-menu"
                      style={{ zIndex: "2000 !important" }}
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="/application_web_front/register"
                        >
                          Inscription
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/application_web_front/login"
                        >
                          Connexion
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Quand l'utilisateur est connecté : la partie mon compte

            <div className="connexion col-md-2 col-lg-2 col-10 mt-sm-2 mt-4 d-flex align-items-center d-sm-none d-lg-block">
              <div className="w-100 row">
                <div className="user-icon col-sm-3 col-3 d-flex align-items-center">
                  <img src={utilisateur} alt="" className="icon_user img-fluid"/>
                </div>
                <div className="connexion-text col-md-8 col-8 p-0 d-sm-none d-lg-block">
                  <p className="mb-sm-1 mb-1 text-black-50 mon_compte w-100">
                    Mon compte
                  </p>
                  <div className="dropdown mt-1 register w-100">
                    <div
                      className="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Connexion
                    </div>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/application_web_front/login"
                        >
                          Mon compte
                        </a>
                      </li>
                      <li>
                        <h
                          className="dropdown-item"
                          onClick={logout}
                          style={{ color: "red", cursor: "pointer" }}
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                          Déconnexion
                        </h>
                        <ToastContainer
                          position="top-right"
                          autoClose={3000}
                          hideProgressBar={false}
                          newestOnTop
                          closeOnClick
                          pauseOnHover
                          draggable
                          theme="colored"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Le panier au niveau du second navbar  */}

          <div className="panier_parent col-sm-2 col-2 col-md-3 col-lg-2 mt-sm-1 mt-3 d-flex align-items-center justify-content-center">
            <div className="row w-100">
              <div className="panier col-4 d-flex position-relative align-items-center">
                <Link
                  to="application_web_front/Cart"
                  style={{ color: "black" }}
                >
                  <img className="img-fluid" src={Panier} alt="" />
                  {/* Badge compteur */}
                  <span
                    className="position-absolute bottom-50 end-0 translate-middle badge rounded-pill bg-danger panier_length"
                    style={{ fontSize: "12px", minWidth: "20px" }}
                  >
                    {products.length}
                  </span>
                </Link>
              </div>

              <div className="offset-1 col-6 d-none d-sm-block p-0 mt-3">
                <p className="mb-1 text-black petit_title fw-bold">Panier</p>
                <p className="cart_price" style={{ fontSize: "0.9rem" }}>
                  {totalPrice} FCFA
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-1 mt-2">
            <div className="row">
              <Link
                className="lien_aide col-6"
                to="/application_web_front/aide&Faq"
              >
                <img className="img-fluid aide" src={question} alt="" />
              </Link>
              <div className=" col-6 d-none d-sm-block p-0 mt-1">
                <p className="mb-1 text-black mon_compte">Aide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Navbar2;
