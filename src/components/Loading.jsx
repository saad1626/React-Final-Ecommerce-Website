export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center gap-2 p-8 text-gray-500">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p>{text}</p>
    </div>
  );
}