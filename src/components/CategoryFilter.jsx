export default function CategoryFilter({ categories, value, onChange }) {
  const chip = (active) =>
    `shrink-0 text-left capitalize px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
      active
        ? "bg-gray-950 text-white shadow"
        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-80 pb-1">
      <button onClick={() => onChange("all")} className={chip(value === "all")}>
        All
      </button>

      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={chip(value === c)}
        >
          {c.replace(/-/g, " ")}
        </button>
      ))}
    </div>
  );
}
