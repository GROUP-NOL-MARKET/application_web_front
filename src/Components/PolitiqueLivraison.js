import React from "react";

const PolitiqueLivraison = () => {
  return (
    <div className="politiquelivraison">


      <div className="container my-3">
        <div className="row">
          <h2 className="name_entreprise_dashboard col-6">Politique de Livraison — Nol Market</h2>
          <i className="texte_brut offset-3 col">Dernière mise à jour : Novembre 2025</i>
        </div>

        <h4 className="petit_titre">
          Merci de faire vos achats sur Nol Market ! Cette Politique de Livraison
          décrit les conditions d’expédition, de délais et de réception des
          commandes passées sur le site.
        </h4>{" "}
        <h2 className="taux_moyen">Zones de Livraison</h2>
        <p className="texte_brut">
          {" "}
          Nous livrons actuellement : Cotonou, Porto-Novo, Abomey-Calavi. Si une
          adresse de livraison est en dehors des zones couvertes, notre service
          client contactera le client pour proposer une alternative.{" "}
        </p>
        <h2 className="taux_moyen">Frais de Livraison </h2>
        <p className="texte_brut">
          Les frais de livraison varient selon : La ville de livraison, le poids /
          volume du colis, le type de produit (fragile ou standard)
        </p>
        <p className="texte_brut">  <b>Exemple : </b>
          Zone Tarif estimé Cotonou / Calavi : À partir de 1 000 FCFA, Porto-Novo : A partir de 1
          500 FCFA. Autres villes: Sur devis Les
          frais exacts sont affichés avant validation de la commande.</p>
        <h2 className="taux_moyen">Délais de Livraison</h2>
        <p className="texte_brut">
          Zone Délai moyen Cotonou / Calavi : 1h au plus. Porto-Novo : 5h au plus. Les
          commandes confirmées avant l'heure limite de fermeture du supermaché seront traitées le même jour
          ouvré. Les délais peuvent varier en cas de : Rupture de stock, mauvaises conditions météo, problèmes logistiques externes{" "}
        </p>
        <h2 className="taux_moyen">Modes de Livraison</h2>{" "}
        <p className="texte_brut">
          Nous proposons : Livraison à domicile, livraison en point de retrait
          partenaire (bientôt disponible), retrait en magasin
        </p>{" "}
        <h2 className="taux_moyen">Suivi de Commande</h2>{" "}
        <p className="texte_brut">
          Après validation de la commande, le client reçoit des notifications
          concernant : La confirmation d’achat, le statut de livraison, l’heure
          estimée d’arrivée. Un suivi peut être demandé au service client via :
          groupnolmarket@gmail.com ou 0165002929.
        </p>{" "}
        <h2 className="taux_moyen">Réception de la Commande </h2>
        <p className="texte_brut">
          Lors de la livraison, le client doit : Vérifier l’état du colis, signaler
          immédiatement toute anomalie ou casse. En cas de produit endommagé, un
          formulaire de réclamation sera envoyé pour traitement.
        </p>{" "}
        <h2 className="taux_moyen">Non-livraison / Absence</h2>
        <p className="texte_brut">
          Si le client est absent à l’adresse indiquée : Le livreur reprogrammera
          une nouvelle livraison. Des frais supplémentaires peuvent s’appliquer
          selon le transporteur. Si la livraison est impossible après plusieurs
          tentatives alors la commande sera annulée et remboursement partiel selon les condidtions générale de vente.
        </p>{" "}
        <h2 className="taux_moyen">Erreur d’adresse</h2>
        <p className="texte_brut">
          Si le client fournit une mauvaise adresse : Un retard est possible et des
          frais supplémentaires peuvent être facturés
        </p>{" "}
        <h2 className="taux_moyen">Commandes Spéciales & Produits Volumineux</h2>
        <p className="texte_brut">
          Certains articles nécessitent une livraison spécifique : Gros produits
          d'électroménager et marchandises lourdes. Des frais spéciaux seront
          indiqués avant validation.
        </p>{" "}
        <h2 className="taux_moyen">Contact pour toute question sur la livraison :</h2>
        <p className="texte_brut">
          {" "}
          Email :groupnolmarket@gmail.com Téléphone : +22901  Adresse :Cotonou,
          Fidjrossè,Houenoussou 500m de la fin des pavés
        </p>
      </div>
    </div>
  );
};

export default PolitiqueLivraison;
