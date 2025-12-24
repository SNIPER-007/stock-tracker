import { useState } from "react";
import { useStocks } from "../context/StockContext";
import BuyModal from "../components/BuyModal";
import StockModal from "../components/StockModal";
import PageTransition from "../components/PageTransition";

export default function Market() {
  const { stocks, buyStock, addToWatchlist, watchlist } = useStocks();
  const [selectedStock, setSelectedStock] = useState(null);
  const [viewStock, setViewStock] = useState(null);

  const isInWatchlist = (symbol) =>
    watchlist.some((s) => s.symbol === symbol);

  return (
    <PageTransition>
      <div style={{ color: "white" }}>
        <h1>Market</h1>

        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => setViewStock(stock)}
            style={{
              background: "#1a1a1a",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <strong>{stock.symbol}</strong> — ₹{stock.price}

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStock(stock);
                }}
              >
                Buy
              </button>

              <button
                disabled={isInWatchlist(stock.symbol)}
                onClick={(e) => {
                  e.stopPropagation();
                  addToWatchlist(stock);
                }}
              >
                {isInWatchlist(stock.symbol) ? "In Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        ))}

        {selectedStock && (
          <BuyModal
            stock={selectedStock}
            onClose={() => setSelectedStock(null)}
            onConfirm={(qty) => {
              buyStock(selectedStock, qty);
              setSelectedStock(null);
            }}
          />
        )}

        {viewStock && (
          <StockModal stock={viewStock} onClose={() => setViewStock(null)} />
        )}
      </div>
    </PageTransition>
  );
}
