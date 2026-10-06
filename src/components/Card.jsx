export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/90 dark:bg-gray-800/90 border border-violet-100 dark:border-gray-700 rounded-2xl
        shadow-md shadow-violet-100 dark:shadow-none p-4 ${className}`}
    >
      {children}
    </div>
  );
}