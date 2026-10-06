import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

export default function ProductList({ products, onAdd, gridClass = "sm:grid-cols-2 lg:grid-cols-4" }) {
  if (products.length === 0) return <EmptyState message="No products found." />;
  return (
    <div className={`grid grid-cols-1 gap-4 ${gridClass}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}