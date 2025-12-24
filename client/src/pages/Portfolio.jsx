import { useState } from "react";
import { useStocks } from "../context/StockContext";
import PageTransition from "../components/PageTransition";

export default function Portfolio() {
  const { portfolio, stocks, sellStock } = useStocks();
  const [sellQty, setSellQty] = useState({});

  const getCurrentPrice = (symbol) =>
    stocks.find((s) => s.symbol === symbol)?.price || 0;

  return (
    <PageTransition>
      <div style={{ color: "white" }}>
        <h1>Portfolio</h1>

        {portfolio.length === 0 && (
          <p style={{ opacity: 0.6 }}>No holdings yet</p>
        )}

        {portfolio.map((p) => {
          const currentPrice = getCurrentPrice(p.symbol);
          const pnl = (currentPrice - p.avgPrice) * p.qty;

          return (
            <div
              key={p.symbol}
              style={{
                background: "#1a1a1a",
                padding: "18px",
                marginBottom: "14px",
                borderRadius: "14px",
                border: "1px solid #222",
              }}
            >
              <strong>{p.symbol}</strong>
              <div>Qty: {p.qty}</div>
              <div>Avg Buy: ₹{p.avgPrice.toFixed(2)}</div>
              <div>Current: ₹{currentPrice}</div>

              <div
                style={{
                  color: pnl >= 0 ? "#22c55e" : "#ef4444",
                  marginTop: "6px",
                }}
              >
                P&L: ₹{pnl.toFixed(2)}
              </div>

              {/* SELL SECTION */}
              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <input
                  type="number"
                  min="1"
                  max={p.qty}
                  placeholder="Qty"
                  value={sellQty[p.symbol] || ""}
                  onChange={(e) =>
                    setSellQty({
                      ...sellQty,
                      [p.symbol]: Number(e.target.value),
                    })
                  }
                  style={{
                    width: "80px",
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid #333",
                    background: "#0f0f0f",
                    color: "white",
                  }}
                />

                <button
                  onClick={() => {
                    sellStock(p, sellQty[p.symbol]);
                    setSellQty({ ...sellQty, [p.symbol]: "" });
                  }}
                  disabled={!sellQty[p.symbol]}
                  style={{
                    background: "#ef4444",
                    border: "none",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Sell
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </PageTransition>
  );
}
