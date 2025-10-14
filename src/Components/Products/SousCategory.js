import React from "react";
import { sous_category_product } from "../Product_Data";

const SousCategory = () => {
  return (
    <div className="container">
      <div>
        <h2>Sous-Categories de produit</h2>
        {sous_category_product.map((sous_category) => (
          <div className="shadow-sm border border-1">
            <div className="row">
              {sous_category.slice(0,4).map((sous) => (
                <div className="row">
                  <div className="col me-2 border border-1 shadow-sm">
                    {sous.SousCategory}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SousCategory;
