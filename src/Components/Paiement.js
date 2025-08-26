import { useContext, useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { PanierContext } from "../Store/Panier_context";

const Paiement = () => {
  const { products, updateProductQuantity } = useContext(PanierContext);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row">
          <div
            className="col-md-8 paiement_body mt-4"
            style={{
              borderRadius: "15px",
              backgroundColor: "white",
              boxShadow: "5px",
            }}
          >
            {/* Informations sur le shipment adresse   */}

            <h2>Informations domicile client</h2>
            <Form className="w-100" method="post">
              <FormLabel>Ville</FormLabel>
              <FormControl placeholder="Cotonou" />
              <FormLabel>Quartier</FormLabel>
              <FormControl placeholder="Fidjrossè" />
              <FormLabel>Rue</FormLabel>
              <FormControl placeholder="2536" />
              <FormLabel>Numéro maison</FormLabel>
              <FormControl placeholder="236" />
              <FormLabel>Localisation</FormLabel>
              <FormControl as="textarea" rows={3} />
              <Button>Envoyer</Button>
            </Form>
          </div>
        </div>

        {/* Partie produit acheté  */}

        <div
          className="offset-1 col-md-3 product_body"
          style={{
            borderRadius: "15px",
            backgroundColor: "white",
            boxShadow: "5px",
          }}
        >
          <div>
            {/* Les différents produits du panier  */}

            {products.map((product) => (
              <div className="row" key={product.id}>
                <div className="col-md-6 d-flex align-items-center image_product">
                  <img
                    alt={product.name}
                    src={product.image}
                    className="w-100 h-auto"
                  />
                </div>
                <div className="col-md-6">
                  <div className="marque text-black-50">{product.marque}</div>
                  <div className="name">{product.name}</div>
                  <div className="type mt-4">Type : {product.type}</div>
                  <div className="disponibilité">
                    Disponibilité : {product.disponibilité}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Les prix après remise, rabais et taxe  */}

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
              <div>
                <h2>Adresse de livraison</h2>
              </div>
              <Button className="paiement_button w-100">Payer</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paiement;
