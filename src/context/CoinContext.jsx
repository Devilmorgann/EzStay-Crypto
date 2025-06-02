import { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: 'usd',
    symbol: '$',
  });

  const fetchAllCoin = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
