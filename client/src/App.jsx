import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import OpenOrders from "./pages/OpenOrders";
import Watchlist from "./pages/Watchlist";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/market"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Market />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Portfolio />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Transactions />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/open-orders"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <OpenOrders />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Watchlist />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
