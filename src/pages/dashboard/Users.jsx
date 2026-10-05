import { useState, useMemo, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import UserRow from "./UserRow";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";

export default function Users() {
  // select= asks the API for only the fields we need
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/users?limit=30&select=firstName,lastName,email,role,image"
  );
  const [search, setSearch] = useState("");
  const [deletedIds, setDeletedIds] = useState([]); // delete is simulated on the screen only

  // turn API users into the shape our table uses, hiding deleted ones
  const users = useMemo(() => {
    if (!data) return [];
    return data.users
      .filter((u) => !deletedIds.includes(u.id))
      .map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role,
        image: u.image,
      }));
  }, [data, deletedIds]);

  const filtered = useMemo(() => {
    const text = search.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(text) || u.email.toLowerCase().includes(text)
    );
  }, [users, search]);

  // useCallback so memoized UserRow doesn't re-render when typing in the search box
  const deleteUser = useCallback((id) => {
    setDeletedIds((prev) => [...prev, id]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="input sm:w-72 mb-4"
      />

      {loading && <Loading text="Loading users..." />}
      {error && <ErrorMessage message="Failed to load users." />}

      {data &&
        (filtered.length === 0 ? (
          <EmptyState message="No users found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 text-sm uppercase text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
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
        ))}
    </div>
  );
}