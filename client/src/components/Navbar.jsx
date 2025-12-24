import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(14px)",
        background: "rgba(17, 17, 17, 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          color: "#22c55e",
          fontWeight: "bold",
          fontSize: "18px",
          letterSpacing: "0.5px",
        }}
      >
        📈 StockTracker
      </div>

      {/* NAV LINKS */}
      <div style={{ display: "flex", gap: "10px" }}>
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/market" label="Market" />
        <NavItem to="/portfolio" label="Portfolio" />
        <NavItem to="/watchlist" label="Watchlist" />
        <NavItem to="/transactions" label="Transactions" />
        <NavItem to="/open-orders" label="Open Orders" />
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        style={{
          background: "rgba(239,68,68,0.9)",
          border: "none",
          color: "white",
          padding: "8px 14px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow =
            "0 0 14px rgba(239,68,68,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = "2px solid #ef4444";
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = "none";
        }}
      >
        Logout
      </button>
    </div>
  );
}

/* ===============================
   NAV ITEM (Hover + Focus + Pop)
================================ */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "8px 14px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "500",
        color: isActive ? "#22c55e" : "white",
        background: isActive
          ? "rgba(34,197,94,0.12)"
          : "transparent",
        transition: "all 0.25s ease",
        outline: "none",
      })}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "rgba(34,197,94,0.12)";
        e.currentTarget.style.transform = "scale(1.06)";
        e.currentTarget.style.boxShadow =
          "0 0 14px rgba(34,197,94,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = "2px solid #22c55e";
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = "none";
      }}
    >
      {label}
    </NavLink>
  );
}
