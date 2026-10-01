import { createContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { cartReducer } from "../reducers/cartReducer";

export const CartContext = createContext();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // useCallback: these are passed to memoized children (ProductCard, CartItem),
  // so they must keep the same reference between renders.
  const addToCart = useCallback((product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      },
    });
  }, []);
  const removeFromCart = useCallback((id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }), []);
  const increaseQuantity = useCallback((id) => dispatch({ type: "INCREASE_QUANTITY", payload: id }), []);
  const decreaseQuantity = useCallback((id) => dispatch({ type: "DECREASE_QUANTITY", payload: id }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  // useMemo: only recalculated when the cart changes
  const totalItems = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);

  const value = {
    cart, totalItems, totalPrice,
    addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}