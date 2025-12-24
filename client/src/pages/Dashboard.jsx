import { useAuth } from "../context/AuthContext";
import { useStocks } from "../context/StockContext";
import PageTransition from "../components/PageTransition";

export default function Dashboard() {
  const { user } = useAuth();
  const {
    totalInvested,
    currentValue,
    totalPnL,
    openOrders,
    portfolio,
    watchlist,
    transactions,
  } = useStocks();

  const DEMO_BALANCE = 100000;
  const availableBalance = DEMO_BALANCE - totalInvested;

  return (
    <PageTransition>
      <div style={{ color: "white" }}>
        <h1>Dashboard</h1>
        <p style={{ opacity: 0.7 }}>{user?.email}</p>

        {/* ACCOUNT BALANCE */}
        <BigCard title="Account Balance">
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <SmallCard
              icon="💰"
              title="Available Balance"
              value={`₹${availableBalance.toFixed(2)}`}
              color="#22c55e"
            />
            <SmallCard
              icon="📊"
              title="Total Invested"
              value={`₹${totalInvested.toFixed(2)}`}
            />
          </div>
        </BigCard>

        {/* PORTFOLIO OVERVIEW */}
        <BigCard title="Portfolio Overview">
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <SmallCard icon="📈" title="Current Value" value={`₹${currentValue.toFixed(2)}`} />
            <SmallCard
              icon={totalPnL >= 0 ? "🟢" : "🔴"}
              title="Total P&L"
              value={`₹${totalPnL.toFixed(2)}`}
              color={totalPnL >= 0 ? "#22c55e" : "#ef4444"}
            />
            <SmallCard icon="📦" title="Holdings" value={portfolio.length} />
            <SmallCard icon="⏳" title="Open Orders" value={openOrders.length} />
            <SmallCard icon="⭐" title="Watchlist" value={watchlist.length} />
          </div>
        </BigCard>

        {/* RECENT TRANSACTIONS */}
        <BigCard title="Recent Transactions">
          {transactions.slice(-5).reverse().map((t) => (
            <div
              key={t.id}
              style={{
                background: "#0f0f0f",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #222",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{t.symbol}</strong> | Qty: {t.qty}
                <div style={{ opacity: 0.6, fontSize: "12px" }}>{t.date}</div>
              </div>
              <div>₹{t.price}</div>
            </div>
          ))}
        </BigCard>
      </div>
    </PageTransition>
  );
}

/* ---- UI COMPONENTS ---- */

function BigCard({ title, children }) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        padding: "26px",
        borderRadius: "16px",
        marginTop: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>{title}</h2>
      {children}
    </div>
  );
}

function SmallCard({ icon, title, value, color = "white" }) {
  return (
    <div
      style={{
        background: "#0f0f0f",
        padding: "16px",
        borderRadius: "12px",
        minWidth: "170px",
        border: "1px solid #222",
      }}
    >
      <p style={{ opacity: 0.7 }}>
        {icon} {title}
      </p>
      <h3 style={{ color }}>{value}</h3>
    </div>
  );
}
