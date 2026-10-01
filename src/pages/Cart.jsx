import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import Card from "../components/Card";
import { formatPrice } from "../utils/helpers";

export default function Cart() {
  const { cart, totalItems, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <EmptyState message="Your cart is empty." />
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          ))}
          <Card className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <p>Total items: {totalItems}</p>
              <p className="font-bold">Total price: {formatPrice(totalPrice)}</p>
            </div>
            <Button variant="danger" onClick={clearCart}>Clear Cart</Button>
          </Card>
        </div>
      )}
    </div>
  );
}