import { useState, useMemo, useCallback } from "react";
import { mockUsers } from "../../utils/helpers";
import UserRow from "./UserRow";
import EmptyState from "../../components/EmptyState";

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  // useCallback so memoized UserRow doesn't re-render when typing in the search box
  const deleteUser = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="border p-2 rounded w-full sm:w-72 mb-4 bg-white dark:bg-gray-800"
      />
      {filtered.length === 0 ? (
        <EmptyState message="No users found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-gray-800 border">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <UserRow key={u.id} user={u} onDelete={deleteUser} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}