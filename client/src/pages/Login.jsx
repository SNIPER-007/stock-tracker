import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      isSignup
        ? await signup(email, password)
        : await login(email, password);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or user already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f0f, #141414)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "20px",
      }}
    >
      {/* CARD */}
      <div
        style={{
          background: "#1a1a1a",
          padding: "32px",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* LOGO / BRAND */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1 style={{ margin: 0, color: "#22c55e" }}>
            📈 StockTracker
          </h1>
          <p style={{ opacity: 0.7, marginTop: "6px" }}>
            Track • Trade • Learn
          </p>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: "#2a1212",
              color: "#ef4444",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#22c55e",
              color: "#0f0f0f",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        {/* TOGGLE */}
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            opacity: 0.8,
            fontSize: "14px",
          }}
        >
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{
              color: "#22c55e",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isSignup ? "Login" : "Create account"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* -------------------------------
   Input Styling
-------------------------------- */
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#0f0f0f",
  color: "white",
  outline: "none",
};
