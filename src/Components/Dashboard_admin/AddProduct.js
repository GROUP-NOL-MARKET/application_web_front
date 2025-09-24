import React, { useContext } from "react";
import Entete from "./dataset/Entete";
import FooterDashboard from "./dataset/FooterDashboard";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  FormSelect,
} from "react-bootstrap";
import bouteille_vin from "../assets/Images/bouteille_vin.png";

const AddProduct = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="container-fluid">
      {/* Entete  */}

      <Entete title="Ajouter un produit" />

      {/* Premier content  */}

      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-8">
            <p className="texte_brut">
              Produits: Tous (18.000) |
              <span style={{ color: "blue" }}> Publiés: </span>(17.000) |{" "}
              <span style={{ color: "blue" }}> Supprimés: </span>(500) |{" "}
              <span style={{ color: "blue" }}> Brouillons: </span>(500)
            </p>
          </div>
          <div className="offset-2 col texte_brut fw-bold d-flex justify-content-end">
            Produits vus : 1/2500
          </div>
        </div>
      </div>

      {/* Troisième content ou content général  */}

      <div
        className="col shadow-sm border border-1 p-2"
        style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
      >
        <h5 className="taux_moyen fw-bold">Paramètres de produit</h5>
        <div className="row">
          <div className="col-8 me-2">
            <h6 className="petit_titre" style={{ opacity: "0.6" }}>
              Image du produit
            </h6>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-5 me-2 border border-1 bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "200px" }}
                >
                  <img
                    src={bouteille_vin}
                    alt=""
                    className="img-fluid h-100 w-auto"
                  />
                </div>
                <div
                  className="col me-2 border border-1 bg-light d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "200px" }}
                >
                  <FontAwesomeIcon icon={faImage} />
                  <a href=" " style={{ textDecoration: "none" }}>
                    Parcourir Image
                  </a>
                </div>
                <div className="col-3">
                  <ul
                    className="list-unstyled d-flex flex-column"
                    style={{ height: "200px" }}
                  >
                    <li className="border h-50 border-1 bg-light d-flex flex-column align-items-center justify-content-center">
                      <FontAwesomeIcon icon={faImage} />
                      <a href=" " style={{ textDecoration: "none" }}>
                        Parcourir...
                      </a>
                    </li>
                    <li className="border h-50 border-1 mt-2 bg-light d-flex flex-column align-items-center justify-content-center">
                      <FontAwesomeIcon icon={faImage} />
                      <a href=" " style={{ textDecoration: "none" }}>
                        Parcourir...
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="">
                <h5 className="petit_titre text-primary">
                  Plus d'options de gallerie
                </h5>
                <p className="texte_brut text-justify">
                  Tous les formats de fichier sont pris en charge et les
                  fichiers sont automatiquement optimisés pour assurer un
                  affichage rapide et une qualité optimale sur tous les écrans.
                  Vous pouvez également modifier les options pour aller plus
                  vite dans le choix de votre image.
                </p>
                <h5 className="petit_titre text-primary">
                  Fichier joint
                  <FontAwesomeIcon icon={faPaperclip} />{" "}
                </h5>
                <Form>
                  <div className="row">
                    <FormGroup className="col-4 me-2">
                      <FormLabel>Attributs</FormLabel>
                      <FormSelect aria-label="Default select label">
                        <option>Simple</option>
                        <option value={1}>Double</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup className="col-4 me-2">
                      <FormLabel>L*W*H pouces</FormLabel>
                      <FormControl />
                    </FormGroup>
                    <FormGroup className="col">
                      <FormLabel>Taille</FormLabel>
                      <FormControl />
                    </FormGroup>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          {/* Formulaire d'ajout  de produit  */}

          <div className="col">
            <form method="post">
              <FormGroup>
                <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                  Nom du produit
                </FormLabel>
                <FormControl />
              </FormGroup>
              <div className="row mt-2">
                <FormGroup className="col-6 me-2">
                  <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                    Reférence
                  </FormLabel>
                  <FormControl />
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                    Prix
                  </FormLabel>
                  <FormControl />
                </FormGroup>
              </div>
              <div className="row mt-2">
                <FormGroup className="col-6 me-2">
                  <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                    Famille
                  </FormLabel>
                  <FormControl />
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                    Catégories
                  </FormLabel>
                  <FormControl />
                </FormGroup>
              </div>
              <div className="row mt-2">
                <FormGroup className="col-6 me-2">
                  <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                    Quantité
                  </FormLabel>
                  <FormControl />
                </FormGroup>
                <FormGroup className="col">
                  <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                    Sous catégorie
                  </FormLabel>
                  <FormControl />
                </FormGroup>
              </div>
              <FormGroup className="mt-2">
                <FormLabel className="petit_titre" style={{ opacity: "0.7" }}>
                  Description
                </FormLabel>
                <FormControl as="textarea" rows={4} />
              </FormGroup>
              <div className="container-fluid">
                <div className="row mt-2">
                  <Button className="col-6 me-2 texte_brut fw-bold btn-dark">
                    Brouillon
                  </Button>
                  <Button className="col texte_brut fw-bold">Publier</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer  */}

      <FooterDashboard />
    </div>
  );
};

export default AddProduct;
