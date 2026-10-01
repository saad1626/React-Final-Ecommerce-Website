import { useRef, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);

  // useRef: focus the search box when the page opens
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className="border p-2 rounded w-full bg-white dark:bg-gray-800"
    />
  );
}