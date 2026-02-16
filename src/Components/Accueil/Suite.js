import React from 'react'
import { useNavigate } from 'react-router-dom';
import p_frais from "../assets/Images/produits_frais.avif";
import divers from "../assets/Images/divers.avif";
import electromenager from "../assets/Images/electromenager.avif";
import p_locaux from "../assets/Images/produits_locaux.avif";

const Suite = () => {
    const navigate = useNavigate();
    const category = [
        {
            categories: 'produits frais',
            image: p_frais,
        },
        {
            categories: 'divers',
            image: divers,
        },
        {
            categories: 'electroménager',
            image: electromenager,
        },
        {
            categories: 'produits locaux',
            image: p_locaux,
        },
    ]
    const handleNavigation2 = (category) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    };
    return (
        <div>
            <div className="container-fluid d-flex my-4">
                <div className="row w-100 g-3">
                    {category.slice(0, 4).map((category_p) => (
                        <div key={category_p.categories} className="col-6 col-md-3">
                            <div
                                className="amazon-card"
                                onClick={() => handleNavigation2(category_p.categories)}
                            >
                                <div className="amazon-card-image-suite">
                                    <img
                                        src={category_p.image}
                                        alt={category_p.categories}
                                        className=""
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Suite