
import best_product_1 from "./assets/Images/best_product_1.webp";
import best_product_2 from "./assets/Images/best_product_2.webp";
import best_product_3 from "./assets/Images/bet_product_3.webp";
import img_profil from "./assets/Images/img_profil.webp";
import produits_locaux from "./assets/Images/produits_locaux.avif";
import epicerie from "./assets/Images/epicerie.avif";
import animalerie from "./assets/Images/animalerie.avif";
import divers from "./assets/Images/divers.avif";
import produits_frais from "./assets/Images/produits_frais.avif";
import electromenager from "./assets/Images/electromenager.avif";
import droguerie from "./assets/Images/droguerie.avif";
import boisson from "./assets/Images/boisson.avif";
import all_products from "./assets/Images/all_products.avif";



export const demoNotifications = [
  { id: 1, name: "J. Davidson", avatar: img_profil, message: "a adhéré au programme de réduction", time: "2h ago", tag: "Offers", canAct: true, highlight: true, read: false },
  { id: 2, name: "Mark Dowers", avatar: img_profil, message: "a créé un nouveau compte par mail", time: "3h ago", tag: "Referral link", canAct: false, read: false },
  // ...
];





export const avis = [
  {
    image: img_profil,
    name: "J. Davidson",
    email: "email@gmail.com",
    notation: 4,
    appreciation:
      "Très satisfait de mon expérience sur ce site ! Les produits sont conformes, la livraison rapide et le service client vraiment réactif. C’est agréable de trouver une plateforme qui valorise les produits locaux tout en offrant une navigation fluide. Je recommande vivement !",
    date: "02/10/2026",
    heure: "14:30",
  },
  {
    image: img_profil,
    name: "J. Davidson",
    email: "email@gmail.com",
    notation: 4,
    appreciation:
      "Très satisfait de mon expérience sur ce site ! Les produits sont conformes, la livraison rapide et le service client vraiment réactif. C’est agréable de trouver une plateforme qui valorise les produits locaux tout en offrant une navigation fluide. Je recommande vivement !",
    date: "02/10/2026",
    heure: "14:30",
  },
  {
    image: img_profil,
    name: "J. Davidson",
    email: "email@gmail.com",
    notation: 4,
    appreciation:
      "Très satisfait de mon expérience sur ce site ! Les produits sont conformes, la livraison rapide et le service client vraiment réactif. C’est agréable de trouver une plateforme qui valorise les produits locaux tout en offrant une navigation fluide. Je recommande vivement !",
    date: "02/10/2026",
    heure: "14:30",
  },
  {
    image: img_profil,
    name: "J. Davidson",
    email: "email@gmail.com",
    notation: 4,
    appreciation:
      "Très satisfait de mon expérience sur ce site ! Les produits sont conformes, la livraison rapide et le service client vraiment réactif. C’est agréable de trouver une plateforme qui valorise les produits locaux tout en offrant une navigation fluide. Je recommande vivement !",
    date: "02/10/2026",
    heure: "14:30",
  },
  {
    image: img_profil,
    name: "J. Davidson",
    email: "email@gmail.com",
    notation: 4,
    appreciation:
      "Très satisfait de mon expérience sur ce site ! Les produits sont conformes, la livraison rapide et le service client vraiment réactif. C’est agréable de trouver une plateforme qui valorise les produits locaux tout en offrant une navigation fluide. Je recommande vivement !",
    date: "02/10/2026",
    heure: "14:30",
  },
];
export const markers = [
  {
    id: 1,
    city: "Cotonou",
    value: 123000,
    x: 300,
    y: 180,
    color: "#10b981",
    progress: "90",
  },
  {
    id: 2,
    city: "Ouidah",
    value: 87000,
    x: 260,
    y: 250,
    color: "#ef4444",
    progress: "80",
  },
  {
    id: 3,
    city: "Calavi",
    value: 110000,
    x: 280,
    y: 120,
    color: "#3b82f6",
    progress: "75",
  },
  {
    id: 4,
    city: "Porto-Novo",
    value: 95000,
    x: 180,
    y: 220,
    color: "#6366f1",
    progress: "60",
  },
  {
    id: 5,
    city: "Parakou",
    value: 132000,
    x: 620,
    y: 150,
    color: "#1e3a8a",
    progress: "50",
  },
];

