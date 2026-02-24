import accueil from "../assets/Images/icone/accueil.png";
import analyse from "../assets/Images/icone/analytique.png";
import profil from "../assets/Images/icone/vendeur.png";
import revenu from "../assets/Images/icone/revenu.png";

import produit from "../assets/Images/icone/livraison-de-la-commande.png";
import meilleur_produit from "../assets/Images/icone/meilleur.png";
import produits from "../assets/Images/icone/produit.png";
import product_management from "../assets/Images/icone/traits.png";
import add_product from "../assets/Images/icone/ajouter-un-produit.png";

import commande from "../assets/Images/icone/livraison-de-la-commande.png";
import statistique from "../assets/Images/icone/statistique.png";
import avis from "../assets/Images/icone/etoiles-de-notation.png";
import client from "../assets/Images/icone/client.png";
import transaction from "../assets/Images/icone/transaction.png";
import parametre from "../assets/Images/icone/parametres-cog.png";

export const SidebarMenu = [
    {
        type: "accordion",
        title: "Tableau de bord",
        icon: accueil,
        id: "dashboard",
        children: [
            {
                label: "Analyse des ventes",
                path: "/admin/dashboard",
                icon: analyse,
            },
            {
                label: "Profil vendeurs",
                path: "/admin/profilSeller",
                icon: profil,
            },
            {
                label: "Promotions",
                path: "/admin/revenue",
                icon: revenu,
            },
        ],
    },
    {
        type: "accordion",
        title: "Produits",
        icon: produit,
        id: "produits",
        children: [
            {
                label: "Meilleurs produits",
                path: "/admin/bestProduct",
                icon: meilleur_produit,
            },
            {
                label: "Grille de produits",
                path: "/admin/productGrid",
                icon: produits,
            },
            {
                label: "Gestion des produits",
                path: "/admin/productManagement",
                icon: product_management,
            },
            {
                label: "Nouveau produit",
                path: "/admin/addProduct",
                icon: add_product,
            },
        ],
    },
    {
        type: "link",
        label: "Commandes",
        path: "/admin/commandes",
        icon: commande,
    },
    {
        type: "link",
        label: "Statistiques",
        path: "/admin/statistiques",
        icon: statistique,
    },
    {
        type: "link",
        label: "Avis",
        path: "/admin/avis",
        icon: avis,
    },
    {
        type: "link",
        label: "Clients",
        path: "/admin/clients",
        icon: client,
    },
    {
        type: "link",
        label: "Transactions",
        path: "/admin/transactions",
        icon: transaction,
    },
    {
        type: "link",
        label: "Paramètres",
        path: "/admin/paramètres",
        icon: parametre,
    },
];