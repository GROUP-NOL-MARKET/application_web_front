import React from "react";
import img_entreprise_2 from "./assets/Images/img_entreprise_2.png";
import Offres from "./Accueil/Offres";

const About = () => {
  return (
    <div>
      <div className="container">
        <div>
          <div className="title" style={{ fontSize: "2rem" }}>
            A propos de nous
          </div>
          <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />
          <div id="about" className="about-us section mt-4">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="left-image">
                  <img
                    src={img_entreprise_2}
                    alt="L'entreprise NOL MARKET"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="section-heading">
                  <h1 className="entreprise_nom">
                    <span style={{ color: "#fa7f1b" }}>GROUP N</span>
                    <span style={{ color: "#0066BD" }}>OL MARKET</span>
                  </h1>
                  <h2 className="welcome_text">
                    Bienvenu dans notre univers, là où chaque produit raconte
                    une histoire
                  </h2>
                  <p className="text_a_propos">
                    Chez <i> GROUP NOL MARKET </i>, nous ne vendons pas
                    simplement des articles : nous partageons des passions, des
                    idées et des expériences. Que vous soyez à la recherche d’un
                    produit quelconque, d’un cadeau unique ou d’un essentiel du
                    quotidien, notre mission est de rendre votre parcours
                    d’achat aussi inspirant que le produit que vous choisirez.
                    <br />
                    Nous mettons à votre disposition des produits frais, locaux
                    et essentiels, chaque jour. De l’épicerie au soin du corps,
                    en passant par les saveurs du terroir, notre priorité est de
                    vous offrir qualité, accessibilité et confiance — le tout
                    dans un seul et même espace.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 mt-3">
                <div className="section-heading">
                  <h1 className="entreprise_nom">
                    <span style={{ color: "#fa7f1b" }}>QUI SOM</span>
                    <span style={{ color: "#0066BD" }}>MES NOUS?</span>
                  </h1>
                  <p className="text_a_propos">
                    Nous sommes une Société Anonyme d'un capitale de 5 millions,
                    créé depuis quelques années et spécialisé dans la
                    distribution des produits de grande consommation en général
                    (produits alimentaires, divers et électroménager) avec comme
                    particularité la mise en avant des produits locaux. <br />
                    Nous croyons que chaque produit a une histoire, et que les
                    meilleures viennent de chez nous. Fruits mûris sous le
                    soleil béninois, épices aux arômes puissants, savons
                    artisanaux, céréales locales… nous sélectionnons avec soin
                    des produits du quotidien, issus de producteurs, artisans et
                    supermarchés de confiance. Notre mission : valoriser le
                    savoir-faire local, simplifier vos achats, et vous offrir
                    une expérience en ligne aussi chaleureuse que le marché du
                    quartier. Ici, pas de compromis : qualité, proximité et
                    transparence sont au cœur de tout ce que nous faisons.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="right-image">
                  <img
                    src={img_entreprise_2}
                    alt="L'entreprise NOL MARKET"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <Offres />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