export const category_product = [
  {
    category: "Produits Locaux",
    image: produits_locaux,
    text: 'La réponse à vos besoins en matière de produits locaux "Made in Benin" est enfin arrivés. Découvrez notre large gamme des produits de chez nous en passant des jus simples, des boissons alcoolisés, de la farine, du miel et pleins d\'autres produits de chez nous. Visitez et vous ne serez pas déçus',
  },
  {
    category: "Produits Frais",
    image: produits_frais,
    text: "Prêt à explorer les différents produits frais, les produits tels que des produits congelés, des fruis frais, des crêmes et glaces et autres? Tu es à la bonne catégorie. Découvre tout ce  qu'il te faut pour te rafraîchir, pour accompagner tes mets",
  },
  {
    category: "Electroménager",
    image: electromenager,
    text: "Economisez de temps et de l'argent grâce à nos appareils ménagers tels que nos frigots de marque Nasco, nos appareil pour la lessive automatique, nos climatisateurs authentiques et pleins d'autres appareils de qualité pouvant ainsi rendre votre quotidien tranquille et sans tracasserie",
  },
  {
    category: "Epicerie",
    image: epicerie,
    text: "Transformez votre quotidien avec notre sélection de produits authentiques pour votre ménage. Vous voulez de la saveur, de la douceur et de la délictesse dans votre cuisine, cette catégorie de produits est pour  vous. Vous y trouverez les condiments, des plats...",
  },

  {
    category: "Droguerie",
    image: droguerie,
    text: "Vous cherchez la solution parfaite pour que votre maison soit propre ou pour que votre peau soit lisse, nous avons ce qu'il faut pour vous? Notre large gamme de produits de droguerie tels que ceux des soins de beauté, d'hygiènes, de mouchoir, de déodorant et pleins d'autres.",
  },
  {
    category: "Divers",
    image: divers,
    text: "Nos divers, ce sont les produits importés de qualité pour une consommation saine et propre et pour un usage quotidien sans tracasserie. Nous offrons des produits athentiques tels que les Chewing Gum, des piles rasoirs et pleins d'autres petits produits que nous utilisons tous quotidiennement",
  },

  {
    category: "Boissons",
    image: boisson,
    text: "",
  },

  {
    category: "Animalerie",
    image: animalerie,
    text: "Vos animaux de compagnie ont besoin aussi d'être nourri. Nous avons donc pour vous des nourritures pour vos chiens et vos chats. Consulter et explorer nos produits",
  },
  {
    category: "Voir tout",
    image: all_products,
    link: "application_web_front/products",
  },
];


export const messages = [
  {
    id: 1,
    title: "Du nouveau pour vous sur notre plateforme, visitez",
    sub_title: "Epicerie",
    img: best_product_3,
    content: "Intitulé du message",
    date: "01/03/2026",
    heure: "01:50"
  },
  {
    id: 2,
    title: "Votre livraison a été effectuée avec succès",
    sub_title: "Epicerie",
    img: best_product_3,
    content: "Intitulé du message",
    date: "01/03/2026",
    heure: "01:50"
  },
  {
    id: 3,
    title: "Vous avez annulé une commande",
    sub_title: "Epicerie",
    img: best_product_3,
    content: "Intitulé du message",
    date: "01/03/2026",
    heure: "01:50"
  },
  {
    id: 4,
    title: "Enregistrement de votre commande effectué",
    sub_title: "Epicerie",
    img: best_product_3,
    content: "Intitulé du message",
    date: "01/03/2026",
    heure: "01:50"
  },
];

