import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { formatPrice } from "../../utils/helpers";

export default function ProductsManagement() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=20");
  const [products, setProducts] = useLocalStorage("adminProducts", []);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", stock: "" });
  const [formError, setFormError] = useState("");

  // First time only: copy API data into local storage so edits/deletes can be simulated
  useEffect(() => {
    if (data && products.length === 0) {
      setProducts(
        data.products.map((p) => ({
          id: p.id, title: p.title, category: p.category,
          price: p.price, stock: p.stock, rating: p.rating, thumbnail: p.thumbnail,
        }))
      );
    }
  }, [data]); // eslint-disable-line

  const deleteProduct = useCallback(
    (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    [setProducts]
  );

  const openEdit = (p) => {
    setEditing(p);
    setForm({ title: p.title, price: p.price, stock: p.stock });
    setFormError("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim() || Number(form.price) <= 0 || Number(form.stock) < 0) {
      setFormError("Enter a title, a price above 0 and a valid stock.");
      return;
    }
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editing.id
          ? { ...p, title: form.title, price: Number(form.price), stock: Number(form.stock) }
          : p
      )
    );
    setEditing(null);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  if (loading && products.length === 0) return <Loading text="Loading products..." />;
  if (error && products.length === 0) return <ErrorMessage message="Failed to load products." />;

  const inputClass = "border p-2 rounded w-full bg-white dark:bg-gray-700";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-gray-800 border">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2 flex items-center gap-2 min-w-48">
                    <img src={p.thumbnail} alt="" className="w-10 h-10 object-contain" />
                    {p.title}
                  </td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{formatPrice(p.price)}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">{p.rating}</td>
                  <td className="p-2 space-x-1 whitespace-nowrap">
                    <Button variant="outline" onClick={() => navigate(`/products/${p.id}`)}>View</Button>
                    <Button onClick={() => openEdit(p)}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteProduct(p.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit Product">
        <form onSubmit={handleSave} className="space-y-3">
          {formError && <p className="text-red-600 text-sm">{formError}</p>}
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className={inputClass} />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className={inputClass} />
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className={inputClass} />
          <Button type="submit">Save</Button>
        </form>
      </Modal>
    </div>
  );
}