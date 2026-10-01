export default function EmptyState({ message = "No products found." }) {
  return <p className="text-center p-6 text-gray-500">{message}</p>;
}