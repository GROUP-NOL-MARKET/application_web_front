import best_product_1 from "./assets/Images/best_product_1.png";
import best_product_2 from "./assets/Images/best_product_2.png";
import best_product_3 from "./assets/Images/bet_product_3.png";
import best_product_4 from "./assets/Images/best_product_4.png";

export const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Chemisier",
    price: "15",
    disponibilité: "Disponible",
    image: best_product_1,
    notation: 2.5,
    marque: "Toto",
    type: "Banane",
  },
  {
    id: 2,
    name: "Chemise",
    price: "300000",
    disponibilité: "Disponible",
    image: best_product_2,
    notation: 4,
    marque: "Toto",
    type: "Banane",
  },
  {
    id: 3,
    name: "Divan",
    price: "40",
    disponibilité: "Disponible",
    image: best_product_3,
    notation: 3.5,
    marque: "Toto",
    type: "Banane",
  },
  {
    id: 4,
    name: "Produits locaux",
    price: "25",
    disponibilité: "Disponible",
    image: best_product_4,
    notation: 4,
    marque: "Toto",
    type: "Banane",
  },
];

export const category_product = [
  {
    category: "Epicerie",
    image: "",
    link: "/products/Epicerie",
    text: "Transformez votre quotidien avec notre sélection de produits authentiques pour votre ménage. Vous voulez de la saveur, de la douceur et de la délictesse dans votre cuisine, cette catégorie de produits est pour  vous. Vous y trouverez les condiments, des plats...",
  },
  {
    category: "Produits Locaux",
    image: "",
    link: "/products/Produits_Locaux",
    text: "La réponse à vos besoins en matière de produits locaux \"Made in Benin\" est enfin arrivés. Découvrez notre large gamme des produits de chez nous en passant des jus simples, des boissons alcoolisés, de la farine, du miel et pleins d'autres produits de chez nous. Visitez et vous ne serez pas déçus",
  },
  {
    category: "Droguerie",
    image: "",
    link: "/products/Droguerie",
    text: "Vous cherchez la solution parfaite pour que votre maison soit propre ou pour que votre peau soit lisse, nous avons ce qu'il faut pour vous? Notre large gamme de produits de droguerie tels que ceux des soins de beauté, d'hygiènes, de mouchoir, de déodorant et pleins d'autres.",
  },
  {
    category: "Divers",
    image: "",
    link: "/products/Divers",
    text: "Nos divers, ce sont les produits importés de qualité pour une consommation saine et propre et pour un usage quotidien sans tracasserie. Nous offrons des produits athentiques tels que les Chewing Gum, des piles rasoirs et pleins d'autres petits produits que nous utilisons tous quotidiennement",
  },
  {
    category: "Produits Frais",
    image: "",
    link: "/products/Produits_Frais",
    text: "Prêt à explorer les différents produits frais, les produits tels que des produits congelés, des fruis frais, des crêmes et glaces et autres? Tu es à la bonne catégorie. Découvre tout ce  qu'il te faut pour te rafraîchir, pour accompagner tes mets" ,
  },
  {
    category: "Boissons",
    image: "",
    link: "/products/Boissons",
    text: "",
  },
  {
    category: "Electroménager",
    image: "",
    link: "/products/Electroménager",
    text: "Economisez de temps et de l'argent grâce à nos appareils ménagers tels que nos frigots de marque Nasco, nos appareil pour la lessive automatique, nos climatisateurs authentiques et pleins d'autres appareils de qualité pouvant ainsi rendre votre quotidien tranquille et sans tracasserie",
  },
  {
    category: "Animalerie",
    image:"",
    link: "/products/Animalerie",
    text: "Vos animaux de compagnie ont besoin aussi d'être nourri. Nous avons donc pour vous des nourritures pour vos chiens et vos chats. Consulter et explorer nos produits"
  }
];

export const banners = [
  {
    id: 1,
    title: "Promo Électroménager",
    text: "Jusqu’à -50% sur les réfrigérateurs et congélateurs",
    image: "https://via.placeholder.com/800x300?text=Electroménager",
  },
  {
    id: 2,
    title: "Instruments de musique",
    text: "Profitez des meilleures réductions sur les guitares 🎸",
    image: "https://via.placeholder.com/800x300?text=Musique",
  },
  {
    id: 3,
    title: "Matériel de sonorisation",
    text: "Son puissant, petits prix 🔊",
    image: "https://via.placeholder.com/800x300?text=Sonorisation",
  },
];
