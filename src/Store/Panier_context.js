import { createContext, useReducer, useEffect } from "react";
import { DUMMY_PRODUCTS } from "../Components/Product_Data";

//items: les différents éléments présents dans le panier
export const PanierContext = createContext({
  products: [],
  addProductToCart: () => {},
  updateProductQuantity: () => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === "AJOUTER_DANS_PANIER") {
    const updateShoppingCartProducts = [...state.products];

    const existingElementIndex = updateShoppingCartProducts.findIndex(
      (cartProducts) => cartProducts.id === action.payload.productId
    );

    const existingElement = updateShoppingCartProducts[existingElementIndex];

    if (existingElement) {
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

    const existingElementIndex = updateShoppingCartProducts.findIndex(
      (cartProduct) => cartProduct.id === action.payload.productId
    );

    if (existingElementIndex === -1) return state; // sécurité

    const updatedData = {
      ...updateShoppingCartProducts[existingElementIndex],
    };

    const newQuantity = action.payload.quantity;
    updatedData.quantity += newQuantity;

    if (updatedData.quantity <= 0) {
      updateShoppingCartProducts.splice(existingElementIndex, 1);
    } else {
      updateShoppingCartProducts[existingElementIndex] = updatedData;
    }

    return {
      products: updateShoppingCartProducts,
    };
  }

  if (action.type === "VIDER_PANIER") {
    return { products: [] };
  }

  return state;
};

export const PanierContextProvider = ({ children }) => {
  const storedCart = localStorage.getItem("panier");
  const initialState = storedCart ? JSON.parse(storedCart) : { products: [] };

  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(cartState));
  }, [cartState]);

  const handleAddProductToCart = (productId) => {
    cartDispatch({
      type: "AJOUTER_DANS_PANIER",
      payload: { productId },
    });
  };

  const handleUpdateProductQuantity = (productId, quantity) => {
    cartDispatch({
      type: "ACTUALISER_QUANTITE_PRODUIT",
      payload: { productId, quantity },
    });
  };

  const handleClearCart = () => {
    cartDispatch({ type: "VIDER_PANIER" });
    localStorage.removeItem("panier"); // en plus on vide le storage
  };

  const initialValue = {
    products: cartState.products,
    addProductToCart: handleAddProductToCart,
    updateProductQuantity: handleUpdateProductQuantity,
    clearCart: handleClearCart,
  };

  return (
    <PanierContext.Provider value={initialValue}>
      {children}
    </PanierContext.Provider>
  );
};
