
import { Link } from "react-router-dom";

export default function Footer() {
  const list = "space-y-1 text-sm text-gray-400";
  const link = "hover:text-white transition";

  return (
    <footer className="mt-10 text-white bg-gray-950">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div>
          <p className="font-bold text-xl mb-2">🛍️ MyShop</p>
          <p className="text-sm text-gray-400">A modern e-commerce app built with React.</p>
        </div>

        <div>
          <p className="font-semibold mb-2">Shop</p>
          <ul className={list}>
            <li><Link to="/products" className={link}>All Products</Link></li>
            <li><Link to="/products?category=beauty" className={link}>Beauty</Link></li>
            <li><Link to="/products?category=furniture" className={link}>Furniture</Link></li>
            <li><Link to="/products?category=laptops" className={link}>Laptops</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Company</p>
          <ul className={list}>
            <li><Link to="/about" className={link}>About Us</Link></li>
            <li><Link to="/contact" className={link}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Account</p>
          <ul className={list}>
            <li><Link to="/login" className={link}>Login</Link></li>
            <li><Link to="/cart" className={link}>My Cart</Link></li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 border-t border-gray-800 py-3">
        Made with ❤️ © 2026 MyShop – React Final Project
      </p>
    </footer>
  );
}
