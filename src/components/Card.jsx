export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 ${className}`}>
      {children}
    </div>
  );
}