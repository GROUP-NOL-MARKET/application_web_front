import React, { useState } from "react";
import { category_product } from "../Product_Data";

const Category = () => {
  const [isHovered, setIsHovered] = useState(false);
  const style = {
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease",
  };
  return (
    <div className="container">
      <div className="my-3">
        <h3 className="title">Catégories de produit</h3>
        <hr className="m-0" style={{ border: "1px solid #FA7F1B" }}></hr>
        {category_product.slice(0, 8).map((category,index) => (
          <div
            className="shadow-sm border border-1 mt-3 p-2 category_product"
            style={style}
            key={index}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="row">
              <div
                className="col-4 me-2 d-flex align-items-center"
                style={{ height: "250px" }}
              >
                <img src={category.image} alt="Catégorie de produit" className="img-fluid" />
              </div>
              <div className="col">
                <h3 className="name_entreprise">{category.category} </h3>
                <p className="texte_brut">{category.text} </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
