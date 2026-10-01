import { useState, useContext } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";

export default function DashboardLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar: hidden on mobile until the menu button is clicked */}
      <aside
        className={`${open ? "block" : "hidden"} md:block w-full md:w-56 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4`}
      >
        <Link to="/" className="font-bold block mb-4">← MyShop</Link>
        <Sidebar onNavigate={() => setOpen(false)} />
      </aside>

      <div className="flex-1">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
          <button className="md:hidden" onClick={() => setOpen(!open)}>☰ Menu</button>
          <h2 className="font-bold">Admin Dashboard</h2>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}