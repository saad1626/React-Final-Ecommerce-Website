export default function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-purple-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-blue-400 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}