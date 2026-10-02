import { useState, useRef, useEffect } from "react";
import Button from "./Button";

const emptyForm = {
  title: "", description: "", price: "", category: "", brand: "",
  stock: "", rating: "", discountPercentage: "", thumbnail: "",
};

export default function AddProductForm({ categories, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  // useRef: focus the first input when the form opens
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required";
    if (form.description.trim().length < 10) err.description = "Description must be at least 10 characters";
    if (!form.price || Number(form.price) <= 0) err.price = "Price must be above 0";
    if (!form.category.trim()) err.category = "Category is required";
    if (form.stock === "" || Number(form.stock) < 0) err.stock = "Enter a valid stock";
    if (form.rating !== "" && (Number(form.rating) < 0 || Number(form.rating) > 5))
      err.rating = "Rating must be between 0 and 5";
    if (form.discountPercentage !== "" && (Number(form.discountPercentage) < 0 || Number(form.discountPercentage) > 100))
      err.discountPercentage = "Discount must be between 0 and 100";
    if (form.thumbnail && !form.thumbnail.startsWith("http"))
      err.thumbnail = "Image must be a link starting with http";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category.trim().toLowerCase(), // API categories are lowercase, so filtering matches
      brand: form.brand.trim() || "N/A",
      stock: Number(form.stock),
      rating: Number(form.rating) || 0,
      discountPercentage: Number(form.discountPercentage) || 0,
      thumbnail: form.thumbnail || "https://placehold.co/300x300?text=No+Image",
    });
  };

  const error = (name) => errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input ref={titleRef} name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
        {error("title")}
      </div>
      <div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="3" className="input" />
        {error("description")}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
          {error("price")}
        </div>
        <div>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="input" />
          {error("stock")}
        </div>
        <div>
          <input name="category" list="category-list" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
          <datalist id="category-list">
            {categories.map((c) => <option key={c} value={c} />)}
          </datalist>
          {error("category")}
        </div>
        <div>
          <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="input" />
        </div>
        <div>
          <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating (0-5)" className="input" />
          {error("rating")}
        </div>
        <div>
          <input name="discountPercentage" type="number" step="0.1" value={form.discountPercentage} onChange={handleChange} placeholder="Discount %" className="input" />
          {error("discountPercentage")}
        </div>
      </div>
      <div>
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Image link (optional)" className="input" />
        {error("thumbnail")}
      </div>
      <Button type="submit" className="w-full">Add Product</Button>
    </form>
  );
}