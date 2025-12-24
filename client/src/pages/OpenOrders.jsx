import { useStocks } from "../context/StockContext";
import PageTransition from "../components/PageTransition";

export default function OpenOrders() {
  const { openOrders, cancelOrder, confirmOrder } = useStocks();

  return (
    <PageTransition>
      <div style={{ color: "white" }}>
        <h1>Open Orders</h1>

        {openOrders.length === 0 && (
          <p style={{ opacity: 0.6 }}>No open orders</p>
        )}

        {openOrders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#1a1a1a",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "12px",
              border: "1px solid #222",
            }}
          >
            <strong>{order.symbol}</strong>
            <div>Qty: {order.qty}</div>
            <div>Buy Price: ₹{order.price}</div>
            <div style={{ fontSize: "12px", opacity: 0.6 }}>
              {order.date}
            </div>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => confirmOrder(order)}
                style={{
                  background: "#22c55e",
                  border: "none",
                  color: "#0f0f0f",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Confirm
              </button>

              <button
                onClick={() => cancelOrder(order.id)}
                style={{
                  background: "#ef4444",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
