import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ProductsContext = createContext();

// Holds only the products added by the admin. API products are still fetched with useFetch.
export function ProductsProvider({ children }) {
  const [customProducts, setCustomProducts] = useLocalStorage("customProducts", []);

  const addProduct = useCallback(
    (product) =>
      setCustomProducts((prev) => [{ ...product, id: `custom-${Date.now()}`, custom: true }, ...prev]),
    [setCustomProducts]
  );

  const updateProduct = useCallback(
    (id, changes) =>
      setCustomProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p))),
    [setCustomProducts]
  );

  const deleteCustomProduct = useCallback(
    (id) => setCustomProducts((prev) => prev.filter((p) => p.id !== id)),
    [setCustomProducts]
  );

  return (
    <ProductsContext.Provider value={{ customProducts, addProduct, updateProduct, deleteCustomProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}