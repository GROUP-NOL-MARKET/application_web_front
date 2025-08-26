import { createContext, useReducer } from "react";
import {DUMMY_PRODUCTS} from "../Components/Product_Data";


//items: les différents éléments présents dans le panier
export const PanierContext = createContext({
  products: [],
  addProductToCart: () => {},
  updateProductQuantity: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === "AJOUTER_DANS_PANIER") {
    const updateShoppingCartProducts = [...state.products];

    //Vérifier si l'élément en question existe

    const existingElementIndex = updateShoppingCartProducts.findIndex(
      (cartProducts) => cartProducts.id === action.payload.productId
    );

    const existingElement = updateShoppingCartProducts[existingElementIndex];

    if (existingElement) {
      //Au cas ou l'élément est déja présent dans le panier

      const updatedProductData = {
        ...existingElement,
        quantity: existingElement.quantity + 1,
      };

      updateShoppingCartProducts[existingElementIndex] = updatedProductData;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload.productId
      );

      if (product) {
        updateShoppingCartProducts.push({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: 1,
          disponibilité: product.disponibilité,
          marque: product.marque,
          type: product.type,
        });
      }
    }

    return {
      products: updateShoppingCartProducts,
    };
  }

  if (action.type === "ACTUALISER_QUANTITE_PRODUIT") {
    const updateShoppingCartProducts = [...state.products];

    //Vérifier si l'élément en question existe

    const existingElementIndex = updateShoppingCartProducts.findIndex(
      (cartProduct) => cartProduct.id === action.payload.productId
    );

    const updatedData = {
      ...updateShoppingCartProducts[existingElementIndex],
    };

    const newQuantity = action.payload.quantity;
    updatedData.quantity += newQuantity;

    if (updatedData.quantity <= 0) {
      //Retirer l'élément du panier

      updateShoppingCartProducts.splice(existingElementIndex, 1);
    } else {
      updateShoppingCartProducts[existingElementIndex] = updatedData;
    }

    return {
      products: updateShoppingCartProducts,
    };
  }

  return state;
};

export const PanierContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    products: [],
  });

  //Fonction d'ajout dans le panier

  const handleAddProductToCart = (productId) => {
    cartDispatch({
      type: "AJOUTER_DANS_PANIER",
      payload: { productId: productId },
    });
  };

  const handleUpdateProductQuantity = (productId, quantity) => {
    cartDispatch({
      type: "ACTUALISER_QUANTITE_PRODUIT",
      payload: {
        productId,
        quantity,
      },
    });
  };

  const initialValue = {
    products: cartState.products,
    addProductToCart: handleAddProductToCart,
    updateProductQuantity: handleUpdateProductQuantity,
  };
  return (
    <PanierContext.Provider value={initialValue}>
      {children}
    </PanierContext.Provider>
  );
};