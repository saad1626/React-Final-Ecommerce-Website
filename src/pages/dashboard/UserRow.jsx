import { memo } from "react";
import Button from "../../components/Button";

function UserRow({ user, onDelete }) {
  return (
    <tr className="border-t">
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.role}</td>
      <td className="p-2">{user.status}</td>
      <td className="p-2">
        <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button>
      </td>
    </tr>
  );
}

export default memo(UserRow);