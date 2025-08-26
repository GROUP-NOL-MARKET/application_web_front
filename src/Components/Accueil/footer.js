import React from "react";
import "../../Styles/footer.css";
import {Form, Button} from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-4 col-sm-6">
            <h3>Infos pratiques</h3>
            <ul className="list-unstyled p-2">
              <li>Points fidélité</li>
              <li>Accumulez des points à chaque achat</li>
              <li>Utilisez vos points pour des réductions</li>
              <li>Consultez votre solde de points dans votre compte</li>
              <li>Conditions d'utilisation des points</li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3>Liens utiles</h3>
            <ul className="list-unstyled p-2">
              <li>Politique de confidentialité</li>
              <li>Conditions d'utilisation</li>
              <li>Mentions légales</li>
              <li><a href="/aide&Faq">FAQ</a></li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-6">
            <h3>A Propos</h3>
            <ul className="list-unstyled p-2">
              <li>Services clients</li>
              <li>Livraisons et retours</li>
              <li>Histoires et valeurs</li>
              <li>Nos boutiques</li>
            </ul>
          </div>
          <div className="col-md-4 col-sm-6">
            <h3>Bulletin</h3>
            <ul className="list-unstyled p-2">
              <li>Inscrivez-vous à notre bulletin d'information</li>
              <li>Recevez les dernières nouvelles et offres</li>
              <li>Ne manquez pas nos promotions exclusives</li>
              <form method="post">
                <Form.Control type="email" placeholder="Votre email" />
                <Button type="submit" style={{backgroundColor:"#0066BD"}}>Envoyer</Button>
              </form>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
