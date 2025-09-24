
import "../../../Styles/Navbar.css";
import { sous_category_product } from "../../Product_Data";

const Navbar3 = () => {
  return (
    <div>
      <div className="navigation_produit border border-1 shadow-sm">

        <div className="d-flex flex-column category-menu p-1">
          <div className="dropdown">
            {/* Le content du dropdown  */}
            <div
              className="dropdown-toggle text-white mt-3"
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

          <div className="menu-scroll d-flex flex-column align-items-center">
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
                    {item.sous_category.map((index) => (
                      <a href=" " className="text-white">
                        {index}
                      </a>
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
                <a href="/" className="text-white category_product_name">
                  A propos
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="text-white category_product_name">
                  Services
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="text-white category_product_name">
                  Achats
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="text-white category_product_name ">
                  Produits
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="text-white category_product_name mt-2">
                  Blog
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
