import { useStocks } from "../context/StockContext";
import PageTransition from "../components/PageTransition";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist, stocks } = useStocks();

  const getLivePrice = (symbol) =>
    stocks.find((s) => s.symbol === symbol)?.price || 0;

  return (
    <PageTransition>
      <div style={{ color: "white" }}>
        <h1>Watchlist</h1>

        {watchlist.length === 0 && (
          <p style={{ opacity: 0.6 }}>No stocks in watchlist</p>
        )}

        {watchlist.map((stock) => (
          <div
            key={stock.symbol}
            style={{
              background: "#1a1a1a",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "12px",
              border: "1px solid #222",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{stock.symbol}</strong>
              <div style={{ opacity: 0.7 }}>{stock.name}</div>
            </div>

            <div>
              ₹{getLivePrice(stock.symbol)}
              <button
                onClick={() => removeFromWatchlist(stock.symbol)}
                style={{
                  marginLeft: "15px",
                  background: "#ef4444",
                  border: "none",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
