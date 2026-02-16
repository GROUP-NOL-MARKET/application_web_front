import React from "react";
import "../../Styles/footer.css";
import { Form, Button } from "react-bootstrap";
import img_entreprise from "../assets/Images/Logo_entreprise-removebg-preview.webp"

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-md-4 col-sm-6">
            <h3 className="taux_moyen mt-2 mt-lg-0">Infos pratiques</h3>
            <div className=" p-0">
              <div>
                <a href=" " className="a_footer texte_brut text-decoration-none">
                  Points fidélité
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut text-decoration-none">
                  Accumulez des points à chaque achat
                </a>
              </div>

              <div>
                <a href=" " className="a_footer texte_brut text-decoration-none">
                  Consultez votre solde de points dans votre compte
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut text-decoration-none">
                  Conditions d'utilisation des points
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3 className="taux_moyen mt-2 mt-lg-0">Liens utiles</h3>
            <div className="p-0">
              <div>
                <a href="/confidentialite" className="a_footer texte_brut text-decoration-none">
                  Politique de confidentialité
                </a>
              </div>
              <div>
                <a href="/conditionUtilisation" className="a_footer texte_brut text-decoration-none">
                  Conditions d'utilisation
                </a>
              </div>
              <div>
                <a href="/mentions-legales" className="a_footer texte_brut text-decoration-none">
                  Mentions légales
                </a>
              </div>
              <div>
                <a href="/aide&Faq" className="a_footer texte_brut text-decoration-none">
                  FAQ
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3 className="taux_moyen mt-2 mt-lg-0">A Propos</h3>
            <div className=" p-0">
              <div className=" ">
                <a href="/politique-livraison" className="a_footer texte_brut text-decoration-none">
                  Livraisons et retours
                </a>
              </div>
              <div>
                <a href="/Contact" className="a_footer texte_brut text-decoration-none">
                  Services clients
                </a>
              </div>
              <div>
                <a href="/About" className="a_footer texte_brut text-decoration-none">
                  Histoires et valeurs
                </a>
              </div>
              <div>
                <a href="/Contact" className="a_footer texte_brut text-decoration-none">
                  Nos boutiques
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <h3 className="taux_moyen mt-2 mt-lg-0">Bulletin</h3>
            <div className="p-1">
              <div className="texte_brut">Inscrivez-vous à notre bulletin d'information</div>
              <div className="texte_brut">Recevez les dernières nouvelles et offres</div>
              <div className="texte_brut">Ne manquez pas nos promotions exclusives</div>
            </div>
            <div className="">
              <form method="post">
                <div className="row">
                  <div className="col-8 me-2">
                    <Form.Control type="email" placeholder="Votre email" />
                  </div>
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#0066BD" }}
                    className="col-3"
                  >
                    Envoyer
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-0">
          <p className="col-10" style={{ fontSize: "10px" }}>
            Copyright © 2025 par Nol Market. Tous droits réservés
          </p>
          <div className="col-1 d-flex align-items-center justify-content-end">
            <span style={{ fontSize: "10px" }}>
              Produit par:
            </span>
          </div>
          <div className="col-1">
            <img
              src={img_entreprise}
              alt="logo de l'entreprise"
              className="img-fluid"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
