// src/components/Navbars/Navbar2.jsx
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "../../Authentification/api";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Panier from "../../assets/Images/icone/panier.png";
import utilisateur from "../../assets/Images/icone/utilisateur.png";
import question from "../../assets/Images/icone/question.png";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../../../Styles/Navbar.css";
import Logo from "../../assets/Images/Logo_entreprise-removebg-preview.webp";
import { AuthContext } from "../../AuthContext";
import { PanierContext } from "../../../Store/Panier_context";

const Navbar2 = () => {
    const { products } = useContext(PanierContext);
    const totalPrice = products.reduce(
        (acc, product) => acc + (product.price || 0) * (product.quantity || 0),
        0
    );

    const { isLoggedIn } = useContext(AuthContext);
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
        <>
            {/* sticky-top : deviendra fixe quand le premier navbar aura disparu à l'écran */}
            <div
                className="navbar2 navbar navbar-expand-lg shadow-sm"
                style={{ backgroundColor: "#CFCFCF", zIndex: 10 }}
            >
                <div className="container">
                    <div className="col-lg-2 d-none d-lg-block navbar-brand logo_div">
                        <Link to="/">
                            <img
                                alt="logo"
                                src={Logo}
                                className="logo m-2"
                                style={{ cursor: "pointer" }}
                            />
                        </Link>
                    </div>

                    <div className="col-12 ms-4 col-md-4 d-flex align-items-center">
                        <div className="row g-0 rounded-5 border border-black overflow-hidden w-100">
                            <div className="col-5">
                                <select
                                    className="form-select h-100 rounded-0 border-end select_1"
                                    defaultValue=""
                                >
                                    <option>Catégories</option>
                                    <option>Droguerie</option>
                                    <option>Animalerie</option>
                                    <option>Epicerie</option>
                                </select>
                            </div>

                            <div className="col-5">
                                <InputBase
                                    placeholder="Tapez ici..."
                                    inputProps={{ "aria-label": "search" }}
                                    className="w-100 px-3 h-100"
                                    sx={{ height: "100%" }}
                                />
                            </div>

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
                    <div className="col-12 d-lg-none d-flex align-items-center mt-2 mb-0 pb-0 g-0" style={{ backgroundColor: "orange" }}>
                        <h6 className="col fw-bold flex-lg-wrap petit_title text-center">
                            Appelez-nous au : (+229) 01 65 00 29 29
                        </h6>
                    </div>

                    {!isLoggedIn ? (
                        <div className="connexion col-lg-2 d-none d-lg-block mt-2 d-flex align-items-center">
                            <div className="w-100 row">
                                <div className="user-icon col-4 d-flex align-items-center">
                                    <img
                                        className="img-fluid icon_user"
                                        alt=""
                                        src={utilisateur}
                                    />
                                </div>
                                <div className="connexion-text col-7 p-0 d-sm-none d-lg-block">
                                    <p className="mb-sm-1 mb-1 text-black-50 mon_compte w-100">
                                        Mon compte
                                    </p>

                                    <div className="dropdown mt-1 register w-100">
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
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="connexion col-lg-2 d-none d-lg-block mt-2 d-flex align-items-center">
                            <div className="w-100 row">
                                <div className="user-icon col-sm-3 col-3 d-flex align-items-center">
                                    <img
                                        src={utilisateur}
                                        alt=""
                                        className="icon_user img-fluid"
                                    />
                                </div>
                                <div className="connexion-text col-md-8 col-8 p-0 d-sm-none d-lg-block">
                                    <p className="mb-sm-1 mb-1 text-black-50 mon_compte w-100">
                                        Mon compte
                                    </p>
                                    <div className="dropdown mt-1 register w-100">
                                        <div
                                            className="dropdown-toggle"
                                            role="button"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="panier_parent d-none d-lg-block col-lg-2 mt-1 d-flex align-items-center justify-content-center">
                        <div className="row w-100">
                            <div className="panier col-4 d-flex position-relative align-items-center">
                                <Link to="/Cart" style={{ color: "black" }}>
                                    <img className="img-fluid" src={Panier} alt="" />
                                    <span
                                        className="position-absolute translate-middle badge bottom-50 end-0 rounded-pill bg-danger panier_length"
                                        style={{
                                            fontSize: "14px",
                                            minWidth: "20px",

                                        }}
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

                    <div className="col-md-1 mt-2 d-none d-lg-block">
                        <div className="row">
                            <Link className="lien_aide col-6" to="/aide&Faq">
                                <img className="img-fluid aide" src={question} alt="" />
                            </Link>
                            <div className="col-6 d-none d-sm-block p-0 mt-1">
                                <p className="mb-1 text-black mon_compte">Aide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ToastContainer global du composant (meilleur emplacement que dans la dropdown) */}
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
        </>
    );
};

export default Navbar2;
