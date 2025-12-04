import React from "react";

const ConditionUtilisation = () => {
  return (
    <div className="container my-3">
      <div className="row">
        <h2 className="col-6 name_entreprise_dashboard">Conditions d'Utilisation du Site — Nol Market</h2>
        <i className="offset-2 col texte_brut">Dernière mise à jour : Novembre 2025</i>
      </div>
      <h3 className="petit_titre">
        Bienvenue sur le site du Group Nol Market. Ce document définit les
        règles d'accès et d'utilisation du Site, que tout visiteur ou client
        doit respecter. En naviguant sur notre Site, vous acceptez sans réserve
        les présentes Conditions d'Utilisation.
      </h3>
      <h2 className="taux_moyen">Accès au Site</h2>
      <p className="texte_but">
        Le site est accessible gratuitement à tout utilisateur disposant d'un
        accès internet. Cependant, les frais liés à l'accès (connexion, matériel
        informatique…) restent à la charge de l'utilisateur. Nous pouvons
        interrompre l'accès au Site pour : maintenance mise à jour raison
        technique Sans obligation de préavis.
      </p>
      <h2 className="taux_moyen">Création de Compte</h2>
      <p className="texte_brut">
        Certaines fonctionnalités nécessitent la création d’un compte client.
        Vous vous engagez à fournir des informations :<ul><li>✔ Exactes</li>
          <li>✔
            Complètes</li>
          <li>✔ Mise à jour régulièrement</li></ul>
        Vous êtes responsable : de la
        confidentialité de vos identifiants de toutes les activités réalisées
        via votre compte. Tout usage frauduleux doit être signalé immédiatement à :groupnolmarket@gmail.com
      </p>
      <h2 className="taux_moyen">Utilisation Autorisée du Site</h2>
      <p className="texte_brut">
        Vous vous engagez à utiliser le Site uniquement dans un cadre légal,
        notamment à ne pas :
        <ul className="list-unstyled">
          <li>🚫 Porter atteinte à l'ordre public</li>
          <li>🚫 Détourner le Site de son usage commercial normal</li>
          <li>🚫 Distribuer des virus ou scripts
            malveillants</li>
          <li>🚫 Extraire, copier ou revendre le contenu du Site sans
            autorisation</li>
        </ul>
        Nous nous réservons le droit de suspendre ou résilier un
        compte en cas d’abus.
      </p>
      <h2 className="taux_moyen">Produits et Prix</h2>{" "}
      <p className="texte_brut">
        Les informations produits peuvent évoluer et sont fournies en fonction
        des stocks et disponibilités. Les prix affichés : sont exprimés en FCFA
        peuvent être modifiés sans préavis. Les conditions d'achat sont
        détaillées dans nos <a href="/politique-livraison">Politique de livraisons (PL).</a>{" "}
      </p>
      <h2 className="taux_moyen">Propriété Intellectuelle</h2>
      <p className="texte_brut">
        Tous les contenus disponibles sur le Site (textes, images, logos,
        graphismes, base de données, etc.) sont protégés par le droit de la
        propriété intellectuelle. 🔒 Toute reproduction ou exploitation sans
        autorisation écrite est interdite.
      </p>
      <h2 className="taux_moyen">Protection des Données Personnelles</h2>{" "}
      <p className="texte_brut">
        Les informations liées à la gestion des données personnelles et des
        cookies sont définies dans notre Politique de Confidentialité.{" "}
      </p>{" "}
      <h2 className="taux_moyen">Avis et Contributions des Utilisateurs</h2>
      <p className="texte_brut">
        {" "}
        Les utilisateurs peuvent publier des avis sur les produits. Vous vous
        engagez à ne pas publier de contenus : 🚫 diffamatoires 🚫
        discriminatoires 🚫 mensongers 🚫 portant atteinte à la vie privée ou
        aux droits de tiers. Nous pouvons supprimer tout contenu non conforme aux
        règles ci-dessus.
      </p>{" "}
      <h2 className="taux_moyen">Liens Externes </h2>{" "}
      <p className="texte_brut">
        Le Site peut contenir des liens vers d’autres sites. Nous ne pouvons
        être tenus responsables du contenu de ces plateformes externes.
      </p>
      <h2 className="taux_moyen">Responsabilité </h2>
      <p className="texte_brut">
        Nous faisons de notre mieux pour garantir un service de qualité, mais :
        Nous ne pouvons être responsables : des interruptions ou bugs du Site
        des pertes de données liées à l’utilisation du Site de l’inexactitude de
        certaines informations produits (fournies par les vendeurs ou
        fabricants).
      </p>{" "}
      <h2 className="taux_moyen">Modification des Conditions</h2>{" "}
      <p className="texte_brut">
        {" "}
        Nous pouvons mettre à jour ces Conditions à tout moment. La version en
        vigueur est celle affichée sur cette page.
      </p>{" "}
      <h4 className="taux_moyen">Contact Pour toute question ou réclamation :</h4>
      <p className="texte_brut">Email :
        groupnolmarket@gmail.com Téléphone : +2290165002929 Adresse : Cotonou, Fidjrossè,
        Houenoussou 500m de la fin des pavés..</p>
    </div>
  );
};

export default ConditionUtilisation;
