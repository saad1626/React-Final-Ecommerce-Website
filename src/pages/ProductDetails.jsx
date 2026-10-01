import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Card from "../components/Card";
import { formatPrice } from "../utils/helpers";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { data: p, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

  if (loading) return <Loading text="Loading product..." />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      <Link to="/products" className="text-blue-600 underline">← Back to Products</Link>
      <Card className="mt-4 grid md:grid-cols-2 gap-6">
        <img src={p.thumbnail} alt={p.title} className="w-full max-h-96 object-contain" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{p.title}</h1>
          <p>{p.description}</p>
          <p className="text-xl">{formatPrice(p.price)}</p>
          <p>Category: {p.category}</p>
          <p>Brand: {p.brand || "N/A"}</p>
          <p>Rating: ⭐ {p.rating}</p>
          <p>Discount: {p.discountPercentage}%</p>
          <p>Stock: {p.stock}</p>
          <Button onClick={() => addToCart(p)}>Add to Cart</Button>
        </div>
      </Card>
    </div>
  );
}