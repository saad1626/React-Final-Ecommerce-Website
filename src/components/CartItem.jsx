import { memo } from "react";
import Button from "./Button";
import Card from "./Card";
import { formatPrice } from "../utils/helpers";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <Card className="flex flex-wrap items-center gap-3">
      <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-contain" />
      <div className="flex-1 min-w-32">
        <p className="font-bold">{item.title}</p>
        <p>{formatPrice(item.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => onDecrease(item.id)}>-</Button>
        <span>{item.quantity}</span>
        <Button variant="outline" onClick={() => onIncrease(item.id)}>+</Button>
      </div>
      <Button variant="danger" onClick={() => onRemove(item.id)}>Remove</Button>
    </Card>
  );
}

export default memo(CartItem);