import { createContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

export const PanierContext = createContext({
  products: [],
  addProductToCart: () => { },
  updateProductQuantity: () => { },
  clearCart: async () => { },
});

const cartReducer = (state, action) => {
  if (action.type === "AJOUTER_DANS_PANIER") {
    const updateShoppingCartProducts = [...state.products];

    // NOUVELLE LIGNE : Extraire l'ID du produit du payload
    const productIdToAdd = action.payload.product ? action.payload.product.id : null;

    // MODIFICATION ICI : On recherche l'ID du produit
    const existingElementIndex = updateShoppingCartProducts.findIndex(
      (cartProducts) => cartProducts.id === productIdToAdd
    );
    const existingElement = updateShoppingCartProducts[existingElementIndex];

    if (existingElement) {
      // 1. SI le produit EXISTE, on augmente la quantité. 
      updateShoppingCartProducts[existingElementIndex] = {
        ...existingElement,
        quantity: existingElement.quantity + 1,
      };
    } else {
      // 2. SINON, on l'ajoute comme un nouveau produit.
      const product = action.payload.product;

      if (product) {
        updateShoppingCartProducts.push({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: 1,
          disponibilité: product.disponibilité || "Disponible",
          marque: product.marque || "",
          type: product.category || "",
        });
      }
    }
    return { products: updateShoppingCartProducts };
  };

  if (action.type === "ACTUALISER_QUANTITE_PRODUIT") {
    const updateShoppingCartProducts = [...state.products];
    const existingElementIndex = updateShoppingCartProducts.findIndex(
      (cartProduct) => cartProduct.id === action.payload.productId
    );

    if (existingElementIndex === -1) return state;

    const updatedData = {
      ...updateShoppingCartProducts[existingElementIndex],
    };

    updatedData.quantity += action.payload.quantity;

    if (updatedData.quantity <= 0) {
      updateShoppingCartProducts.splice(existingElementIndex, 1);
    } else {
      updateShoppingCartProducts[existingElementIndex] = updatedData;
    }

    return { products: updateShoppingCartProducts };
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

  const handleAddProductToCart = (product) => {
    cartDispatch({ type: "AJOUTER_DANS_PANIER", payload: { product } });
    toast.success("Produit ajouté au panier");
  };


  const handleUpdateProductQuantity = (productId, quantity) => {
    cartDispatch({
      type: "ACTUALISER_QUANTITE_PRODUIT",
      payload: { productId, quantity },
    });
  };

  const handleClearCart = () => {

    // 1. Retourne une Promise
    return new Promise((resolve) => {
      // 2. Exécute toutes les actions synchrones
      cartDispatch({ type: "VIDER_PANIER" });
      localStorage.removeItem("panier");
      toast.error("Panier vidé");

      // 3. Résoudre la Promise immédiatement pour signaler que c'est "terminé"
      resolve();
    });
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