export const reviews = [
  {
    id: 1,
    content: "J'ai été satisfait en un temps record et j'en suis tellement ravi. Je recommande ce site à tout le monde pour pouvoir faire leur achats d'une manière ou d'une autre",
    commande_id: 2,
    date: "01/03/2026",
    heure: "05:17"
  },
  {
    id: 2,
    content: "J'ai été satisfait en un temps record et j'en suis tellement ravi. Je recommande ce site à tout le monde pour pouvoir faire leur achats d'une manière ou d'une autre",
    commande_id: 2,
    date: "01/03/2026",
    heure: "05:17"
  },
  {
    id: 3,
    content: "J'ai été satisfait en un temps record et j'en suis tellement ravi. Je recommande ce site à tout le monde pour pouvoir faire leur achats d'une manière ou d'une autre",
    commande_id: 2,
    date: "01/03/2026",
    heure: "05:17"
  },
  {
    id: 4,
    content: "J'ai été satisfait en un temps record et j'en suis tellement ravi. Je recommande ce site à tout le monde pour pouvoir faire leur achats d'une manière ou d'une autre",
    commande_id: 2,
    date: "01/03/2026",
    heure: "05:17"
  },
];


export const sous_category_product = [
  {
    category: "Epicerie",
    sous_category: [
      "Petit déjeuner",
      "Céréales-corn flakes Pain gri",
      "Biscuits gâteaux",
      "Amuse gueules",
      "Pains et viennoiseries",
      "Bonbons-chocolat",
      "Conserves-plats cuisines",
      "Pâtes alimentaires -riz - purée",
      "Assaisonnement - condiments",
      "Huile - Vinaigre",
      "Sardine",
      "Epicerie",
    ],
  },

  {
    category: "Droguerie",
    sous_category: [
      "Monde de Bébé",
      "Hygiène dentaire",
      "Rasage",
      "Produits ménager",
      "Soins de beauté",
      "Mouchoir - papier toilette",
      "Désodorisants - insecticides",
      "Hygiène féminine",
    ],
  },
  {
    category: "Produits Locaux",
    sous_category: ["Produits locaux"],
  },
  {
    category: "Divers",
    sous_category: ["Chewing Gum", "Piles - rasoirs", "papeterie", "Ampoule"],
  },
  {
    category: "Produits Frais",
    sous_category: [
      "Fromages - fruits frais - légumes",
      "yaourt",
      "Surgeles  crèmerie fraîche",
      "Glaces et crèmes glacées",
      "Charcuterie volaille poisson",
      "Produits Locaux Frais",
    ],
  },
  {
    category: "Boissons",
    sous_category: [
      "Vins",
      "Spiritueux",
      "Jus de fruits",
      "Eaux minérales",
      "Sirop",
      "Soft Drink",
      "Cidre",
      "Champagnes",
      "Bière et panaché",
    ],
  },
  {
    category: "Animalerie",
    sous_category: ["Nourritures pour chien et chat"],
  },
  {
    category: "electroménager",
    sous_category: ["Electroménager"],
  },
];

export const best_product_PL = [
  {
    img: best_product_1,
    nom: "Chocolat",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_2,
    nom: "Biscuit",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_3,
    nom: "Lave-linge",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
];
export const best_product_electromenager = [
  {
    img: best_product_1,
    nom: "Chocolat",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_2,
    nom: "Biscuit",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_3,
    nom: "Lave-linge",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
];
export const best_product_PF = [
  {
    img: best_product_1,
    nom: "Chocolat",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_2,
    nom: "Biscuit",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_3,
    nom: "Lave-linge",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
];
export const best_product_epicerie = [
  {
    img: best_product_1,
    nom: "Chocolat",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_2,
    nom: "Biscuit",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_3,
    nom: "Lave-linge",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
];
export const best_product_droguerie = [
  {
    img: best_product_1,
    nom: "Chocolat",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_2,
    nom: "Biscuit",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_3,
    nom: "Lave-linge",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
];
export const best_product_divers = [
  {
    img: best_product_1,
    nom: "Chocolat",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_2,
    nom: "Biscuit",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
  {
    img: best_product_3,
    nom: "Lave-linge",
    disponibilité: "disponible",
    notation: 2,
    vendu: 15,
    restant: 20,
  },
];
