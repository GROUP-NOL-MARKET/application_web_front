import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import p_frais from "../assets/Images/produits_frais.avif";
import divers from "../assets/Images/divers.avif";
import electromenager from "../assets/Images/electromenager.avif";
import p_locaux from "../assets/Images/produits_locaux.avif";

const Suite = () => {
    const navigate = useNavigate();

    const category = [
        { categories: "produits frais", image: p_frais },
        { categories: "divers", image: divers },
        { categories: "electroménager", image: electromenager },
        { categories: "produits locaux", image: p_locaux },
    ];

    const handleNavigation2 = (category) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    };

    return (
        <>
            {/* ================= MOBILE SWIPER ================= */}
            <div className="container-fluid my-4 d-md-none">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={14}
                    slidesPerView={1.7}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop
                >
                    {category.map((category_p, index) => (
                        <SwiperSlide key={category_p.categories}>
                            <motion.div
                                className="amazon-card-suite"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                                onClick={() =>
                                    handleNavigation2(category_p.categories)
                                }
                            >
                                <div className="amazon-card-image-suite">
                                    <img
                                        src={category_p.image}
                                        alt={category_p.categories}
                                        className="img-fluid rounded-2"
                                    />
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ================= DESKTOP GRID ================= */}
            <motion.div
                className="container-fluid d-flex my-5 d-none d-md-block"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="row w-100 g-3">
                    {category.map((category_p, index) => (
                        <motion.div
                            key={category_p.categories}
                            className="col-6 col-md-3"
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                ease: "easeOut",
                            }}
                        >
                            <div
                                className="amazon-card"
                                onClick={() =>
                                    handleNavigation2(category_p.categories)
                                }
                            >
                                <div className="amazon-card-image-suite">
                                    <img
                                        src={category_p.image}
                                        alt={category_p.categories}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default Suite;
