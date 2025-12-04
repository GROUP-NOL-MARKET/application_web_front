import React from "react";

const Confidentialité = () => {
  return (
    <div className="container my-3">
      <div className="row">
        <h1 className="name_entreprise_dashboard col-6">Politique de Confidentialité — Nol Market </h1>
        <i className="offset-2 col texte_brut">Dernière mise à jour : Novembre 2025 Chez Nol Market</i>
      </div>

      <h4 className="petit_titre">
        La protection de vos données personnelles est essentielle. La présente
        Politique de Confidentialité décrit comment nous collectons, utilisons,
        stockons et sécurisons vos informations lorsque vous utilisez nos
        services.
      </h4>
      <h2 className="taux_moyen">Données que nous collectons</h2>
      <p className="texte_brut">
        Nous collectons différentes catégories de données : <ul className="list-unstyled">
          <li>
            ➤ Informations
            personnelles fournies par vous : Nom, prénom, adresse e-mail, numéro de
            téléphone, adresse de livraison et de facturation, Mot de passe (chiffré).
          </li>
          <li>
            ➤ Informations liées à l'achat : Historique de commandes, mode de paiement
            utilisé (jamais vos numéros de carte ✘), factures et reçus.
          </li>
          <li>
            ➤ Données techniques (automatiquement recueillies) telles que : Adresse IP, type d'appareil et
            navigateur, cookies et données de navigation (pages visitées, clics…).
          </li>
          <li>
            ➤Données issues de fonctionnalités facultatives : Avis et notes de produits,
            messages envoyés au support, listes de souhaits et panier.
          </li>

        </ul>
      </p>
      <h2 className="taux_moyen">Comment nous utilisons vos données</h2>{" "}
      <p className="texte_brut">
        Vos données servent à :
        <ul className="list-unstyled">
          <li>✔ Traiter vos commandes et paiements</li>
          <li>✔ Améliorer votre expérience utilisateur et nos services</li>
          <li>✔ Gérer votre compte client</li>
          <li>✔ Lutter contre la fraude et les usages abusifs</li>
          <li>✔ Vous envoyer des
            notifications liées aux commandes ou promotions (seulement avec votre
            consentement pour la publicité) Nous ne vendons jamais vos données à des
            tiers.</li>
        </ul>
        {" "}
      </p>{" "}
      <h2 className="taux_moyen">Paiements et sécurité</h2>{" "}
      <p className="texte_brut">
        Les paiements sont traités par des prestataires sécurisés tels que :
        MTN momo, Moov money, Kkiapay. Nous ne
        conservons aucune donnée bancaire sensible. Vos informations sont
        protégées par : Cryptage SSL/TLS, système anti-fraude et stockage
        sécurisé sur des serveurs conformes aux normes internationales{" "}
      </p>{" "}
      <h2 className="taux_moyen">Cookies et technologies similaires</h2>{" "}
      <p className="texte_brut">
        Nous utilisons des cookies pour : Se souvenir de votre connexion,
        maintenir le panier en mémoire, personnaliser votre navigation mesurer
        les performances du site. Vous pouvez gérer ou désactiver les cookies
        dans les paramètres de votre navigateur.
      </p>{" "}
      <h2 className="taux_moyen">Partage de données avec des partenaires</h2>{" "}
      <p className="texte_brut">
        Nous pouvons partager certaines données avec des partenaires uniquement
        lorsque c'est nécessaire : Transporteurs (livraison), services de
        paiement, hébergeurs et outils d'analyse statistique. Chaque partenaire
        doit respecter la confidentialité des données traitées.
      </p>{" "}
      <h2 className='taux_moyen'> Conservation des données</h2>{" "}
      <p className="texte_brut">
        Nous conservons vos données uniquement pendant la durée nécessaire :
        Pour votre compte tant qu'il est actif, pour les documents légaux :
        durée conforme aux lois locales. Vous pouvez demander la suppression de
        votre compte à tout moment.
      </p>{" "}
      <h2 className="taux_moyen">Vos droits </h2>{" "}
      <p className="texte_brut">
        Selon les lois en vigueur, vous avez le droit de :
        <ul className="list-unstyled">
          <li>
            ✔ Accéder à vos
            données
          </li><li> ✔ Rectifier ou mettre à jour vos informations</li>
          <li>✔ Demander la suppression de votre compte</li>
          <li> ✔ Vous opposer au traitement de certaines données</li>
        </ul>
      </p>{" "}
      <p className="texte_brut"> Cette politique peut être modifiée pour respecter les obligations
        réglementaires ou améliorer notre service. La version en ligne est
        toujours la plus récente.{" "}</p>
      <h4 className="taux_moyen">Contact Pour toute question concernant cette politique :</h4>{" "}
      <p className="texte_brut">Email : groupnolmarket@gmail.com     Adresse : Cotonou, Fidjrossè, Fiyegnon1 à 500m de la fin pavé</p>
    </div>
  );
};

export default Confidentialité;
