// Les parties supprimées de mon site proposé 

// La partie liste des meilleurs produits 

/* Les meilleurs produits  */

        //   <div className="Produits_phares col-md-4 col-lg-3 mt-sm-2 mt-md-0 g-0 d-none d-md-block">
        //     <div className=" d-flex justify-content-center w-100 titre_principal">
        //       <h5 className="text-uppercase titre_principal_text" size="lg">
        //         Meilleurs Produits
        //       </h5>
        //     </div>

        //     {/* Partie produits phares pour les grands écrans */}

        //     <div className="Description_produits m-2 ">
        //       {DUMMY_PRODUCTS.map((product) => (
        //         <div key={product.id} className="product-item mt-0 mt-md-4">
        //           <div className="row">
        //             <div className="col-5 d-flex justify-content-center align-items-center">
        //               <img
        //                 alt={product.name}
        //                 src={product.image}
        //                 className="product_img"
        //               />
        //             </div>
        //             <div className="col-7 d-flex justify-content-center flex-column border-start">
        //               <div className="best_product_name">{product.name}</div>
        //               <Rating
        //                 name="size-medium"
        //                 value={product.notation}
        //                 readOnly
        //               />
        //               <div className="row">
        //                 <span
        //                   className="best_product_price col-8"
        //                   style={{ fontSize: "small" }}
        //                 >
        //                   {product.price} FCFA
        //                 </span>
        //                 <div
        //                   className="col-4"
        //                   onClick={() => addProductToCart(product.id)}
        //                   style={{ cursor: "pointer" }}
        //                 >
        //                   <FontAwesomeIcon icon={faCartShopping} />
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //           <hr
        //             style={{ color: "#FA7F1B", height: "0.2rem" }}
        //             className="m-0"
        //           />
        //         </div>
        //       ))}
        //     </div>
        //     <div className="m-4">
        //       <Button
        //         className="me-2"
        //         href="/products"
        //         style={{ backgroundColor: "#0066BD" }}
        //       >
        //         Voir tous les produits
        //       </Button>
        //     </div>
        //   </div>

        //   {/* LEs produits listés avec map sur le tableau  pour les petits écrans*/}
        //   <div className="container">
        //     <div className="Produits_phares col-md-3 col-12 mt-2  mt-md-0 g-0 d-md-none overflow-hidden">
        //       <div className=" d-flex justify-content-center titre_principal">
        //         <h5 className="text-uppercase titre_principal_text" size="lg">
        //           Meilleurs Produits
        //         </h5>
        //       </div>
        //       <div className="Description_produits_mobile m-2">
        //         <Swiper
        //           modules={[Navigation]}
        //           navigation
        //           loop={true}
        //           slidesPerView={1}
        //           spaceBetween={15}
        //           className="Liste_produits  h-100" // visible que sur mobile
        //         >
        //           {DUMMY_PRODUCTS.map((product) => (
        //             <SwiperSlide
        //               key={product.id}
        //               className="product-item mt-4 "
        //             >
        //               <div className="row h-100">
        //                 <div className="col-5 h-100 d-flex justify-content-center align-items-center">
        //                   <img
        //                     alt={product.name}
        //                     src={product.image}
        //                     className="product_img_mobile"
        //                   />
        //                 </div>
        //                 <div className="col-7 d-flex justify-content-center flex-column border-start">
        //                   <div className="best_product_name">
        //                     {product.name}
        //                   </div>
        //                   <Rating
        //                     name="size-medium"
        //                     value={product.notation}
        //                     readOnly
        //                   />
        //                   <div className="row">
        //                     <span
        //                       className="best_product_price col-8"
        //                       style={{ fontSize: "small" }}
        //                     >
        //                       {product.price} FCFA
        //                     </span>
        //                     <div
        //                       className="col-4"
        //                       onClick={() => addProductToCart(product.id)}
        //                       style={{ cursor: "pointer" }}
        //                     >
        //                       <FontAwesomeIcon icon={faCartShopping} />
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //               <hr
        //                 style={{ color: "#FA7F1B", height: "0.2rem" }}
        //                 className="m-0"
        //               />
        //             </SwiperSlide>
        //           ))}
        //         </Swiper>
        //       </div>
        //       <div className="m-4">
        //         <Button
        //           className="me-2"
        //           href="/products"
        //           style={{ backgroundColor: "#0066BD" }}
        //         >
        //           Voir tous les produits
        //         </Button>
        //       </div>
        //     </div>
        //   </div>

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    title: "Promo Électroménager",
    text: "Jusqu’à -50% sur les réfrigérateurs et congélateurs",
    image: "https://via.placeholder.com/800x300?text=Electroménager"
  },
  {
    id: 2,
    title: "Instruments de musique",
    text: "Profitez des meilleures réductions sur les guitares 🎸",
    image: "https://via.placeholder.com/800x300?text=Musique"
  },
  {
    id: 3,
    title: "Matériel de sonorisation",
    text: "Son puissant, petits prix 🔊",
    image: "https://via.placeholder.com/800x300?text=Sonorisation"
  }
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = banners[index];

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-lg">
      <motion.img
        key={current.id}
        src={current.image}
        alt={current.title}
        className="absolute w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        key={current.title}
        className="absolute bottom-6 left-6 bg-black/50 text-white p-4 rounded-lg"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl font-bold">{current.title}</h2>
        <p>{current.text}</p>
      </motion.div>
    </div>
  );
}
