import { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { PanierContext } from "../Store/Panier_context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../Styles/Cart.css";
import Offres from "./Accueil/Offres";

const Cart = () => {
  const { products, updateProductQuantity } = useContext(PanierContext);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  // Réponse avec toast

  const handleResponse = () => {
    toast.error("Votre panier est vide !");
  };

  // Pour l'effet du dropdown

  const [isOpen, setIsOpen] = useState(false);
  const handledropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="cart">
      <div className="container">
        <div className="category_button ">
          <Button
            onClick={handledropdown}
            ref={dropdownRef}
            className=" mt-4 mb-2"
          >
            <FontAwesomeIcon icon={faBars} />
            Categories
            <FontAwesomeIcon icon={faChevronDown} />
            <ul
              style={{ listStyle: "none" }}
              className={`dropdown-menu ${isOpen ? "show" : ""}`}
            >
              <li>Animalerie</li>
              <li>Droguerie</li>
              <li>Produits locaux</li>
              <li>Boissons</li>
              <li>Epicerie</li>
            </ul>
          </Button>
        </div>
        <div className="row">
          <div className="cart_content col-md-8 d-flex flex-column mt-4 mb-4">
            <div className="row">
              <div className="col-md-6 table_title">Produits</div>
              <div className="col-md-2 table_title">Prix</div>
              <div className="col-md-2 table_title">Quantité</div>
              <div className="col-md-2 table_title">Prix total</div>
            </div>

            {/* Contenu du tableau qui sera soit un vide ou des éléments */}

            <div className="d-flex w-100 h-100 justify-content-center align-items-center m-2">
              {products.length === 0 && (
                <div>
                  <p className="cart_empty">Votre panier est vide.</p>
                </div>
              )}
            </div>
            {products.length > 0 && (
              <div className="Produits">
                {products.map((product) => (
                  <div>
                    <hr
                      style={{ color: "#FA7F1B", height: "0px" }}
                      className="m-0"
                    />
                    <div key={product.id} className="row mt-3">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6 d-flex align-items-center image_product">
                            <img
                              alt={product.name}
                              src={product.image}
                              className="w-100 h-auto"
                            />
                          </div>
                          <div className="col-md-6">
                            <div className="marque text-black-50">
                              {product.marque}
                            </div>
                            <div className="name">{product.name}</div>
                            <div className="type mt-4">
                              Type : {product.type}
                            </div>
                            <div className="disponibilité">
                              Disponibilité : {product.disponibilité}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex align-items-center">
                        <p className="price"> {product.price} FCFA</p>
                      </div>
                      <div className="col-md-2 row d-flex align-items-center">
                        <Button
                          onClick={() => updateProductQuantity(product.id, -1)}
                          className="col-md-4 button_ajout"
                        >
                          -
                        </Button>
                        <div className="product_quantity col-md-4">
                          {product.quantity}
                        </div>
                        <Button
                          onClick={() => updateProductQuantity(product.id, 1)}
                          className="col-md-4 button_ajout"
                        >
                          +
                        </Button>
                      </div>
                      {/* Prix total d'un produit */}

                      <div className="col-md-2 d-flex align-items-center mx-auto">
                        <p className="totalPriceProduct ">{totalPrice} FCFA</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prix total du panier  */}
            {/* <div className="col-md-4">
              {products.length > 0 && (
                <p id="cart-total-price">
                  Montant total :{" "}
                  <strong>
                    {totalPrice.toFixed(2)} Euro{totalPrice > 1 ? "s" : ""}
                  </strong>
                </p>
              )}
            </div> */}
          </div>
          {/* La deuxième partie montrant le prix total des produits */}
          <div className="offset-1 col-md-3 mt-3 mb-4 total_product_content">
            {/* Pour un code promo existant */}

            <div className="coupon_code w-100">
              <Form className="w-100">
                <FormLabel className="title_prix_total">
                  Code de points bonus
                </FormLabel>
                <p className="subtitle_coupon_code"></p>
                <FormControl placeholder="XXX-XXX" />
                <Button className="coupon_code_button mt-3 w-100">
                  Appliquer
                </Button>
              </Form>
            </div>

            {/* Pour la somme totale des produits  */}

            <div className="Cart_total w-100 mt-4">
              <div className="w-100">
                <FormLabel className="title_prix_total">Prix total</FormLabel>
                <div className="row">
                  <div className="col-md-7 title_menu_cart">Total HT</div>
                  <div className="col-md-5">{totalPrice} fcfa</div>
                </div>
                <div className="row">
                  <div className="col-md-7 title_menu_cart">Rabais</div>
                  <div className="col-md-5">0%</div>
                </div>
                <div className="row">
                  <div className="col-md-7 title_menu_cart">Remise</div>
                  <div className="col-md-5">Free</div>
                </div>
                <div className="row ">
                  <div className="col-md-7 prix_TTC">Prix total TTC</div>
                  <div className="col-md-5 ">{totalPrice} fcfa</div>
                </div>
                {totalPrice > 1 ? (
                  <Button className="achat_button mt-3 w-100" href="/Paiement">Acheter</Button>
                ) : (
                  <Button
                    className="achat_button mt-3 w-100"
                    disabled
                    onClick={handleResponse}
                  >
                    Acheter
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Offres />
      </div>
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
    </div>
  );
};

export default Cart;
