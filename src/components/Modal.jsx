import Card from "./Card";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="flex justify-between mb-3">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </Card>
    </div>
  );
}