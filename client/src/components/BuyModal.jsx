import { useState } from "react";

export default function BuyModal({ stock, onClose, onConfirm }) {
  const [qty, setQty] = useState(1);

  return (
    <div style={{ background: "#000000aa", position: "fixed", inset: 0 }}>
      <div
        style={{
          background: "#1a1a1a",
          color: "white",
          padding: "20px",
          width: "300px",
          margin: "100px auto",
          borderRadius: "10px",
        }}
      >
        <h3>Buy {stock.symbol}</h3>

        <p>Price: ₹{stock.price}</p>

        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <p>Total: ₹{(stock.price * qty).toFixed(2)}</p>

        <button onClick={() => onConfirm(qty)}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
