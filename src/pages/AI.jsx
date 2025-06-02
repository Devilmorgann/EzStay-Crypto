import React, { useEffect, useState } from 'react';

const coinOptions = [
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'dogecoin', name: 'Dogecoin' },
  { id: 'solana', name: 'Solana' },
  { id: 'shiba-inu', name: 'Shiba Inu' },
  { id: 'cardano', name: 'Cardano' },
  { id: 'matic-network', name: 'Polygon (MATIC)' },
  { id: 'litecoin', name: 'Litecoin' },
  { id: 'avalanche-2', name: 'Avalanche' },
  { id: 'ripple', name: 'XRP' },
];

function AiPredictionBox() {
  const [coin, setCoin] = useState('bitcoin');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [volume, setVolume] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateAiTip();
  }, [coin]);

  const generateAiTip = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}&price_change_percentage=24h`
      );
      const [data] = await response.json();
      if (!data) throw new Error('Invalid coin data');

      const price = data.current_price;
      const change24h = data.price_change_percentage_24h;
      const vol = data.total_volume;
      const high24h = data.high_24h;
      const low24h = data.low_24h;
      const marketCapRank = data.market_cap_rank || 100;

      
      const priceScore = Math.min(100, Math.max(0, 50 + change24h * 5)); 
      const volScore = Math.min(100, (vol / 1e9) * 20); 
      const volaScore = ((high24h - low24h) / price) * 1000; 
      const rankBonus = marketCapRank < 10 ? 20 : marketCapRank < 50 ? 10 : 0;
      const finalScore = Math.min(100, Math.max(0, (
        priceScore * 0.4 + volScore * 0.3 + volaScore * 0.2 + rankBonus
      ) + (Math.random() * 10 - 5))).toFixed(0); 

      let tip = '', reason = '';
      if (finalScore > 75) {
        tip = change24h > 0 ? 'Buy or hold for potential upside.' : 'Consider buying on dip.';
        reason = `Strong ${change24h > 0 ? 'price momentum' : 'volume support'}.`;
      } else if (finalScore < 35) {
        tip = change24h < 0 ? 'Sell to limit losses.' : 'Wait for better entry.';
        reason = `Weak ${change24h < 0 ? 'price trend' : 'market activity'}.`;
      } else {
        tip = 'Hold position and monitor.';
        reason = 'Balanced market conditions.';
      }

      setCurrentPrice(price);
      setPriceChange(change24h);
      setVolume(vol);
      setSuggestion(`${tip} ${reason}`);
      setConfidence(finalScore);
      setError('');
    } catch (err) {
      setError(`Error: ${err.message}`);
      setCurrentPrice(0);
      setPriceChange(0);
      setVolume(0);
      setSuggestion('');
      setConfidence(0);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    box: {
      background: 'linear-gradient(145deg, #1e3a8a, #0f172a)',
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '600px',
      minHeight: '400px',
      margin: '2rem auto',
      color: '#e2e8f0',
      boxShadow: '0 8px 16px rgba(139, 92, 246, 0.15)',
      fontFamily: '"Outfit", sans-serif',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    heading: {
      color: '#8b5cf6',
      fontSize: '24px',
      fontWeight: 700,
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    select: {
      padding: '10px',
      borderRadius: '6px',
      width: '100%',
      fontSize: '16px',
      background: '#111827',
      color: '#e2e8f0',
      border: '1px solid #475569',
      marginBottom: '1.5rem',
      cursor: 'pointer',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    infoBox: {
      background: '#111827',
      padding: '1.5rem',
      borderRadius: '8px',
      fontSize: '15px',
      lineHeight: '1.6',
      border: '1px solid #1e293b',
    },
    error: { color: '#ef4444', fontSize: '14px', textAlign: 'center', margin: '1.5rem 0' },
    loading: { color: '#8b5cf6', fontSize: '14px', textAlign: 'center', margin: '1.5rem 0', animation: 'pulse 1.5s infinite' },
    confidence: {
      color: '#e2e8f0',
      fontSize: '14px',
      marginTop: '0.8rem',
      textAlign: 'center',
      background: '#1e293b',
      padding: '4px 12px',
      borderRadius: '6px',
      display: 'inline-block',
    },
    buttonWrapper: { textAlign: 'center', marginTop: '1.5rem' },
    button: {
      background: '#ea580c',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '15px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 500,
      transition: 'background 0.3s ease',
    },
  };

  return (
    <div style={styles.box}>
      <h2 style={styles.heading}> AI Market Analyst</h2>
      <select value={coin} onChange={(e) => setCoin(e.target.value)} style={styles.select}>
        {coinOptions.map((coin) => (
          <option key={coin.id} value={coin.id}>{coin.name}</option>
        ))}
      </select>


      
      {loading ? (
        <p style={styles.loading}>Analyzing market data...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div style={styles.infoBox}>
          <p><strong>Price:</strong> ₹{currentPrice.toLocaleString()}</p>
          <p><strong>24h Change:</strong> <span style={{ color: priceChange >= 0 ? '#22c55e' : '#ef4444' }}>{priceChange.toFixed(2)}%</span></p>
          <p><strong>Volume:</strong> ₹{volume.toLocaleString()}</p>
          <p><strong>Recommendation:</strong> {suggestion}</p>
          <p style={styles.confidence}>Confidence: {confidence}%</p>
        </div>
      )}
      <div style={styles.buttonWrapper}>
        <button
          onClick={generateAiTip}
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.background = '#f97316')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#ea580c')}
        >
          Refresh Analysis
        </button>
      </div>
    </div>
  );
}

export default AiPredictionBox;