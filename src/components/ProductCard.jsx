import { memo } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";
import { formatPrice } from "../utils/helpers";

// memo: only re-renders when `product` or `onAdd` change.
// onAdd is stable because addToCart uses useCallback.
function ProductCard({ product, onAdd }) {
  return (
    <Card className="flex flex-col">
      <img src={product.thumbnail} alt={product.title} className="h-40 object-contain mb-2" />
      <h3 className="font-bold">{product.title}</h3>
      <p>{formatPrice(product.price)}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      <p className="text-sm">⭐ {product.rating}</p>
      <p className="text-sm text-green-600">{product.discountPercentage}% off</p>
      <div className="flex gap-2 mt-3">
        <Link to={`/products/${product.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <Button onClick={() => onAdd(product)}>Add to Cart</Button>
      </div>
    </Card>
  );
}

export default memo(ProductCard);