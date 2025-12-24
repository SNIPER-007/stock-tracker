import { useStocks } from "../context/StockContext";
import PageTransition from "../components/PageTransition";

export default function Transactions() {
  const { transactions } = useStocks();

  return (
    <PageTransition>
      <div style={{ color: "white" }}>
        <h1>All Transactions</h1>

        {transactions.length === 0 && (
          <p style={{ opacity: 0.6 }}>No transactions yet</p>
        )}

        {transactions
          .slice()
          .reverse()
          .map((t) => (
            <div
              key={t.id}
              style={{
                background: "#1a1a1a",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "12px",
                border: "1px solid #222",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{t.symbol}</strong>
                <div style={{ opacity: 0.7 }}>
                  Qty: {t.qty} | {t.type}
                </div>
                <div style={{ fontSize: "12px", opacity: 0.6 }}>
                  {t.date}
                </div>
              </div>

              <div>₹{t.price}</div>
            </div>
          ))}
      </div>
    </PageTransition>
  );
}
