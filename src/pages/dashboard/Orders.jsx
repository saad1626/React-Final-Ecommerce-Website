import { useState, useMemo, useContext } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import { formatPrice } from "../../utils/helpers";
import EmptyState from "../../components/EmptyState";

const statuses = ["Pending", "Processing", "Completed", "Cancelled"];

export default function Orders() {
  const { orders, updateOrderStatus } = useContext(OrdersContext);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input sm:w-48">
          <option>All</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No orders found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-sm uppercase text-gray-600 dark:text-gray-300">
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
                <tr key={o.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.customer}</td>
                  <td className="p-2">{o.products}</td>
                  <td className="p-2">{formatPrice(o.total)}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        o.status === "Completed" ? "bg-green-100 text-green-700"
                        : o.status === "Pending" ? "bg-yellow-100 text-yellow-700"
                        : o.status === "Processing" ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-2">{o.date}</td>
                  <td className="p-2">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="input"
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