import React, { useState } from 'react';

const servicesData = [
  {
    title: 'Bitcoin Basics',
    features: ['Wallet Setup', 'Bitcoin Buying Guide', 'Secure Storage'],
    price: 499,
  },
  {
    title: 'Crypto Trading',
    features: ['Live Signals', 'Trading Strategies', 'Risk Management'],
    price: 799,
  },
  {
    title: 'Blockchain Dev',
    features: ['Smart Contracts', 'dApp Dev', 'Web3 Setup'],
    price: 999,
  },
  {
    title: 'NFT Launchpad',
    features: ['Minting Support', 'Marketing Tips', 'OpenSea Setup'],
    price: 699,
  },
  {
    title: 'Security Suite',
    features: ['Cold Wallet Guide', '2FA Setup', 'Phishing Protection'],
    price: 599,
  },
  {
    title: 'Altcoin Insights',
    features: ['Hidden Gems', 'Portfolio Management', 'Market Trends'],
    price: 899,
  }
];

const CryptoServices = () => {
  const [purchased, setPurchased] = useState(null);

  const handlePurchase = (title) => {
    setPurchased(title);
    alert(`🎉 You purchased the ${title} service!`);
  };

  const styles = {
    page: {
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      minHeight: '100vh',
      padding: '4rem 2rem',
      color: '#e2e8f0',
      fontFamily: 'Poppins, sans-serif',
    },
    heading: {
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '3rem',
      color: '#a78bfa',
      textShadow: '0 0 10px rgba(167,139,250,0.4)',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'center',
    },
    card: {
      background: 'linear-gradient(145deg, #1e1e2f, #2c2c3a)',
      borderRadius: '18px',
      padding: '2rem',
      width: '280px',
      color: '#f1f5f9',
      boxShadow: '0 10px 30px rgba(124,58,237,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
      transition: 'transform 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.05)',
    },
    cardTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #a78bfa',
      color: '#a78bfa',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      lineHeight: '1.7',
    },
    price: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginTop: '1.2rem',
      color: '#00FF90',
    },
    button: {
      marginTop: '1.2rem',
      padding: '12px 22px',
      background: 'linear-gradient(90deg, #00FF90, #00C9FF)',
      color: '#000',
      fontWeight: '600',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 5px 15px rgba(0,255,180,0.2)',
    },
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🚀 Premium Crypto Services</h2>
      <div style={styles.cardContainer}>
        {servicesData.map((service, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <ul style={styles.featureList}>
              {service.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <p style={styles.price}>₹{service.price}</p>
            <button
              style={styles.button}
              onClick={() => handlePurchase(service.title)}
            >
              {purchased === service.title ? '✅ Purchased' : 'Buy Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoServices;
