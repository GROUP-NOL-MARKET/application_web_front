import React from "react";
import "../Styles/Faq.css";

const Faq = () => {
  return (
    <div className="Questions">
      <div class="container">
        <h1 class="Aide mb-4 pt-5">AIDE</h1>
        <div class="accordion mt-5" id="helpAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="helpHeadingOne">
              <button
                className="accordion-button btn_aide"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#helpCollapseOne"
                aria-expanded="true"
                aria-controls="helpCollapseOne"
              >
                Comment rechercher un objet ?
              </button>
            </h2>
            <div
              id="helpCollapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="helpHeadingOne"
              data-bs-parent="#helpAccordion"
            >
              <div className="accordion-body reponse">
                Utilisez la barre de recherche en haut de la page pour entrer
                des mots-clés relatifs à l'objet que vous souhaitez louer. Vous
                pouvez aussi filtrer les résultats par catégorie, menu et
                produit.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 class="accordion-header" id="helpHeadingTwo">
              <button
                className="btn_aide accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#helpCollapseTwo"
                aria-expanded="false"
                aria-controls="helpCollapseTwo"
              >
                Comment créer un compte ?
              </button>
            </h2>
            <div
              id="helpCollapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="helpHeadingTwo"
              data-bs-parent="#helpAccordion"
            >
              <div className="accordion-body reponse">
                Cliquez sur le bouton "Incription" en haut à droite de la page.
                Remplissez le formulaire avec vos informations personnelles et
                suivez les instructions pour compléter votre inscription.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="helpHeadingThree">
              <button
                className="btn_aide accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#helpCollapseThree"
                aria-expanded="false"
                aria-controls="helpCollapseThree"
              >
                Comment effectuer un achat ?
              </button>
            </h2>
            <div
              id="helpCollapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="helpHeadingThree"
              data-bs-parent="#helpAccordion"
            >
              <div className="accordion-body reponse">
                Après avoir trouvé l'objet que vous souhaitez acheter,
                sélectionnez l'objet puis dirigez vous vers votre panier pour
                valider la commande et payer en suivant les étapes pour entrer
                vos informations de paiement et confirmer votre réservation.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="helpHeadingFour">
              <button
                className="btn_aide accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#helpCollapseFour"
                aria-expanded="false"
                aria-controls="helpCollapseFour"
              >
                Comment annuler une commande ?
              </button>
            </h2>
            <div
              id="helpCollapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="helpHeadingFour"
              data-bs-parent="#helpAccordion"
            >
              <div className="accordion-body reponse">
                Pour annuler une réservation, allez dans votre compte,
                sélectionnez "Mes commandes", et choisissez la commande que vous
                souhaitez annuler. Cliquez sur le bouton "Annuler" et suivez les
                instructions.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="helpHeadingFive">
              <button
                className="accordion-button collapsed btn_aide"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#helpCollapseFive"
                aria-expanded="false"
                aria-controls="helpCollapseFive"
              >
                Comment modifier les informations de mon compte ?
              </button>
            </h2>
            <div
              id="helpCollapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="helpHeadingFive"
              data-bs-parent="#helpAccordion"
            >
              <div className="accordion-body reponse">
                Pour modifier les informations de votre compte, connectez-vous
                et allez dans "Mon Profil". Vous pouvez mettre à jour vos
                informations personnelles, adresse, et informations de paiement.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="helpHeadingSix">
              <button
                className="accordion-button collapsed btn_aide"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#helpCollapseSix"
                aria-expanded="false"
                aria-controls="helpCollapseSix"
              >
                Comment contacter le service client ?
              </button>
            </h2>
            <div
              id="helpCollapseSix"
              class="accordion-collapse collapse"
              aria-labelledby="helpHeadingSix"
              data-bs-parent="#helpAccordion"
            >
              <div className="accordion-body reponse">
                Vous pouvez nous contacter par email à groupnolmarket@gmail.com
                ou par téléphone au + 229 65 00 29 29 . Notre support est
                disponible du lundi au dimanche, de 10h à 20h.
              </div>
            </div>
          </div>
          <div className="pb-4">
            <h1 className="FAQ mb-4 pt-5">FAQ</h1>
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button btn_aide"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Quels sont les délais de livraison ?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Les délais varient selon votre localisation : Peut durer
                    entre quelques minutes à une heure ou plus selon votre
                    localisation
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="btn_aide accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Quels types de produit puis-je acheter chez group nol market
                    ?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Vous pouvez acheter de façon générale les produits frais ,
                    les produits locaux , l'épicerie , la droguerie , les
                    boissons , la charcuterie et l'électro ménager
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed btn_aide"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Comment puis-je payer mon produit ?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Nous acceptons les paiements par les méthodes de paiement en
                    ligne sécurisées tels que Mtn ou Moov.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed btn_aide"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Quels sont les types de produit local que commercialise
                    GROUP NOL MARKET?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Les liqueurs - Les arachides - Les épices - Les miels - Les
                    tisanes & thés - Les huiles - Les sucres - Les farines - Les
                    céréales - Les cacaos - Les vins - Les chips - Les amuses
                    bouche - Les jus de fruits & sirop - Les eaux minérales &
                    eau de vie - Les produits de beauté - Les viandes fraiches
                    et fumées
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed btn_aide"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Comment devenir fournisseur à GROUP NOL MARKET ?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Pour devenir fournisseur à Nol Market il faut s'assurer de
                    l'authenticité et de la qualité de ses produits, déposer un
                    échantillon et après test concluant on commande le produit.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSeven">
                  <button
                    className="btn_aide accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    Quels sont les horaires de support client ?
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Notre support client est disponible du lundi au dimanche, de
                    10h à 20h.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingEight">
                  <button
                    className="btn_aide accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEight"
                    aria-expanded="false"
                    aria-controls="collapseEight"
                  >
                    Y a-t-il des frais supplémentaires pour l'achat en ligne ?
                  </button>
                </h2>
                <div
                  id="collapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingEight"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Oui, une caution peut être demandée selon l'objet loué. La
                    caution vous sera remboursée après la restitution de l'objet
                    en bon état.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingNine">
                  <button
                    className="btn_aide accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseNine"
                    aria-expanded="false"
                    aria-controls="collapseNine"
                  >
                    Puis-je prolonger la durée de ma location ?
                  </button>
                </h2>
                <div
                  id="collapseNine"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingNine"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Oui, vous pouvez prolonger la durée de votre location, sous
                    réserve de disponibilité. Veuillez nous contacter pour
                    organiser la prolongation.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTen">
                  <button
                    className="btn_aide accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTen"
                    aria-expanded="false"
                    aria-controls="collapseTen"
                  >
                    Que se passe-t-il si je retourne l'objet en retard ?
                  </button>
                </h2>
                <div
                  id="collapseTen"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTen"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body reponse">
                    Des frais de retard peuvent s'appliquer si l'objet n'est pas
                    retourné à temps. Veuillez nous contacter pour plus de
                    détails.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
