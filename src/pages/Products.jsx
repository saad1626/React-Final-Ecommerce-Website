import { useState, useMemo, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductsContext";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Products() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=100");
  const { addToCart } = useContext(CartContext);
  const { customProducts } = useContext(ProductsContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const apiProducts = useMemo(() => (data ? data.products : []), [data]);

  // admin-added products first, then the API products
  const products = useMemo(() => [...customProducts, ...apiProducts], [customProducts, apiProducts]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  // useMemo: only re-filters when products, search or category change
  const filtered = useMemo(() => {
    const text = search.toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(text) ||
        p.description.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text);
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
      </div>

      {loading && <Loading text="Loading products..." />}
      {error && <ErrorMessage message="Failed to load products." />}
      {!loading && <ProductList products={filtered} onAdd={addToCart} />}
    </div>
  );
}