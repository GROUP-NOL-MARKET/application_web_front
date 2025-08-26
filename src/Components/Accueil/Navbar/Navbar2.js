import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import "../../../Styles/Navbar.css";
import Logo from "../../assets/Images/Logo_entreprise-removebg-preview.png";
import { AuthContext, AuthProvider } from "../../AuthContext";
import { Link } from "react-router-dom";
import { PanierContext } from "../../../Store/Panier_context";

const Navbar2 = () => {
  const { products } = useContext(PanierContext);

  const { isLoggedIn } = useContext(AuthContext);
  // #CFCFCF

  return (
    <AuthProvider>
      <div
        className="navbar navbar-expand-lg overflow-hidden shadow-md"
        style={{
          backgroundColor: "#CFCFCF",
          backgroundColorOpacity: "0.4",
        }}
      >
        <div className="container m-md-1 w-100">
          <div className="offset-md-1 col-sm-2 navbar-brand">
            <a href="/">
              <img
                alt="logo"
                src={Logo}
                className="logo m-2"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-4 offset-lg-1 d-flex align-items-center">
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

            <div
              className="connexion col-md-2 col-lg-3  mt-2 d-flex align-items-center d-none d-lg-block"
              style={{ marginLeft: "5%" }}
            >
              <div className="w-100 row">
                <div className="user-icon col-3 ">
                  <FontAwesomeIcon
                    icon={faUser}
                    size="3x"
                    className="w-100"
                  ></FontAwesomeIcon>
                </div>
                <div className="connexion-text col-8 p-0 d-none d-lg-block">
                  <p className="mb-1 text-black-50 mon_compte w-100">
                    Mon compte
                  </p>
                  <h6 className="mt-1 register w-100">
                    <Link to="/register" className="text-black ">
                      Inscription
                    </Link>
                    <Link to="/login" className="text-black">
                      /Connexion
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          ) : (
            // Quand l'utilisateur est connecté : la partie mon compte

            <div></div>
          )}

          {/* Le panier au niveau du second navbar  */}

          <div className="panier offset-sm-1 col-sm-2 col-md-3 col-lg-2 mt-sm-1 mt-md-0 m-md-4 d-md-flex align-items-center">
            <div className="row w-100">
              <div className="col-4 position-relative">
                <Link
                  to="/Cart"
                  style={{ color: "black", position: "relative" }}
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="panier"
                  />
                  {/* Badge compteur */}
                  <span
                    className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.9rem", minWidth: "30px" }}
                  >
                    {products.length}
                  </span>
                </Link>
              </div>

              <div className="m-2 col-6 p-0 d-sm-flex flex-column align-items-center justify-content-center">
                <p className="mb-1 text-black-50 mon_compte">Panier</p>
                <h6 style={{ fontSize: "x-small", fontWeight: "bold" }}>
                  0 FCFA
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Navbar2;
