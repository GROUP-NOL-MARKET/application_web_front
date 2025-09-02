import React from "react";
import "../../Styles/footer.css";
import { Form, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-4 col-sm-6">
            <h3>Infos pratiques</h3>
            <div className=" p-0">
              <div>
                <a href=" " className="a_footer">
                  Points fidélité
                </a>
              </div>
              <div>
                <a href=" " className="a_footer">
                  Accumulez des points à chaque achat
                </a>
              </div>

              <div>
                <a href=" " className="a_footer">
                  Consultez votre solde de points dans votre compte
                </a>
              </div>
              <div>
                <a href=" " className="a_footer">
                  Conditions d'utilisation des points
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3>Liens utiles</h3>
            <div className="p-0">
              <div>
                <a href=" " className="a_footer">
                  Politique de confidentialité
                </a>
              </div>
              <div>
                <a href=" " className="a_footer">
                  Conditions d'utilisation
                </a>
              </div>
              <div>
                <a href=" " className="a_footer">
                  Mentions légales
                </a>
              </div>
              <div>
                <a href="application_web_front/aide&Faq" className="a_footer">
                  FAQ
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3>A Propos</h3>
            <div className=" p-0">
              <div className=" ">
                <a href=" " className="a_footer">
                  Livraisons et retours
                </a>
              </div>
              <div>
                <a href=" " className="a_footer">
                  Services clients
                </a>
              </div>
              <div>
                <a href=" " className="a_footer">
                  Histoires et valeurs
                </a>
              </div>
              <div>
                <a href=" " className="a_footer">
                  Nos boutiques
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <h3>Bulletin</h3>
            <div className="p-1">
              <div>Inscrivez-vous à notre bulletin d'information</div>
              <div>Recevez les dernières nouvelles et offres</div>
              <div>Ne manquez pas nos promotions exclusives</div>
            </div>
            <div>
              <form method="post">
                <Form.Control type="email" placeholder="Votre email" />
                <Button
                  type="submit"
                  style={{ backgroundColor: "#0066BD" }}
                  className="mt-2"
                >
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
