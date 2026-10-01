import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=4");

  return (
    <div>
      <section className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome to MyShop</h1>
        <p className="mb-4">A simple e-commerce app built with React for learning.</p>
        <Button onClick={() => navigate("/products")}>View Products</Button>
      </section>

      <h2 className="text-xl font-bold mb-3">Featured Products</h2>
      {loading && <Loading text="Loading products..." />}
      {error && <ErrorMessage />}
      {data && <ProductList products={data.products} onAdd={addToCart} />}
    </div>
  );
}