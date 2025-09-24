import React, {useState, useEffect} from 'react'
import axios from 'axios'

const RecupProduct = () => {
    const [products, setProducts] = useState([]);
    
      useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/products")
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error("Erreur lors du chargement des produits:", error);
          });
      }, []);
  return (
    <div>
      <h2>Liste des produits</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} FCFA
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecupProduct