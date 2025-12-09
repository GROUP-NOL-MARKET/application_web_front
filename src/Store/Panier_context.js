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
    const product = action.payload.product;

    if (!product) return state;

    const productIdToAdd = product.id;

    // Recherche
    const existingElementIndex = updateShoppingCartProducts.findIndex(
      (cartProducts) => cartProducts.id === productIdToAdd
    );
    const existingElement = updateShoppingCartProducts[existingElementIndex];

    // Vérifier stock disponible
    const stock = product.quantity; // IMPORTANT : quantité disponible en stock

    if (existingElement) {
      if (existingElement.quantity + 1 > stock) {
        toast.error("Quantité maximale atteinte (stock insuffisant)");
        return state;
      }

      // Augmenter quantité
      updateShoppingCartProducts[existingElementIndex] = {
        ...existingElement,
        quantity: existingElement.quantity + 1,
      };
    } else {
      // Ajouter nouveau produit
      if (stock < 1) {
        toast.error("Produit en rupture de stock");
        return state;
      }

      updateShoppingCartProducts.push({
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        quantity: 1,
        disponibilité: product.disponibility || "Disponible",
        sous_category: product.sous_category || "",
        category: product.category || "",
        stock: stock, // AJOUT pour vérifier plus tard dans update
      });
    }

    return { products: updateShoppingCartProducts };
  }


  if (action.type === "ACTUALISER_QUANTITE_PRODUIT") {
    const updateShoppingCartProducts = [...state.products];
    const index = updateShoppingCartProducts.findIndex(
      (cartProduct) => cartProduct.id === action.payload.productId
    );

    if (index === -1) return state;

    const product = updateShoppingCartProducts[index];

    const requestedQuantity = product.quantity + action.payload.quantity;

    // Vérification du stock
    if (requestedQuantity > product.stock) {
      toast.error("Quantité maximale atteinte (stock insuffisant)");
      return state;
    }

    // Si la quantité devient 0, on supprime
    if (requestedQuantity <= 0) {
      updateShoppingCartProducts.splice(index, 1);
    } else {
      updateShoppingCartProducts[index] = {
        ...product,
        quantity: requestedQuantity,
      };
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
