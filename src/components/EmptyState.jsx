export default function EmptyState({ message = "No products found." }) {
  return (
    <div className="text-center p-10 text-gray-500 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
      {message}
    </div>
  );
}