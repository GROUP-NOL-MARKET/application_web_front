import React from "react";
import { motion } from "framer-motion";
import img_entreprise_2 from "./assets/Images/img_entreprise_2.webp";
// import Offres from "./Accueil/Offres";

const About = () => {
  return (
    <div>
      <div className="container">
        <div>
          <div className="title" style={{ fontSize: "1.7rem" }}>
            A propos de nous
          </div>
          <hr style={{ color: "#FA7F1B", height: "0.2rem" }} className="m-0" />

          {/* === Première section === */}
          <div id="about" className="about-us section mt-4">
            <div className="row">
              {/* Image qui vient de la gauche */}
              <motion.div
                className="col-lg-6 align-self-center"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="left-image">
                  <img
                    src={img_entreprise_2}
                    alt="L'entreprise NOL MARKET"
                    className="img-fluid"
                  />
                </div>
              </motion.div>

              {/* Texte qui vient de la droite */}
              <motion.div
                className="col-lg-6"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="section-heading mt-4">
                  <h1 className="entreprise_nom">
                    <span style={{ color: "#fa7f1b" }}>GROUP N</span>
                    <span style={{ color: "#0066BD" }}>OL MARKET</span>
                  </h1>
                  <h2 className="welcome_text">
                    Bienvenu dans notre univers, là où chaque produit raconte
                    une histoire
                  </h2>
                  <p className="text_a_propos">
                    Chez <b> GROUP NOL MARKET </b>, nous ne vendons pas
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
              </motion.div>
            </div>

            {/* === Deuxième section === */}
            <div className="row mt-5">
              {/* Texte qui vient de la gauche */}
              <motion.div
                className="col-lg-6 mt-3"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="section-heading mt-4">
                  <h1 className="entreprise_nom">
                    <span style={{ color: "#fa7f1b" }}>QUI SOM</span>
                    <span style={{ color: "#0066BD" }}>MES NOUS?</span>
                  </h1>
                  <p className="text_a_propos">
                    Nous sommes une Société Anonyme d'un capital de 5 millions,
                    créée depuis quelques années et spécialisée dans la
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
              </motion.div>

              {/* Image qui vient de la droite */}
              <motion.div
                className="col-lg-6 align-self-center"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="right-image">
                  <img
                    src={img_entreprise_2}
                    alt="L'entreprise NOL MARKET"
                    className="img-fluid"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Tu peux garder ton composant Offres ici si besoin */}
      {/* <Offres /> */}
    </div>
  );
};

export default About;
