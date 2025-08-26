import { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../Styles/Navbar.css";
import { AuthContext, AuthProvider } from "../../AuthContext";

const Navbar3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  // Menu pour le comportement dropdown 

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
  return (
    <AuthProvider>
      <div>
        <div className="navigation_produit d-none d-md-block  overflow-hidden">
          {!isLoggedIn ? (

            // Quand l'utilisateur est connecté : la partie menu 

            <div className="container h-100">
              <div className="h-100 row d-flex align-items-center category-menu">
                <div
                  className=" col-md-4 col-lg-3 g-0  dropdown d-flex align-items-center"
                  ref={dropdownRef}
                  style={{
                    backgroundColor: "#FA7F1B",
                    minHeight: "100%",
                    overflowY: "auto",
                  }}
                >

                   {/* Le content du dropdown  */}

                  <div
                    className="col-md-2 dropdown_button_navbar3"
                    style={{
                      
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={toggleDropdown}
                  >
                    <FontAwesomeIcon
                      icon={faBars}
                      size="2x"
                      style={{ color: "white" }}
                    ></FontAwesomeIcon>
                  </div>

                    {/* Text toutes les catégories  */}

                  <div
                    className="dropdown-toggle text-white col-md-8 nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={toggleDropdown}
                  >
                    Toutes les catégories

                    {/* Liste des catégories  */}

                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      style={{ position: "absolute", zIndex: "99" }}
                    >
                      <li className="nav-item">
                        <Link to="/Animalerie " className="nav-link">
                          Animalerie
                        </Link>
                      </li>
                      <li>
                        <Link to="/Epicerie" className="nav-link">
                          Epicerie
                        </Link>
                      </li>
                      <li>
                        <Link to="/Droguerie" className="nav-link">
                          Droguerie
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Les autres liens de navigations du navbar3 */}

                <div className="col-md-8 d-grid gap-5 d-flex align-items-center">
                  <Link
                    to={"/"}
                    className="text-white nav-link d-none d-lg-block"
                    style={{ textDecoration: "none" }}
                  >
                    Accueil
                  </Link>
                  <Link
                    to={"/"}
                    className="text-white nav-link "
                    style={{ textDecoration: "none" }}
                  >
                    A propos
                  </Link>
                  <Link
                    to={"/"}
                    className="text-white nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Services
                  </Link>
                  <Link
                    to={"/"}
                    className="text-white nav-link"
                    style={{ textDecoration: "none" }}
                  >
                    Achats
                  </Link>
                  <Link
                    to={"/"}
                    className="text-white nav-link justify-content-center"
                    style={{ textDecoration: "none" }}
                  >
                    Produits
                  </Link>
                  <Link
                    to={"/"}
                    className="text-white nav-link d-none d-lg-block"
                    style={{ textDecoration: "none" }}
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
};

export default Navbar3;
