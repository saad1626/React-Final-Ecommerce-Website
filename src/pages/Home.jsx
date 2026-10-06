import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import Card from "../components/Card";

const heroImage =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80";

const categoryTiles = [
  { slug: "beauty", icon: "💄" },
  { slug: "fragrances", icon: "🌸" },
  { slug: "furniture", icon: "🛋️" },
  { slug: "groceries", icon: "🥦" },
  { slug: "laptops", icon: "💻" },
  { slug: "smartphones", icon: "📱" },
];

const perks = [
  { icon: "🚚", title: "Fast Delivery", text: "Quick shipping on every order" },
  { icon: "💸", title: "Great Deals", text: "Discounts on top products" },
  { icon: "🔒", title: "Easy Checkout", text: "Simple and safe ordering" },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [email, setEmail] = useState("");

  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products?limit=4"
  );

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return;

    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl min-h-[420px] flex items-center bg-cover bg-center shadow-lg"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative max-w-2xl p-8 md:p-12 text-white">
          <p className="inline-block bg-white/15 rounded-full px-3 py-1 text-sm mb-3">
            Shop the latest collection
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Everything you need, all in one place.
          </h1>

          <p className="mb-6 text-gray-200">
            Discover quality products at great prices.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="white"
              onClick={() => navigate("/products")}
              className="!px-6 !py-2 !text-base"
            >
              Shop Now
            </Button>

            <Link
              to="/contact"
              className="px-6 py-2 rounded-full border border-white font-semibold hover:bg-white hover:text-black transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoryTiles.map((c) => (
            <Link
              key={c.slug}
              to={`/products?category=${c.slug}`}
              className="rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600 hover:-translate-y-1 transition"
            >
              <p className="text-3xl">{c.icon}</p>

              <p className="font-semibold capitalize mt-1 text-gray-800 dark:text-gray-200">
                {c.slug}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="flex justify-between items-end mb-3">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition"
          >
            See all →
          </Link>
        </div>

        {loading && <Loading text="Loading products..." />}
        {error && <ErrorMessage />}

        {data && (
          <ProductList products={data.products} onAdd={addToCart} />
        )}
      </section>

      {/* Promo banners */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-3xl p-8 text-white shadow-lg bg-gray-900">
          <p className="text-sm uppercase tracking-wide text-gray-400">
            Limited time
          </p>

          <h3 className="text-2xl font-extrabold my-1">
            Up to 30% off 💻
          </h3>

          <p className="mb-4 text-gray-400">
            Laptops and gadgets at friendly prices.
          </p>

          <Link
            to="/products?category=laptops"
            className="inline-block bg-white text-black font-semibold rounded-full px-4 py-1.5 hover:bg-gray-200 transition"
          >
            Shop laptops
          </Link>
        </div>

        <div className="rounded-3xl p-8 text-gray-900 shadow-lg bg-gray-100 dark:bg-gray-800 dark:text-white">
          <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Just in
          </p>

          <h3 className="text-2xl font-extrabold my-1">
            Fresh beauty picks 💄
          </h3>

          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Treat yourself to something new.
          </p>

          <Link
            to="/products?category=beauty"
            className="inline-block bg-black text-white font-semibold rounded-full px-4 py-1.5 hover:bg-gray-800 transition dark:bg-white dark:text-black"
          >
            Shop beauty
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="text-center py-10 px-4 border-y border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase">
          Newsletter
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Subscribe to our newsletter and get{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            10% off
          </span>{" "}
          your first purchase
        </p>

        <form
          onSubmit={handleSubscribe}
          className="max-w-2xl mx-auto mt-6 flex rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 px-5 py-4 outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400"
            required
          />

          <button
            type="submit"
            className="px-7 py-4 bg-gray-950 text-white font-bold hover:bg-gray-800 transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>

    </div>
  );
}