import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import API from "../../Authentification/api";
import Button from "react-bootstrap/Button";
import "../../../Styles/Navbar.css";
import telephone from "../../assets/Images/icone/appel-telephonique.png";
import Logo from "../../assets/Images/Logo_entreprise-removebg-preview.webp";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';


// Import dropdown moderne

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";


const Navbar1 = () => {
  const [active, setActive] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


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

            <div className="d-flex align-items-center justify-content-between d-lg-none w-100 px-2">

              {/* LOGO */}
              <div className="navbar-brand logo_div">
                <Link to="/">
                  <img
                    alt="logo"
                    src={Logo}
                    className="logo img-fluid"
                    style={{ height: "40px" }}
                  />
                </Link>
              </div>

              {/* ACTIONS MOBILE */}
              <div className="d-flex align-items-center gap-3">

                {/* USER */}
                <>
                  <AccountCircleOutlinedIcon
                    onClick={handleOpen}
                    sx={{ fontSize: 32, cursor: "pointer" }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  />

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    PaperProps={{
                      elevation: 4,
                      sx: {
                        mt: 1,
                        minWidth: 180,
                        borderRadius: 2,
                      },
                    }}
                  >
                    {!isLoggedIn ? (
                      <>
                        <MenuItem component={Link} to="/login">
                          <ListItemIcon>
                            <LoginOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          Connexion
                        </MenuItem>

                        <MenuItem component={Link} to="/register">
                          <ListItemIcon>
                            <PersonAddAltOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          Inscription
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem component={Link} to="/user">
                          <ListItemIcon>
                            <PersonOutlineOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          Mon compte
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={logout} sx={{ color: "error.main" }}>
                          <ListItemIcon>
                            <LogoutOutlinedIcon fontSize="small" color="error" />
                          </ListItemIcon>
                          Déconnexion
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </>


                {/* FAVORIS */}
                <Link
                  to={isLoggedIn ? "/user/favoris" : "/login"}
                  className="position-relative"
                  style={{ color: "black" }}
                >
                  <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                  <span className="notif-badge-navbar-favorite">0</span>
                </Link>

                {/* HAMBURGER */}
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Menu"
                >
                  <DehazeOutlinedIcon sx={{ fontSize: 34 }} />
                </button>
              </div>
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
                      <HomeOutlinedIcon className="me-2" />
                      Accueil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/About"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      <InfoOutlinedIcon className="me-2" />
                      A propos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to=""
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      <MiscellaneousServicesOutlinedIcon className="me-2" />
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/Contact"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      <ContactMailOutlinedIcon className="me-2" />
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/cart"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      <ShoppingCartOutlinedIcon className="me-2" />
                      Achat
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/products"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      <StorefrontOutlinedIcon className="me-2" />
                      Produits
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/aide&Faq"
                      className="nav-link"
                      onClick={() => setIsOpen(false)}

                    >
                      <HelpOutlineOutlinedIcon className="me-2" />
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
              className="rounded-5 border-0 premium-btn"
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
