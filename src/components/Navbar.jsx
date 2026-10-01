import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) => (isActive ? "font-bold underline" : "hover:underline");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">MyShop</Link>
        <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>

        <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-3 md:gap-5 absolute md:static top-14 left-0 w-full md:w-auto bg-white dark:bg-gray-800 p-4 md:p-0 z-10`}>
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>Products</NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
          <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>Cart ({totalItems})</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</NavLink>
          )}
          <button onClick={toggleTheme}>{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
        </div>
      </div>
    </nav>
  );
}