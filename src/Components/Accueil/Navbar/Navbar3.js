import { Link, useNavigate } from "react-router-dom";
import "../../../Styles/Navbar.css";
import { sous_category_product } from "../../Product_Data";

const Navbar3 = () => {

  const navigate = useNavigate();

  const handleNavigation = (sous_category) => {
    navigate(`/products?sous_category=${encodeURIComponent(sous_category)}`);
  };

  return (
    <div>
      <div className="navigation_produit border border-1 mt-2 shadow-sm p-3">
        <div className="d-flex flex-column category-menu p-1">
          <div className="dropdown">
            {/* Le content du dropdown  */}
            <div
              className="dropdown-toggle text-white"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              Toutes les catégories
            </div>

            {/* Liste des catégories  */}
          </div>

          {/* Les autres liens de navigations du navbar3 */}

          <div className="menu-scroll d-flex flex-column ">
            <ul className="d-flex flex-column list-unstyled">
              {sous_category_product.map((item) => (
                <div key={item.category}>
                  <details className="d-flex flex-column">
                    <summary
                      to={"/"}
                      className="text-white category_product_name mt-2"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.category}
                    </summary>
                    {item.sous_category.map((index, i) => (
                      <li key={i}>

                        <div
                          onClick={() => handleNavigation(index)}
                          className="text-white text-decoration-none nav-link nav-header-3"
                        >
                          {index}
                        </div>
                      </li>
                    ))}
                  </details>
                </div>
              ))}
            </ul>
          </div>
          <div className="dropdown">
            {/* Le content du dropdown  */}
            <div
              className="dropdown-toggle text-white nav-link"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              Navigation
            </div>
          </div>
          {/* Liste des nav  */}

          <div className="mx-3">
            <ul className="d-flex flex-column list-unstyled">
              <li className="mt-2">
                <a href="/About" className="text-white category_product_name">
                  A propos
                </a>
              </li>
              <li className="mt-2">
                <a href="/aide&Faq" className="text-white category_product_name">
                  Services
                </a>
              </li>
              <li className="mt-2">
                <a href="/Cart" className="text-white category_product_name">
                  Achats
                </a>
              </li>
              <li className="mt-2">
                <a href="/all_products" className="text-white category_product_name ">
                  Produits
                </a>
              </li>
              <li className="mt-2">
                <a href="/Contact" className="text-white category_product_name mt-2">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar3;
