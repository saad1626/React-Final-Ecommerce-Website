import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Overview", end: true },
  { to: "/admin/dashboard/products", label: "Products" },
  { to: "/admin/dashboard/orders", label: "Orders" },
  { to: "/admin/dashboard/users", label: "Users" },
  { to: "/admin/dashboard/profile", label: "Profile" },
  { to: "/admin/dashboard/settings", label: "Settings" },
];

export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex flex-col gap-1">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition-colors ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </div>
  );
}