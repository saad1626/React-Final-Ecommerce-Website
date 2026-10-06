import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const quickCategories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "laptops",
  "smartphones",
];

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const text = query.trim();

    navigate(
      text
        ? `/products?q=${encodeURIComponent(text)}`
        : "/products"
    );

    closeMenu();
  };

  const desktopLinkClass = ({ isActive }) =>
    `relative py-5 text-sm font-medium transition-colors ${
      isActive
        ? "text-black dark:text-white"
        : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  const searchForm = (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="
          flex-1 min-w-0
          rounded-l-lg
          border border-gray-300
          bg-gray-50
          px-4 py-2.5
          text-sm text-gray-900
          placeholder-gray-400
          outline-none
          focus:border-black
          focus:bg-white
          dark:border-gray-700
          dark:bg-gray-800
          dark:text-white
          dark:placeholder-gray-500
        "
      />

      <button
        type="submit"
        className="
          rounded-r-lg
          bg-black
          px-5
          text-white
          transition
          hover:bg-gray-800
          cursor-pointer
          dark:bg-white
          dark:text-black
          dark:hover:bg-gray-200
        "
      >
        🔍
      </button>
    </form>
  );

  return (
    <>
      {/* Announcement */}
      <div className="bg-black text-white text-center text-xs sm:text-sm py-2 px-3">
        Free delivery on all orders this week
      </div>

      <nav className="sticky top-0 z-30 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex items-center justify-between h-16 gap-4">

            {/* Mobile Menu */}
            <button
              className="md:hidden text-xl text-gray-800 dark:text-white cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-bold text-xl tracking-tight text-black dark:text-white whitespace-nowrap"
            >
              🛍️ MyShop
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 justify-center">
              {searchForm}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">

              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="
                  w-9 h-9
                  flex items-center justify-center
                  rounded-lg
                  text-gray-700
                  hover:bg-gray-100
                  dark:text-gray-200
                  dark:hover:bg-gray-800
                  transition
                  cursor-pointer
                "
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              {/* Desktop User */}
              {user ? (
                <div className="hidden md:flex items-center gap-2">

                  <Link
                    to="/admin/dashboard"
                    className="
                      px-3 py-2
                      text-sm font-medium
                      text-gray-700
                      hover:text-black
                      dark:text-gray-300
                      dark:hover:text-white
                      transition
                    "
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="
                      px-3 py-2
                      text-sm font-medium
                      text-gray-600
                      hover:text-red-600
                      transition
                      cursor-pointer
                    "
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <Link
                  to="/login"
                  className="
                    hidden md:block
                    px-4 py-2
                    rounded-lg
                    bg-black
                    text-white
                    text-sm font-medium
                    hover:bg-gray-800
                    transition
                    dark:bg-white
                    dark:text-black
                    dark:hover:bg-gray-200
                  "
                >
                  Login
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="
                  relative
                  flex items-center gap-1
                  px-3 py-2
                  rounded-lg
                  text-gray-800
                  hover:bg-gray-100
                  dark:text-white
                  dark:hover:bg-gray-800
                  transition
                "
              >
                🛒
                <span className="hidden sm:inline text-sm font-medium">
                  Cart
                </span>

                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    bg-black
                    text-white
                    text-[10px]
                    font-bold
                    rounded-full
                    min-w-5
                    h-5
                    px-1
                    flex items-center justify-center
                    dark:bg-white
                    dark:text-black
                  "
                >
                  {totalItems}
                </span>
              </Link>

            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            {searchForm}
          </div>

        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block border-t border-gray-100 dark:border-gray-800">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="flex items-center justify-between">

              {/* Main Links */}
              <div className="flex gap-8">

                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    className={desktopLinkClass}
                  >
                    {l.label}
                  </NavLink>
                ))}

              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 py-2">

                {quickCategories.map((c) => (
                  <Link
                    key={c}
                    to={`/products?category=${c}`}
                    className="
                      capitalize
                      text-xs
                      font-medium
                      text-gray-500
                      hover:text-black
                      dark:text-gray-400
                      dark:hover:text-white
                      transition
                    "
                  >
                    {c}
                  </Link>
                ))}

              </div>

            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="
              md:hidden
              absolute
              left-0
              top-full
              w-full
              bg-white
              dark:bg-gray-950
              border-b
              border-gray-200
              dark:border-gray-800
              p-3
              shadow-lg
            "
          >

            {/* Navigation Links */}
            <div className="space-y-1">

              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={mobileLinkClass}
                  onClick={closeMenu}
                >
                  {l.label}
                </NavLink>
              ))}

            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 py-3 border-t border-gray-100 dark:border-gray-800 mt-2">

              {quickCategories.map((c) => (
                <Link
                  key={c}
                  to={`/products?category=${c}`}
                  onClick={closeMenu}
                  className="
                    capitalize
                    text-xs
                    font-medium
                    bg-gray-100
                    text-gray-700
                    hover:bg-gray-200
                    rounded-full
                    px-3
                    py-1.5
                    transition
                    dark:bg-gray-800
                    dark:text-gray-300
                  "
                >
                  {c}
                </Link>
              ))}

            </div>

            {/* User */}
            {user ? (
              <div className="border-t border-gray-100 dark:border-gray-800 pt-2">

                <NavLink
                  to="/admin/dashboard"
                  className={mobileLinkClass}
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="
                    block
                    w-full
                    text-left
                    px-4 py-3
                    rounded-lg
                    text-sm
                    font-medium
                    text-red-600
                    hover:bg-red-50
                    dark:hover:bg-red-950
                    cursor-pointer
                  "
                >
                  Logout
                </button>

              </div>
            ) : (
              <NavLink
                to="/login"
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}

          </div>
        )}

      </nav>
    </>
  );
}
