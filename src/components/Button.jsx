export default function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
  };
  return (
    <button type={type} onClick={onClick} className={`px-3 py-1 rounded ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}