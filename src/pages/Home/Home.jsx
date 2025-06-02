import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import './Home.css';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const navigate = useNavigate(); // ✅ useNavigate for logout
  const [showDropdown, setShowDropdown] = useState(false); // ✅ dropdown toggle
  const userEmail = localStorage.getItem('userEmail'); // ✅ get email from localStorage

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="home">
      {/* ✅ Capsule Section */}
      {userEmail && (
        <div style={{ width: '380px', position: 'absolute', top: '100px', right: '20px', zIndex: 1000, height:'41px' }}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              background: 'white',
              color: 'black',
              cursor: 'pointer',
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            👤 {userEmail}
          </div>

          {showDropdown && (
            <div
              style={{
                marginTop: '10px',
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <div className="hero">
        <h1>Largest Crypto Market</h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace made up for Lazy People. <br /><br />
          <b>Sign up to explore more about cryptos.</b>
        </p>

        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto..."
            required
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Table Section */}
      <div className="crypto-table">
        <div className="table-layout">
          <p>S.No</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + ' - ' + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
