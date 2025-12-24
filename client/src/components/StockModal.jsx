import MiniChart from "./MiniChart";

export default function StockModal({ stock, onClose }) {
  return (
    <div style={{ background: "#000000aa", position: "fixed", inset: 0 }}>
      <div
        style={{
          background: "#1a1a1a",
          color: "white",
          padding: "20px",
          width: "400px",
          margin: "80px auto",
          borderRadius: "12px",
        }}
      >
        <h2>{stock.symbol}</h2>
        <p>{stock.name}</p>
        <p>Current Price: ₹{stock.price}</p>

        <MiniChart history={stock.history} />

        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>
  );
}
