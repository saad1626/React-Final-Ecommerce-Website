import { useState, useMemo, useContext, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductsContext";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Card";

export default function Products() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=100");
  const { addToCart } = useContext(CartContext);
  const { customProducts } = useContext(ProductsContext);

  // values coming from the navbar search / category links
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const urlSearch = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);

  // when the navbar sends us here again, update the filters
  useEffect(() => {
    setSearch(urlSearch);
    setCategory(urlCategory);
  }, [location.key, urlSearch, urlCategory]);

  const apiProducts = useMemo(() => (data ? data.products : []), [data]);
  const products = useMemo(() => [...customProducts, ...apiProducts], [customProducts, apiProducts]);
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

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
      {/* Page banner */}
      <div className="rounded-3xl p-6 mb-6 text-white shadow-lg bg-gray-950 flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 className="text-2xl font-extrabold">All Products</h1>
          <p className="text-sm text-gray-400 mt-1">Browse our complete collection</p>
        </div>
        <p className="bg-white/10 rounded-full px-3 py-1 text-sm">{filtered.length} items</p>
      </div>

      <div className="lg:flex gap-6">
        {/* Filters on the left */}
        <aside className="lg:w-60 lg:shrink-0 space-y-4 mb-6 lg:mb-0 lg:sticky lg:top-36 lg:self-start">
          <Card>
            <h3 className="font-bold mb-2">🔍 Search</h3>
            <SearchBar value={search} onChange={setSearch} />
          </Card>

          <Card>
            <h3 className="font-bold mb-2">🏷️ Categories</h3>
            <CategoryFilter
              categories={categories}
              value={category}
              onChange={setCategory}
            />
          </Card>
        </aside>

        {/* Products on the right */}
        <div className="flex-1 min-w-0">
          {loading && <Loading text="Loading products..." />}
          {error && <ErrorMessage message="Failed to load products." />}
          {!loading && (
            <ProductList
              products={filtered}
              onAdd={addToCart}
              gridClass="sm:grid-cols-2 xl:grid-cols-3"
            />
          )}
        </div>
      </div>
    </div>
  );
}
