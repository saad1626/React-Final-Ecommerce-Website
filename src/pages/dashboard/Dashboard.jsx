import { useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { OrdersContext } from "../../context/OrdersContext";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import { mockUsers, formatPrice } from "../../utils/helpers";

export default function Dashboard() {
  const { orders } = useContext(OrdersContext);
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=5&select=title,price");
  const revenue = orders.filter((o) => o.status === "Completed").reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: "Total Products", value: 100 },
    { label: "Total Orders", value: orders.length },
    { label: "Total Users", value: mockUsers.length },
    { label: "Total Revenue", value: formatPrice(revenue) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-bold mb-2">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-500">No orders yet.</p>
          ) : (
            orders.slice(0, 4).map((o) => (
              <p key={o.id} className="flex justify-between border-b py-1 text-sm">
                <span>{o.id} - {o.customer}</span>
                <span>{o.status}</span>
              </p>
            ))
          )}
        </Card>

        <Card>
          <h3 className="font-bold mb-2">Recent Products</h3>
          {loading && <Loading />}
          {error && <p className="text-red-600">Failed to load products.</p>}
          {data?.products.map((p) => (
            <p key={p.id} className="flex justify-between border-b py-1 text-sm">
              <span>{p.title}</span>
              <span>{formatPrice(p.price)}</span>
            </p>
          ))}
        </Card>
      </div>

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