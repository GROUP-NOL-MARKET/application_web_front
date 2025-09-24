import React, { useEffect, useState } from "react";
import API from "../Authentification/api";

const Products = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    API
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        const data = response.data;

        // Regrouper par category → sous_category → family
        const grouped = data.reduce((acc, product) => {
          const { category, sous_category, family } = product;

          if (!acc[category]) acc[category] = {};
          if (!acc[category][sous_category]) acc[category][sous_category] = {};
          if (!acc[category][sous_category][family]) acc[category][sous_category][family] = [];

          acc[category][sous_category][family].push(product);

          return acc;
        }, {});

        setGroupedProducts(grouped);
      })
      .catch((error) => {
        console.log("Erreur lors de la récupération des produits", error);
      });
  }, []);

  return (
    <div className="products-container">
      <h2>Liste des catégories de produits</h2>

      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h3>📂 {category}</h3>
          {Object.keys(groupedProducts[category]).map((sous_category) => (
            <div key={sous_category} style={{ marginLeft: "20px" }}>
              <h4>➡️ {sous_category}</h4>
              {Object.keys(groupedProducts[category][sous_category]).map((family) => (
                <div key={family} style={{ marginLeft: "40px" }}>
                  <h5>🔹 {family}</h5>
                  <ul>
                    {groupedProducts[category][sous_category][family].map((product) => (
                      <li key={product.id}>
                        {product.name} — {product.price} CFA ({product.disponibility})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Products;
