import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { OrdersContext } from "../context/OrdersContext";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { formatPrice } from "../utils/helpers";

const emptyForm = { name: "", email: "", address: "" };

export default function Cart() {
  const { cart, totalItems, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);

  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [placedId, setPlacedId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Valid email is required";
    if (form.address.trim().length < 5) err.address = "Address is required";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    const id = `ORD-${String(Date.now()).slice(-6)}`;
    addOrder({
      id,
      customer: form.name,
      email: form.email,
      products: totalItems,
      total: totalPrice,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    });
    clearCart();
    setForm(emptyForm);
    setShowCheckout(false);
    setPlacedId(id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {placedId && (
        <p className="mb-4 p-3 rounded-md bg-green-50 text-green-700 border border-green-200">
          Order placed successfully! Your order ID is {placedId}.
        </p>
      )}

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
            <div className="flex gap-2">
              <Button variant="danger" onClick={clearCart}>Clear Cart</Button>
              <Button onClick={() => { setPlacedId(null); setShowCheckout(true); }}>Checkout</Button>
            </div>
          </Card>
        </div>
      )}

      <Modal open={showCheckout} onClose={() => setShowCheckout(false)} title="Checkout">
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-sm text-gray-500">
            {totalItems} items – {formatPrice(totalPrice)}
          </p>
          <div>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="input" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>
          <div>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>
          <div>
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Shipping address" rows="3" className="input" />
            {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
          </div>
          <Button type="submit" className="w-full">Place Order</Button>
        </form>
      </Modal>
    </div>
  );
}