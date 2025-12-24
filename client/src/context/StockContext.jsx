import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserData, saveUserData } from "../services/firestoreService";

const StockContext = createContext();

/* -----------------------------
   DEMO MARKET STOCKS
----------------------------- */
const DEMO_STOCKS = [
  { symbol: "AAPL", name: "Apple", price: 180, history: [180] },
  { symbol: "GOOG", name: "Google", price: 140, history: [140] },
  { symbol: "MSFT", name: "Microsoft", price: 320, history: [320] },
  { symbol: "TSLA", name: "Tesla", price: 220, history: [220] },
  { symbol: "AMZN", name: "Amazon", price: 160, history: [160] },
  { symbol: "META", name: "Meta", price: 300, history: [300] },
];

export const StockProvider = ({ children }) => {
  const { user } = useAuth();

  /* -----------------------------
     STATE
  ----------------------------- */
  const [stocks, setStocks] = useState(DEMO_STOCKS);
  const [openOrders, setOpenOrders] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* -----------------------------
     PRICE SIMULATION (LIVE)
  ----------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => {
          const change = (Math.random() * 4 - 2).toFixed(2);
          let newPrice = stock.price + Number(change);
          if (newPrice < 1) newPrice = 1;

          const newHistory = [...stock.history, newPrice].slice(-30);

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            history: newHistory,
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /* -----------------------------
     LOAD USER DATA FROM FIRESTORE
  ----------------------------- */
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const data = await getUserData(user.uid);

      if (data) {
        setPortfolio(data.portfolio || []);
        setWatchlist(data.watchlist || []);
        setOpenOrders(data.openOrders || []);
        setTransactions(data.transactions || []);
      }

      setIsLoaded(true);
    };

    loadData();
  }, [user]);

  /* -----------------------------
     SAVE USER DATA (SAFE)
  ----------------------------- */
  useEffect(() => {
    if (!user || !isLoaded) return;

    saveUserData(user.uid, {
      portfolio,
      watchlist,
      openOrders,
      transactions,
    });
  }, [portfolio, watchlist, openOrders, transactions, user, isLoaded]);

  /* -----------------------------
     HELPERS
  ----------------------------- */
  const getCurrentPrice = (symbol) =>
    stocks.find((s) => s.symbol === symbol)?.price || 0;

  const totalInvested = portfolio.reduce(
    (sum, p) => sum + p.avgPrice * p.qty,
    0
  );

  const currentValue = portfolio.reduce(
    (sum, p) => sum + getCurrentPrice(p.symbol) * p.qty,
    0
  );

  const totalPnL = currentValue - totalInvested;

  /* -----------------------------
     BUY → OPEN ORDER
  ----------------------------- */
  const buyStock = (stock, qty) => {
    setOpenOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        qty,
        date: new Date().toLocaleString(),
      },
    ]);
  };

  /* -----------------------------
     CANCEL ORDER
  ----------------------------- */
  const cancelOrder = (id) => {
    setOpenOrders((prev) => prev.filter((o) => o.id !== id));
  };

  /* -----------------------------
     CONFIRM ORDER → PORTFOLIO
  ----------------------------- */
  const confirmOrder = (order) => {
    setPortfolio((prev) => {
      const existing = prev.find((p) => p.symbol === order.symbol);

      if (existing) {
        const totalQty = existing.qty + order.qty;
        const avgPrice =
          (existing.avgPrice * existing.qty +
            order.price * order.qty) /
          totalQty;

        return prev.map((p) =>
          p.symbol === order.symbol
            ? { ...p, qty: totalQty, avgPrice }
            : p
        );
      }

      return [
        ...prev,
        {
          symbol: order.symbol,
          name: order.name,
          qty: order.qty,
          avgPrice: order.price,
        },
      ];
    });

    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        symbol: order.symbol,
        qty: order.qty,
        price: order.price,
        date: order.date,
        type: "BUY",
      },
    ]);

    setOpenOrders((prev) => prev.filter((o) => o.id !== order.id));
  };

  /* -----------------------------
     SELL STOCK (NEW)
  ----------------------------- */
  const sellStock = (holding, qtyToSell) => {
    setPortfolio((prev) =>
      prev
        .map((p) => {
          if (p.symbol !== holding.symbol) return p;

          const remainingQty = p.qty - qtyToSell;
          if (remainingQty <= 0) return null;

          return { ...p, qty: remainingQty };
        })
        .filter(Boolean)
    );

    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        symbol: holding.symbol,
        qty: qtyToSell,
        price: getCurrentPrice(holding.symbol),
        date: new Date().toLocaleString(),
        type: "SELL",
      },
    ]);
  };

  /* -----------------------------
     WATCHLIST
  ----------------------------- */
  const addToWatchlist = (stock) => {
    setWatchlist((prev) => {
      if (prev.find((s) => s.symbol === stock.symbol)) return prev;
      return [...prev, stock];
    });
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
  };

  /* -----------------------------
     PROVIDER
  ----------------------------- */
  return (
    <StockContext.Provider
      value={{
        stocks,
        openOrders,
        portfolio,
        transactions,
        watchlist,

        buyStock,
        cancelOrder,
        confirmOrder,
        sellStock,
        addToWatchlist,
        removeFromWatchlist,

        totalInvested,
        currentValue,
        totalPnL,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStocks = () => useContext(StockContext);
