import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormControl, FormLabel, Spinner } from "react-bootstrap";
import corbeille from "./assets/Images/icone/trash.png";
import DeleteIcon from '@mui/icons-material/Delete';
import { PanierContext } from "../Store/Panier_context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../Styles/Cart.css";
import Offres from "./Accueil/Offres";
import ValiderSuppression from "./ValiderSuppression";
import { AuthContext } from "./AuthContext";

const Cart = () => {
  const { products, updateProductQuantity } = useContext(PanierContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const openPopUp = (message) => {
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  // Réponse avec toast

  const handleResponse = () => {
    toast.error("Votre panier est vide !");
  };

  const handleNavigate = () => {
    setLoading(true);
    navigate("/paiement");
    setLoading(false);
  };

  const handleRedirect = () => {
    navigate("/login");
  };
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="cart">
      <div className="container">
        <div className="container">
          <div className="row">

            {/* Desktop  */}

            <div className="cart_content col-8  my-4 border border-1 d-none d-md-flex  flex-column">
              <div className="row">
                <div className="col-6 table_title">
                  Produits{" "}

                </div>
                <div className="col-2 table_title">Prix</div>
                <div className="col-md-2 table_title d-flex justify-content-center">
                  Quantité
                </div>
                <div className="col-md-2 table_title">
                  Prix total
                </div>
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
                    <div key={product.id}>
                      <hr
                        style={{ color: "#FA7F1B", height: "0px" }}
                        className="m-0"
                      />
                      <div className="row mt-3">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-6 d-flex align-items-center image_product">
                              <img
                                alt={product.name}
                                src={product.image}
                                className="w-100 h-100"
                              />
                            </div>
                            <div className="col-6">
                              <div className="marque text-black-50">
                                {product.marque}
                              </div>
                              <div className="name">{product.name}</div>
                              <div className="type d-none d-md-block">
                                Type : {product.type}
                              </div>
                              <div className="disponibilité d-none d-md-block">
                                Disponibilité : {product.disponibilité}
                              </div>
                              <div>
                                <img
                                  src={corbeille}
                                  alt="Supprimer le produit"
                                  title="Supprimer ce produit"
                                  className="product-trash"
                                  onClick={() =>
                                    updateProductQuantity(
                                      product.id,
                                      -product.quantity
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2 d-flex align-items-center">
                          <p className="price"> {product.price} FCFA</p>
                        </div>
                        <div className="col-2 d-flex align-items-center quantity">
                          <Button
                            onClick={() =>
                              updateProductQuantity(product.id, -1)
                            }
                            className="col-3 button_ajout d-flex justify-content-center"
                          >
                            -
                          </Button>
                          <div className="product_quantity col-4 d-flex justify-content-center">
                            {product.quantity}
                          </div>
                          <Button
                            onClick={() => updateProductQuantity(product.id, 1)}
                            disabled={product.quantity >= product.stock}
                            className="col-3 button_ajout d-flex justify-content-center"
                            style={{
                              cursor:
                                product.quantity >= product.stock
                                  ? "not-allowed"
                                  : "pointer",
                              opacity:
                                product.quantity >= product.stock ? 0.5 : 1,
                            }}
                          >
                            +
                          </Button>
                        </div>
                        {/* Prix total d'un produit */}

                        <div className="col-2 d-flex align-items-center">
                          <p className="totalPriceProduct">
                            {product.price * product.quantity} FCFA
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* Mobile  */}

            <div className="cart_content col-lg-8 col-12 d-md-none d-flex flex-column mt-4 mb-4 border border-1">
              <div className="row">
                <div className="col-6 table_title">
                  Produits{" "}

                </div>

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
                    <div key={product.id}>
                      <hr
                        style={{ color: "#FA7F1B", height: "0px" }}
                        className="m-0"
                      />
                      <div className="row mt-3">
                        <div className="col-4 d-flex align-items-center image_product">
                          <img
                            alt={product.name}
                            src={product.image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col ms-2 d-flex flex-column">
                          <div className="name">{product.name}</div>
                          <div className="row mt-2">
                            <div className="col-7 d-flex flex-column">
                              <h5 className='price fw-bolder'>Prix unitaire :</h5>
                              <p className="price"> {product.price} FCFA</p>
                            </div>
                            <div className="col d-flex align-items-center quantity">

                              <div className="d-flex flex-column">
                                <h5 className="price fw-bolder">Quantité : </h5>
                                <div className="row">
                                  <Button
                                    onClick={() =>
                                      updateProductQuantity(product.id, -1)
                                    }
                                    className="col-3 button_ajout"
                                  >
                                    <span>-</span>
                                  </Button>
                                  <div className="product_quantity col-4 d-flex justify-content-center">
                                    {product.quantity}
                                  </div>
                                  <Button
                                    onClick={() => updateProductQuantity(product.id, 1)}
                                    disabled={product.quantity >= product.stock}
                                    className="col-3 button_ajout d-flex justify-content-center"
                                    style={{
                                      cursor:
                                        product.quantity >= product.stock
                                          ? "not-allowed"
                                          : "pointer",
                                      opacity:
                                        product.quantity >= product.stock ? 0.5 : 1,
                                    }}
                                  >
                                    <span>+</span>
                                  </Button>
                                </div>

                              </div>

                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-6 me-2 d-flex flex-column">
                              <h5 className="totalPriceProduct fw-bolder">Prix total : </h5>
                              <p className="totalPriceProduct">

                                {product.price * product.quantity} FCFA
                              </p>
                            </div>
                            <div className="col d-flex align-items-center justify-content-center">

                              <button className=" w-100 border-0 rounded-3" onClick={() =>
                                updateProductQuantity(
                                  product.id,
                                  -product.quantity
                                )
                              } style={{ color: "white", backgroundColor: "red", fontSize: "12px" }}>
                                Supprimer
                              </button>
                            </div>
                          </div>

                        </div>



                      </div>
                    </div>
                  ))}
                  <button
                    className="border-0 rounded-4 p-1 my-2 price"
                    onClick={() => products.length > 0 && openPopUp()}
                    style={{ color: 'white', backgroundColor: "red" }}
                  >
                    Vider le panier
                    <DeleteIcon
                      style={{
                        width: 20,
                        cursor: products.length > 0 ? "pointer" : "not-allowed",
                        opacity: products.length > 0 ? 1 : 0.5,
                      }}

                    />
                  </button>
                </div>
              )}
            </div>



            {/* La deuxième partie montrant le prix total des produits */}
            <div className="offset-lg-1 col-lg-3 col-12 mt-3 mb-4 total_product_content border border-1">
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

              <div className="Cart_total w-100 mt-4 ">
                <div className="w-100">
                  <FormLabel className="title_prix_total">Prix total</FormLabel>
                  <div className="row">
                    <div className="col-7 title_menu_cart">Total HT</div>
                    <div className="col-5">{totalPrice} FCFA</div>
                  </div>
                  <div className="row">
                    <div className="col-7 title_menu_cart">Rabais</div>
                    <div className="col-5">0%</div>
                  </div>
                  <div className="row">
                    <div className="col-7 title_menu_cart">Remise</div>
                    <div className="col-5">Free</div>
                  </div>
                  <div className="row ">
                    <div className="col-7 prix_TTC">Prix total TTC</div>
                    <div className="col-5 prix_TTC ">{totalPrice} FCFA</div>
                  </div>
                  {totalPrice < 1 ? (
                    // Condition 1: Panier vide (ou prix <= 1)
                    <Button
                      className="achat_button mt-3 w-100"
                      onClick={handleResponse}
                    >
                      Acheter
                    </Button>
                  ) : // Les deux autres conditions : Le prix est > 1
                    isLoggedIn ? (
                      // Condition 2: Panier non vide ET connecté
                      <Button
                        className="achat_button text-white mt-3 w-100"
                        onClick={handleNavigate}
                      >
                        {loading ? <Spinner /> : "Acheter"}
                      </Button>
                    ) : (
                      // Condition 3: Panier non vide ET déconnecté
                      <Button
                        className="achat_button mt-3 w-100"
                        onClick={handleRedirect} // Redirection vers /login
                      >
                        Acheter
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Offres />
      </div>

      {showPopUp && <ValiderSuppression closePopUp={closePopUp} />}
    </div>
  );
};

export default Cart;
