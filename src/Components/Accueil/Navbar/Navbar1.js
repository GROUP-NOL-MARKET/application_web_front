import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../../Styles/Navbar.css";
import { AuthContext, AuthProvider } from "../../AuthContext";

const Navbar1 = () => {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownRef = useRef(null);

  // Pour l'effet en dehors du dropdown

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Ferme le menu si on clique ailleurs
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <AuthProvider>
      <div className="bg-light shadow-sm d-flex align-items-center navbar navbar-expand-lg overflow-hidden">
        {/* Quand l'utilisateur n'est pas connecté  le premier navbar*/}

        {!isLoggedIn ? (
          <div className="container-fluid">
            <div className=" tel col-12 col-md-12 col-lg-5 mx-sm-3 d-sm-block navbar-brand">
              <div className="row">
                <div className="col-6 d-none d-sm-block">
                  <div className="row p-0 d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faPhone}
                      size="2x"
                      className="col-1 m-0"
                    />
                    <h6 className="col-sm-8 col-xs-8 px-0 fw-semibold flex-lg-wrap">
                      Appelez-nous au:(+229) 01 65 00 29 29
                    </h6>
                  </div>
                </div>

                <button
                  className="navbar-toggler d-lg-none offset-sm-3 offset-9 col-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                >
                  <span
                    className="navbar-toggler-icon"
                    style={{ color: "orange" }}
                  ></span>
                </button>
                <div
                  className="collapse navbar-collapse d-lg-none"
                  id="navbarCollapse"
                >
                  <button
                    type="button"
                    className="close-btn"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                  >
                    ✖
                  </button>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="col-md-1">Accueil</li>
                    <li className="col-md-1">
                      <a href="application_web_front/About">A propos</a>
                    </li>
                    <li className="col-md-1">Services</li>
                    <li className="col-md-1">
                      <a href="application_web_front/Contact">Contact</a>
                    </li>
                    <li className="col-md-1">Achat</li>
                    <li className="col-md-1">Produits</li>
                    <li className="col-md-1"><a href="aide&Faq">Faq & aide</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Les parties contact, a propos et achat immédiat  */}

            <div className="offset-3 col-12 text-wrap  d-flex align-items-center d-grid gap-4 nav-link">
              <h6 className="  fw-semibold nav-item d-none d-lg-block">
                <Link
                  to="application_web_front/Contact"
                  className="nav-link"
                  style={{ color: active === "Contact" ? "orange" : "black" }}
                  onClick={() => setActive("Contact")}
                >
                  Contactez-nous
                </Link>
              </h6>
              <h6 className=" fw-semibold nav-item d-none d-lg-block">
                <Link
                  to="application_web_front/About"
                  className="nav-link"
                  style={{ color: active === "About" ? "orange" : "black" }}
                  onClick={() => setActive("About")}
                >
                  A propos
                </Link>
              </h6>
              <div className=" m-0 p-1 fw-semibold nav-item d-none d-lg-block">
                <Button
                  href="application_web_front/products"
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
        ) : (
          <div></div>
        )}
      </div>
    </AuthProvider>
  );
};

export default Navbar1;
