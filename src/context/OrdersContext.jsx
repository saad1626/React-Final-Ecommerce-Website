import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage("orders", []);

  const addOrder = useCallback(
    (order) => setOrders((prev) => [order, ...prev]),
    [setOrders]
  );

  const updateOrderStatus = useCallback(
    (id, status) =>
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))),
    [setOrders]
  );

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}