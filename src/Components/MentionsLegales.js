import React from "react";

const MentionsLegales = () => {
  return (

    <div className="container my-3">
      <div className="row">
        <h1 className="name_entreprise_dashboard col-6">Mentions Légales — Nol Market</h1>
        <i className="offset-2 col">Dernière mise à jour : Novembre 2025</i>
      </div>

      <h4 className="taux_moyen fw-normal">
        <ul>
          <li>Le présent site est édité par : Nol Market</li>
          <li>Entreprise : Commerciale
            spécialisée dans la commercialisation des produits présents dans toute activité touchant l'achat et la vente.</li>
          <li>Forme juridique : Société à Responsabilité Limitée</li>
          <li> Capital social : 10
            000 000 FCFA</li>
          <li> Pays :
            Bénin</li>
          <li> Siège social : Cotonou, Fidjrossè, 100m du fin pavé</li>
          <li>N° d’immatriculation : [RCCM / SIRET / …]</li>
          <li>N° d’identification
            fiscale : [Numéro IFU / TVA / …]</li>
          <li>Email : groupnolmarket@gmail.com</li>
          <li>Téléphone : (+229) 0165002929 / 0165002800</li>
        </ul>
      </h4>
      <h2 className="taux_moyen"> Protection des Données & Cookies</h2>
      <p className="texte_brut">
        La collecte et le traitement des données personnelles sont expliqués
        dans notre <a href="confidentialite">Politique de Confidentialité</a>. Le site
        utilise des cookies et autres traceurs afin d’améliorer l’expérience de
        navigation. Un bandeau d’information vous permet de gérer vos
        préférences.
      </p>
      <h2 className="taux_moyen">Activité Commerciale</h2>{" "}
      <p className="texte_brut">
        Nol Market propose la vente en ligne de biens et services : des produits
        locaux, des boissons, des produits frais tels les viandes, les fromages,
        les yaourts, les saucisses, des produits pour les soins de corps et
        pleins d'autres... Les conditions d’achat sont définies dans nos :
        Conditions Générales de Vente (CGV).
      </p>{" "}
      <h2 clssName="taux_moyen">Propriété Intellectuelle </h2>
      <p className="texte_brut">
        Tous les éléments du site Nol Market (visuels, textes, logos, marques,
        interfaces, etc.) sont protégés par les lois sur la propriété
        intellectuelle. Toute reproduction totale ou partielle sans autorisation
        écrite est interdite.
      </p>
      <h2 className="taux_moyen">Livraison & Paiement </h2>
      <p className="texte_brut">
        Les informations concernant : modalités de paiement frais et délais de
        livraison retours et remboursements sont détaillées dans la <a href="politique-livraison">Politique de
          Livraison & Retours</a>.
      </p>{" "}
      <h2 className="taux_moyen">Responsabilité</h2>
      <p className="texte_brut">
        Nol Market ne saurait être tenu responsable : en cas d’indisponibilité
        du site, en cas d’erreur dans les informations fournies par un
        fournisseur ou utilisateur, en cas de mauvaise utilisation du site par
        le client.
      </p>{" "}
      <h2 className="taux_moyen">Loi Applicable & Litiges</h2>{" "}
      <p className="texte_brut">
        Ces mentions sont soumises à la loi en vigueur dans la République du
        Bénin. En cas de litige, une solution amiable sera privilégiée. À
        défaut, les tribunaux compétents seront saisis.
      </p>
    </div>
  );
};

export default MentionsLegales;
