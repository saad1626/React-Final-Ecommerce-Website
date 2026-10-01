import { useState, useMemo } from "react";
import { mockOrders, formatPrice } from "../../utils/helpers";
import EmptyState from "../../components/EmptyState";

const statuses = ["Pending", "Processing", "Completed", "Cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const changeStatus = (id, status) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded bg-white dark:bg-gray-800">
          <option>All</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No orders found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-gray-800 border">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Products</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.customer}</td>
                  <td className="p-2">{o.products}</td>
                  <td className="p-2">{formatPrice(o.total)}</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2">{o.date}</td>
                  <td className="p-2">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o.id, e.target.value)}
                      className="border p-1 rounded bg-white dark:bg-gray-700"
                    >
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}