import React from "react";
import "../../Styles/footer.css";
import { Form, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-4 col-sm-6">
            <h3 className="taux_moyen">Infos pratiques</h3>
            <div className=" p-0">
              <div>
                <a href=" " className="a_footer texte_brut">
                  Points fidélité
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut">
                  Accumulez des points à chaque achat
                </a>
              </div>

              <div>
                <a href=" " className="a_footer texte_brut">
                  Consultez votre solde de points dans votre compte
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut">
                  Conditions d'utilisation des points
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3 className="taux_moyen">Liens utiles</h3>
            <div className="p-0">
              <div>
                <a href=" " className="a_footer texte_brut">
                  Politique de confidentialité
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut">
                  Conditions d'utilisation
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut">
                  Mentions légales
                </a>
              </div>
              <div>
                <a href="application_web_front/aide&Faq" className="a_footer texte_brut">
                  FAQ
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3 className="taux_moyen">A Propos</h3>
            <div className=" p-0">
              <div className=" ">
                <a href=" " className="a_footer texte_brut">
                  Livraisons et retours
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut">
                  Services clients
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut">
                  Histoires et valeurs
                </a>
              </div>
              <div>
                <a href=" " className="a_footer texte_brut">
                  Nos boutiques
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <h3 className="taux_moyen">Bulletin</h3>
            <div className="p-1">
              <div className="texte_brut">Inscrivez-vous à notre bulletin d'information</div>
              <div className="texte_brut">Recevez les dernières nouvelles et offres</div>
              <div className="texte_brut">Ne manquez pas nos promotions exclusives</div>
            </div>
            <div className="">
              <form method="post">
                <div className="row">
                  <div className="col-8 me-2">
                    <Form.Control type="email" placeholder="Votre email"  />
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
      </div>
    </div>
  );
};

export default Footer;
