import Navbar from "./Navbar";

export default function ProtectedLayout({ children }) {
  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}
