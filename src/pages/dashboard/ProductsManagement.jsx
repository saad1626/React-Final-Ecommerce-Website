import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ProductsContext } from "../../context/ProductsContext";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import AddProductForm from "../../components/AddProductForm";
import { formatPrice } from "../../utils/helpers";

export default function ProductsManagement() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=20");
  const [products, setProducts] = useLocalStorage("adminProducts", []); // copy of API products
  const { customProducts, addProduct, updateProduct, deleteCustomProduct } = useContext(ProductsContext);

  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
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

  // admin-added products on top, then the API copies
  const allProducts = useMemo(() => [...customProducts, ...products], [customProducts, products]);
  const categories = useMemo(() => [...new Set(allProducts.map((p) => p.category))], [allProducts]);

  // custom products live in ProductsContext, API copies live in local storage
  const deleteProduct = useCallback(
    (p) => {
      if (p.custom) deleteCustomProduct(p.id);
      else setProducts((prev) => prev.filter((x) => x.id !== p.id));
    },
    [deleteCustomProduct, setProducts]
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
    const changes = { title: form.title, price: Number(form.price), stock: Number(form.stock) };
    if (editing.custom) {
      updateProduct(editing.id, changes);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...changes } : p)));
    }
    setEditing(null);
  };

  const handleAdd = (product) => {
    addProduct(product);
    setShowAdd(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  if (loading && products.length === 0) return <Loading text="Loading products..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button onClick={() => setShowAdd(true)}>+ Add Product</Button>
      </div>

      {error && products.length === 0 && <ErrorMessage message="Failed to load products." />}

      {allProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-sm uppercase text-gray-600 dark:text-gray-300">
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
              {allProducts.map((p) => (
                <tr key={p.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-2 flex items-center gap-2 min-w-48">
                    <img src={p.thumbnail} alt="" className="w-10 h-10 object-contain" />
                    {p.title}
                    {p.custom && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">New</span>
                    )}
                  </td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{formatPrice(p.price)}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">{p.rating}</td>
                  <td className="p-2 space-x-1 whitespace-nowrap">
                    <Button variant="outline" onClick={() => navigate(`/products/${p.id}`)}>View</Button>
                    <Button onClick={() => openEdit(p)}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteProduct(p)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Product">
        <AddProductForm categories={categories} onSubmit={handleAdd} />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit Product">
        <form onSubmit={handleSave} className="space-y-3">
          {formError && <p className="text-red-600 text-sm">{formError}</p>}
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="input" />
          <Button type="submit">Save</Button>
        </form>
      </Modal>
    </div>
  );
}