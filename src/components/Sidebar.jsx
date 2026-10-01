import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/products", label: "Products" },
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/users", label: "Users" },
  { to: "/dashboard/profile", label: "Profile" },
  { to: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex flex-col gap-2">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </div>
  );
}