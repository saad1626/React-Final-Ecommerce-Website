import { memo } from "react";
import Button from "../../components/Button";

function UserRow({ user, onDelete }) {
  return (
    <tr className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td className="p-2 flex items-center gap-2 min-w-48">
        <img src={user.image} alt="" className="w-8 h-8 rounded-full bg-gray-200" />
        {user.name}
      </td>
      <td className="p-2">{user.email}</td>
      <td className="p-2 capitalize">{user.role}</td>
      <td className="p-2">
        <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button>
      </td>
    </tr>
  );
}

export default memo(UserRow);