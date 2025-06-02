import React, { useEffect, useState } from "react";
import { auth } from "../components/Navbar/firebase";
import { savePortfolio, loadPortfolio } from "./Portfolio/Portfolio";
import "../components/Portfolio.css";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [coinPrices, setCoinPrices] = useState({});
  const [currency, setCurrency] = useState("usd");
  const [newCoin, setNewCoin] = useState({ coin: "", qty: "", buyPrice: "" });
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const user = auth.currentUser;

  const coinOptions = [
    { id: "bitcoin", name: "Bitcoin (BTC)" },
    { id: "ethereum", name: "Ethereum (ETH)" },
    { id: "binancecoin", name: "Binance Coin (BNB)" },
    { id: "cardano", name: "Cardano (ADA)" },
    { id: "solana", name: "Solana (SOL)" },
    { id: "ripple", name: "XRP (XRP)" },
    { id: "polkadot", name: "Polkadot (DOT)" },
    { id: "dogecoin", name: "Dogecoin (DOGE)" },
    { id: "litecoin", name: "Litecoin (LTC)" },
    { id: "chainlink", name: "Chainlink (LINK)" },
  ];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const coins = portfolio.map((item) => item.coin).join(",");
        if (coins) {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd,inr,eur`
          );
          if (!response.ok) throw new Error("Failed to fetch prices");
          const data = await response.json();
          setCoinPrices(data);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
        setError("Failed to fetch coin prices.");
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [portfolio]);

  useEffect(() => {
    if (user) {
      loadPortfolio(user.uid)
        .then((data) => setPortfolio(data || []))
        .catch((err) => console.error("Load portfolio error:", err));
    }
  }, [user]);

  useEffect(() => {
    if (user && portfolio.length > 0) {
      savePortfolio(user.uid, portfolio);
    }
  }, [portfolio]);

  const addCoin = (e) => {
    e.preventDefault();
    if (!newCoin.coin) return setError("Please select a coin.");
    if (newCoin.qty <= 0 || isNaN(newCoin.qty)) return setError("Valid quantity > 0 required.");
    if (newCoin.buyPrice <= 0 || isNaN(newCoin.buyPrice)) return setError("Valid buy price > 0 required.");
    setPortfolio((prev) => [
      ...prev,
      { coin: newCoin.coin.toLowerCase(), qty: parseFloat(newCoin.qty), buyPrice: parseFloat(newCoin.buyPrice) },
    ]);
    setNewCoin({ coin: "", qty: "", buyPrice: "" });
    setError("");
  };

  const deleteCoin = (index) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const calculatePortfolio = () => {
    let totalValue = 0, totalInvested = 0;
    portfolio.forEach((item) => {
      const currentPrice = coinPrices[item.coin]?.[currency] || 0;
      totalValue += item.qty * currentPrice;
      totalInvested += item.qty * item.buyPrice;
    });
    return {
      totalValue: totalValue.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      profitLoss: (totalValue - totalInvested).toFixed(2),
      profitLossPercent: totalInvested ? (((totalValue - totalInvested) / totalInvested) * 100).toFixed(2) : 0,
    };
  };

  const { totalValue, totalInvested, profitLoss, profitLossPercent } = calculatePortfolio();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const filteredPortfolio = portfolio.filter((item) =>
    item.coin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ["Coin", "Quantity", "Buy Price", "Current Price", "Profit/Loss"];
    const rows = filteredPortfolio.map((item) => {
      const currentPrice = coinPrices[item.coin]?.[currency] || 0;
      const profitLoss = (item.qty * currentPrice - item.qty * item.buyPrice).toFixed(2);
      return [item.coin.toUpperCase(), item.qty, item.buyPrice, currentPrice.toFixed(2), profitLoss];
    });
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getPieChartData = () => {
    const total = filteredPortfolio.reduce((sum, item) => {
      const currentPrice = coinPrices[item.coin]?.[currency] || 0;
      return sum + Math.abs(item.qty * currentPrice - item.qty * item.buyPrice);
    }, 0);
    let startAngle = 0;
    return filteredPortfolio.map((item) => {
      const currentPrice = coinPrices[item.coin]?.[currency] || 0;
      const profitLoss = item.qty * currentPrice - item.qty * item.buyPrice;
      const slice = total ? (Math.abs(profitLoss) / total) * 360 : 0;
      const angle = { start: startAngle, end: startAngle + slice };
      startAngle += slice;
      return { profitLoss, angle, color: profitLoss >= 0 ? "#22c55e" : "#ef4444" };
    });
  };

  const lightThemeStyles = {
    container: { minHeight: "100vh", background: "#fff", color: "#1a1a1a", padding: "40px 20px", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" },
    inner: { maxWidth: "1200px", margin: "0 auto", background: "#f1f5f9", padding: "40px", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
    themeToggle: { display: "flex", justifyContent: "flex-end", marginBottom: "20px" },
    themeButton: { padding: "10px 20px", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: "10px", fontSize: "14px", cursor: "pointer" },
    heading: { fontSize: "32px", fontWeight: 600, textAlign: "center", marginBottom: "24px", color: "#1a1a1a" },
    search: { marginBottom: "20px", display: "flex", justifyContent: "center" },
    searchInput: { padding: "12px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "16px", width: "100%", maxWidth: "400px", background: "#fff", color: "#1a1a1a" },
    currency: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" },
    currencyLabel: { color: "#1a1a1a", fontSize: "16px" },
    currencySelect: { padding: "10px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "16px", background: "#fff", color: "#1a1a1a" },
    form: { display: "flex", flexWrap: "wrap", gap: "16px", background: "#e2e8f0", padding: "20px", borderRadius: "12px", marginBottom: "24px" },
    input: { padding: "12px", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "16px", background: "#fff", color: "#1a1a1a", flex: "1", minWidth: "200px" },
    addButton: { padding: "12px", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer", flex: "1", minWidth: "100px" },
    error: { color: "#ef4444", fontSize: "14px", textAlign: "center", width: "100%", marginTop: "8px" },
    chart: { background: "#e2e8f0", padding: "20px", borderRadius: "16px", marginBottom: "40px", textAlign: "center" },
    chartHeading: { fontSize: "20px", color: "#1a1a1a", marginBottom: "16px" },
    table: { background: "#e2e8f0", padding: "20px", borderRadius: "16px", marginBottom: "40px" },
    noCoins: { color: "#64748b", fontSize: "16px", textAlign: "center" },
    tableHeader: { display: "grid", gridTemplateColumns: "repeat(6, minmax(100px, 1fr))", gap: "10px", background: "#d1d5db", padding: "10px", borderRadius: "8px", fontSize: "14px", color: "#1a1a1a", fontWeight: 600, textAlign: "center" },
    tableRow: { display: "grid", gridTemplateColumns: "repeat(6, minmax(100px, 1fr))", gap: "10px", padding: "10px", background: "#fff", borderBottom: "1px solid #e2e8f0", fontSize: "14px", color: "#1a1a1a", textAlign: "center" },
    coinName: { fontWeight: 600 },
    profit: { color: "#22c55e" },
    loss: { color: "#ef4444" },
    deleteButton: { padding: "8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" },
    summary: { background: "#e2e8f0", padding: "20px", borderRadius: "16px" },
    summaryHeading: { fontSize: "20px", color: "#1a1a1a", marginBottom: "16px", display: "flex", alignItems: "center" },
    trend: { marginLeft: "10px", fontSize: "18px" },
    summaryText: { margin: "10px 0", fontSize: "16px", color: "#1a1a1a" },
    exportButton: { marginTop: "20px", padding: "12px 20px", background: "#ea580c", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer" },
  };

  return (
    <div style={theme === "light" ? lightThemeStyles.container : {}}>
      <div className={`portfolio-container ${theme}`} style={theme === "light" ? lightThemeStyles.inner : {}}>
        <div className="theme-toggle" style={theme === "light" ? lightThemeStyles.themeToggle : {}}>
          <button onClick={toggleTheme} className="theme-button" style={theme === "light" ? lightThemeStyles.themeButton : {}}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
        <h2 className="portfolio-heading" style={theme === "light" ? lightThemeStyles.heading : {}}>
          📊 Crypto Portfolio
        </h2>
        <div className="search-bar" style={theme === "light" ? lightThemeStyles.search : {}}>
          <input
            type="text"
            placeholder="Search coins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={theme === "light" ? lightThemeStyles.searchInput : {}}
            className="search-input"
          />
        </div>
        <div className="currency-selector" style={theme === "light" ? lightThemeStyles.currency : {}}>
          <label style={theme === "light" ? lightThemeStyles.currencyLabel : {}}>Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-select"
            style={theme === "light" ? lightThemeStyles.currencySelect : {}}
          >
            <option value="usd">USD ($)</option>
            <option value="inr">INR (₹)</option>
            <option value="eur">EUR (€)</option>
          </select>
        </div>
        <form onSubmit={addCoin} className="add-coin-form" style={theme === "light" ? lightThemeStyles.form : {}}>
          <select
            value={newCoin.coin}
            onChange={(e) => setNewCoin({ ...newCoin, coin: e.target.value })}
            className="form-input"
            style={theme === "light" ? lightThemeStyles.input : {}}
            required
          >
            <option value="" disabled>Select a coin</option>
            {coinOptions.map((coin) => (
              <option key={coin.id} value={coin.id}>{coin.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={newCoin.qty}
            onChange={(e) => setNewCoin({ ...newCoin, qty: e.target.value })}
            className="form-input"
            style={theme === "light" ? lightThemeStyles.input : {}}
            min="0"
            step="0.0001"
            required
          />
          <input
            type="number"
            placeholder={`Buy Price (${currency.toUpperCase()})`}
            value={newCoin.buyPrice}
            onChange={(e) => setNewCoin({ ...newCoin, buyPrice: e.target.value })}
            className="form-input"
            style={theme === "light" ? lightThemeStyles.input : {}}
            min="0"
            step="0.01"
            required
          />
          <button type="submit" className="add-button" style={theme === "light" ? lightThemeStyles.addButton : {}}>
            ➕ Add Coin
          </button>
          {error && <p className="error-message" style={theme === "light" ? lightThemeStyles.error : {}}>{error}</p>}
        </form>
        {filteredPortfolio.length > 0 && (
          <div className="chart-container" style={theme === "light" ? lightThemeStyles.chart : {}}>
            <h3 style={theme === "light" ? lightThemeStyles.chartHeading : {}}>Profit/Loss Distribution</h3>
            <svg width="200" height="200" viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)", margin: "0 auto", display: "block" }}>
              {getPieChartData().map((slice, idx) => {
                const startRad = (slice.angle.start * Math.PI) / 180;
                const endRad = (slice.angle.end * Math.PI) / 180;
                const x1 = Math.cos(startRad), y1 = Math.sin(startRad);
                const x2 = Math.cos(endRad), y2 = Math.sin(endRad);
                const largeArc = slice.angle.end - slice.angle.start > 180 ? 1 : 0;
                const path = `M0,0 L${x1},${y1} A1,1 0 ${largeArc},1 ${x2},${y2} Z`;
                return <path key={idx} d={path} fill={slice.color} />;
              })}
            </svg>
          </div>
        )}
        <div className="portfolio-table" style={theme === "light" ? lightThemeStyles.table : {}}>
          {filteredPortfolio.length === 0 ? (
            <p className="no-coins" style={theme === "light" ? lightThemeStyles.noCoins : {}}>
              No coins in portfolio
            </p>
          ) : (
            <div className="table-wrapper">
              <div className="table-header" style={theme === "light" ? lightThemeStyles.tableHeader : {}}>
                <span className="header-item">Coin</span>
                <span className="header-item">Quantity</span>
                <span className="header-item">Buy Price</span>
                <span className="header-item">Current Price</span>
                <span className="header-item">Profit/Loss</span>
                <span className="header-item">Action</span>
              </div>
              {filteredPortfolio.map((item, idx) => {
                const currentPrice = coinPrices[item.coin]?.[currency] || 0;
                const currentValue = (item.qty * currentPrice).toFixed(2);
                const profitLoss = (currentValue - item.qty * item.buyPrice).toFixed(2);
                const symbol = currency === "usd" ? "$" : currency === "inr" ? "₹" : "€";
                return (
                  <div key={idx} className="table-row" style={theme === "light" ? lightThemeStyles.tableRow : {}}>
                    <span className="row-item coin-name" style={theme === "light" ? lightThemeStyles.coinName : {}}>
                      {item.coin.toUpperCase()}
                    </span>
                    <span className="row-item">{item.qty}</span>
                    <span className="row-item">{symbol}{item.buyPrice.toLocaleString()}</span>
                    <span className="row-item">{symbol}{currentPrice.toLocaleString()}</span>
                    <span className={`row-item ${profitLoss >= 0 ? "profit" : "loss"}`} style={theme === "light" ? (profitLoss >= 0 ? lightThemeStyles.profit : lightThemeStyles.loss) : {}}>
                      {profitLoss >= 0 ? "+" : ""}{symbol}{profitLoss}
                    </span>
                    <button
                      onClick={() => deleteCoin(idx)}
                      className="delete-button"
                      style={theme === "light" ? lightThemeStyles.deleteButton : {}}
                      title="Remove coin"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {filteredPortfolio.length > 0 && (
          <div className="portfolio-summary" style={theme === "light" ? lightThemeStyles.summary : {}}>
            <h3 style={theme === "light" ? lightThemeStyles.summaryHeading : {}}>
              Portfolio Summary
              <span className={`trend-indicator ${profitLoss >= 0 ? "profit" : "loss"}`} style={theme === "light" ? lightThemeStyles.trend : {}}>
                {profitLoss >= 0 ? "↑" : "↓"}
              </span>
            </h3>
            <p style={theme === "light" ? lightThemeStyles.summaryText : {}}>
              Total Invested: {currency === "usd" ? "$" : currency === "inr" ? "₹" : "€"}{totalInvested}
            </p>
            <p style={theme === "light" ? lightThemeStyles.summaryText : {}}>
              Current Value: {currency === "usd" ? "$" : currency === "inr" ? "₹" : "€"}{totalValue}
            </p>
            <p className={profitLoss >= 0 ? "profit" : "loss"} style={theme === "light" ? (profitLoss >= 0 ? lightThemeStyles.profit : lightThemeStyles.loss) : {}}>
              Profit/Loss: {profitLoss >= 0 ? "+" : ""}{currency === "usd" ? "$" : currency === "inr" ? "₹" : "€"}{profitLoss} ({profitLossPercent}%)
            </p>
            <button
              onClick={exportToCSV}
              className="export-button"
              style={theme === "light" ? lightThemeStyles.exportButton : {}}
            >
              📥 Export to CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;