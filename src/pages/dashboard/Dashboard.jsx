import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { OrdersContext } from "../../context/OrdersContext";
import { ProductsContext } from "../../context/ProductsContext";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import { formatPrice } from "../../utils/helpers";

export default function Dashboard() {
  const { orders } = useContext(OrdersContext);
  const { customProducts } = useContext(ProductsContext);

  // API se products (total count bhi isi response mein aata hai)
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products?limit=5&select=title,price,thumbnail"
  );
  // API se users ka total
  const { data: usersData } = useFetch("https://dummyjson.com/users?limit=1&select=id");

  // Revenue sirf Completed orders se
  const revenue = useMemo(
    () => orders.filter((o) => o.status === "Completed").reduce((sum, o) => sum + o.total, 0),
    [orders]
  );

  // Naye (admin ke add kiye) products pehle, phir API ke products
  const recentProducts = useMemo(() => {
    const apiProducts = data ? data.products : [];
    return [...customProducts, ...apiProducts].slice(0, 5);
  }, [customProducts, data]);

  const stats = [
    { label: "Total Products", value: data ? data.total + customProducts.length : "..." },
    { label: "Total Orders", value: orders.length },
    { label: "Total Users", value: usersData ? usersData.total : "..." },
    { label: "Total Revenue", value: formatPrice(revenue) },
  ];

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent orders */}
        <Card>
          <h3 className="font-bold mb-2">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-500">No orders yet.</p>
          ) : (
            orders.slice(0, 4).map((o) => (
              <p key={o.id} className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-1 text-sm">
                <span>{o.id} - {o.customer}</span>
                <span>{o.status}</span>
              </p>
            ))
          )}
        </Card>

        {/* Recent products */}
        <Card>
          <h3 className="font-bold mb-2">Recent Products</h3>
          {loading && customProducts.length === 0 && <Loading />}
          {error && <p className="text-red-600 text-sm">Failed to load products.</p>}
          {recentProducts.map((p) => (
            <p key={p.id} className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-1 text-sm">
              <span>{p.title}</span>
              <span>{formatPrice(p.price)}</span>
            </p>
          ))}
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <h3 className="font-bold mb-2">Quick Actions</h3>
        <div className="flex flex-wrap gap-3 text-blue-600 underline">
          <Link to="/dashboard/products">Manage Products</Link>
          <Link to="/dashboard/orders">View Orders</Link>
          <Link to="/dashboard/users">View Users</Link>
          <Link to="/dashboard/settings">Settings</Link>
        </div>
      </Card>
    </div>
  );
}

