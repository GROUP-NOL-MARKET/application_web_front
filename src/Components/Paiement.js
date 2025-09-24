import { useContext, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import { PanierContext } from "../Store/Panier_context";

const Paiement = () => {
  const { products } = useContext(PanierContext);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row">
          <div className="col-8 my-4 me-3 bg-white shadow-sm rounded-3 p-4 border border-1">
            {/* Informations sur le shipment adresse   */}

            <h2 className="taux_moyen">Informations domicile client</h2>
            <Form className="w-100" method="post">
              <FormGroup>
                <FormLabel className="label_register">Ville</FormLabel>
                <FormControl placeholder="Cotonou" className="input_register" />
              </FormGroup>
              <FormGroup>
                <FormLabel className="label_register">Quartier</FormLabel>
                <FormControl
                  placeholder="Fidjrossè"
                  className="input_register"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel className="label_register">Rue</FormLabel>
                <FormControl placeholder="2536" className="input_register" />
              </FormGroup>
              <FormGroup>
                <FormLabel className="label_register">Numéro maison</FormLabel>
                <FormControl placeholder="236" className="input_register" />
              </FormGroup>
              <FormGroup>
                <FormLabel className="label_register">Localisation</FormLabel>
                <FormControl as="textarea" rows={4} />
              </FormGroup>
              <Button className="mt-2">Envoyer</Button>
            </Form>
          </div>
          {/* Partie produit acheté  */}

          <div className="my-4 col">
            {/* Les différents produits du panier  */}
            <div className=" shadow-sm rounded-3 bg-white p-2 border border-1">
              {products.map((product) => (
                <div className="row" key={product.id}>
                  <div className="col-6 me-2 d-flex align-items-center image_product">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col">
                    <div className="marque text-black-50">{product.marque}</div>
                    <div className="name">{product.name}</div>
                    <div className="type mt-2">Type : {product.type}</div>
                    <div className="type">Quantité : {product.quantity}</div>
                    <div className="disponibilité">
                      Disponibilité : {product.disponibilité}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Les prix après remise, rabais et taxe  */}

            <div className="shadow-sm bg-white border border-1 rounded-3 p-3 mt-2">
              <div className="row">
                <FormLabel className="title_prix_total col-7">
                  Prix total:
                </FormLabel>
                <h2 className="taux_moyen col">{totalPrice} FCFA</h2>
              </div>

              <div className="row">
                <div className="col-7 title_menu_cart">Total HT :</div>
                <div className="col">{totalPrice} fcfa</div>
              </div>
              <div className="row">
                <div className="col-7 title_menu_cart">Rabais :</div>
                <div className="col">0%</div>
              </div>
              <div className="row">
                <div className="col-7 title_menu_cart">Remise :</div>
                <div className="col">gratuit</div>
              </div>
              <div className="row ">
                <div className="col-7 title_menu_cart">Prix total TTC :</div>
                <div className="col">{totalPrice} fcfa</div>
              </div>
              <div className="row">
                <h2 className="title_menu_cart col-7">
                  Adresse de livraison :
                </h2>
                <p className="col">Ville, quartier, Rue...</p>
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
